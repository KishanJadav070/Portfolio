import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:54321';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  live_url?: string;
  github_url?: string;
  technologies: string[];
  created_at: string;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon: string;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};