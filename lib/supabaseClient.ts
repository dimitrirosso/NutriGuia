import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jsrehgbrtrvpwhsjqkfv.supabase.co';
const supabaseKey = 'sb_publishable_FOfIfTWDtnPSv6Mb1mtUDg_P8v1CWOi';

export const supabase = createClient(supabaseUrl, supabaseKey);