import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { CategoryPage } from './pages/CategoryPage';
import { NutriChat } from './components/NutriChat';
import { Checkout } from './pages/Checkout';
import { Profile } from './pages/Profile';
import { BonusLanding } from './pages/BonusLanding';
import { BonusCategoryPage } from './pages/BonusCategoryPage';
import { ShoppingList } from './pages/ShoppingList';
import { WeeklyMenu } from './pages/WeeklyMenu';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/bonus" element={<BonusLanding />} />
            <Route path="/bonus/:id" element={<BonusCategoryPage />} />
            <Route path="/shopping-list" element={<ShoppingList />} />
            <Route path="/weekly-menu" element={<WeeklyMenu />} />
          </Routes>
          <NutriChat />
        </Layout>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;