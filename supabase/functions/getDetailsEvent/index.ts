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
    const { event_id } = body;

    if (!event_id) {
      return new Response(JSON.stringify({ error: "event_id is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 1. Fetch the specific event
    const { data: event, error: eventError } = await supabase
      .from("Event")
      .select("*")
      .eq("id", event_id)
      .single();

    if (eventError) {
      return new Response(JSON.stringify({ error: eventError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 2. Fetch the sport details
    const { data: sportData, error: sportError } = await supabase
      .from("SportList")
      .select("id, name")
      .eq("id", event.sport_id)
      .single();

    if (sportError) {
      return new Response(JSON.stringify({ error: sportError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 3. Fetch the city details
    const { data: cityData, error: cityError } = await supabase
      .from("CityList")
      .select("id, name")
      .eq("id", event.city_id)
      .single();

    if (cityError) {
      return new Response(JSON.stringify({ error: cityError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Enrich event with sport and city names
    const enrichedEvent = {
      ...event,
      sport: sportData.name,
      city: cityData.name,
    };

    return new Response(JSON.stringify(enrichedEvent), {
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
