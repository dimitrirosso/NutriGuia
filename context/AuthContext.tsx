import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User } from '../types';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper para converter o user do Supabase para o nosso tipo User do app
  const mapSupabaseUser = (sbUser: any): User | null => {
    if (!sbUser) return null;
    
    const metadata = sbUser.user_metadata || {};
    
    return {
      name: metadata.name || sbUser.email?.split('@')[0] || 'Usuário',
      email: sbUser.email || '',
      isPro: metadata.isPro || false,
      joinedAt: metadata.joinedAt || new Date(sbUser.created_at).toLocaleDateString('pt-BR')
    };
  };

  useEffect(() => {
    // Verificar sessão atual
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(mapSupabaseUser(session?.user));
      } catch (error) {
        console.error("Erro ao verificar sessão:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Ouvir mudanças de auth (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(mapSupabaseUser(session?.user));
      // Garante que o loading seja falso após qualquer mudança de estado de auth
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // Não ativamos isLoading global aqui para evitar desmontar o modal de login
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login Supabase Error:", error);
        throw new Error(translateSupabaseError(error.message));
      }
      // O onAuthStateChange vai lidar com o sucesso
    } catch (error: any) {
      console.error("Login Exception:", error);
      throw error;
    }
  };

  const signup = async (email: string, name: string, password: string): Promise<void> => {
      // Não ativamos isLoading global aqui
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
              isPro: false,
              joinedAt: new Date().toLocaleDateString('pt-BR')
            }
          }
        });

        if (error) {
          console.error("Signup Supabase Error:", error);
          throw new Error(translateSupabaseError(error.message));
        }

        if (data.user && !data.session) {
           throw new Error("CONFIRM_EMAIL_REQUIRED");
        }
      } catch (error: any) {
        console.error("Signup Exception:", error);
        throw error;
      }
  };

  const resendVerification = async (email: string): Promise<void> => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    });

    if (error) {
      throw new Error(translateSupabaseError(error.message));
    }
  };

  const logout = async () => {
    // Opcional: isLoading(true) aqui faria a tela piscar para splash, 
    // mas como logout é rápido, talvez seja melhor não forçar o splash.
    // Vamos manter sem splash forçado para consistência.
    await supabase.auth.signOut();
    setUser(null);
  };

  const upgradeToPro = async () => {
    if (user) {
      const { data, error } = await supabase.auth.updateUser({
        data: { isPro: true }
      });

      if (error) {
        console.error("Erro ao atualizar para Pro:", error);
        return;
      }

      if (data.user) {
         setUser(mapSupabaseUser(data.user));
      }
    }
  };

  const translateSupabaseError = (msg: string) => {
    if (!msg) return "Ocorreu um erro desconhecido.";
    const m = msg.toLowerCase(); 
    
    if (m.includes("invalid login credentials")) return "E-mail ou senha incorretos.";
    if (m.includes("user not found")) return "Usuário não encontrado.";
    if (m.includes("user already registered")) return "Este e-mail já está cadastrado.";
    if (m.includes("password should be at least")) return "A senha deve ter no mínimo 6 caracteres.";
    if (m.includes("rate limit")) return "Muitas tentativas. Aguarde alguns minutos.";
    if (m.includes("email not confirmed")) return "CONFIRM_EMAIL_REQUIRED"; 
    
    return "Verifique seus dados e tente novamente.";
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, resendVerification, logout, upgradeToPro, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};