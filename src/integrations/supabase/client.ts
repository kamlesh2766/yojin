// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xcjsvyckpqwtppbtvgia.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjanN2eWNrcHF3dHBwYnR2Z2lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NzU4OTAsImV4cCI6MjA1NjI1MTg5MH0.lh872Y5DSZdXVn95V03ZJ3X7s2sQ-ng-UT-inzVZWpY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);