import { serve } from 'https://deno.land/std@0.152.0/http/server.ts';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = Deno.env.get('PROJECT_SUPABASE_URL') || '';
const supabaseAnonKey = Deno.env.get('PROJECT_SUPABASE_ANON_KEY') || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

serve(async (req) => {
  try {
    const { data, error } = await supabase
      .from('SportList')
      .select('*');

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.toString() }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});
