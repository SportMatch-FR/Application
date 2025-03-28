import { serve } from "https://deno.land/std@0.152.0/http/server.ts";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = Deno.env.get("PROJECT_SUPABASE_URL") || "";
const supabaseAnonKey = Deno.env.get("PROJECT_SUPABASE_ANON_KEY") || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { event_id, location, date, participants, sport, city, user_id } = body;

    console.log("updateEvent data:", body);

    const eventData = {
      location,
      date: new Date(date),
      participants,
      sport_id: sport,
      city_id: city,
      user_id
    };

    console.log("eventData:", eventData);

    const { data, error } = await supabase
      .from("Event")
      .update(eventData)
      .eq('id', event_id)
      .eq('user_id', user_id)
      .select();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.toString() }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

// New function to get event details
serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { event_id } = body;

    const { data, error } = await supabase
      .from("Event")
      .select("*")
      .eq('id', event_id)
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.toString() }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
