import { serve } from "https://deno.land/std@0.152.0/http/server.ts";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = Deno.env.get("PROJECT_SUPABASE_URL") || "";
const supabaseAnonKey = Deno.env.get("PROJECT_SUPABASE_ANON_KEY") || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

serve(async (req) => {
  try {
    // Expecting a POST request with JSON body containing "user_id"
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 1. Fetch events for this user
    const { data: events, error: eventsError } = await supabase
      .from("Event")
      .select("*")

    if (eventsError) {
      return new Response(JSON.stringify({ error: eventsError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 2. Fetch all sports
    const { data: sportsData, error: sportsError } = await supabase
      .from("SportList")
      .select("id, name");

    if (sportsError) {
      return new Response(JSON.stringify({ error: sportsError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 3. Fetch all cities
    const { data: citiesData, error: citiesError } = await supabase
      .from("CityList")
      .select("id, name");

    if (citiesError) {
      return new Response(JSON.stringify({ error: citiesError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create maps from id to name for sports and cities
    const sportsMap = new Map(sportsData.map((s: any) => [s.id, s.name]));
    const citiesMap = new Map(citiesData.map((c: any) => [c.id, c.name]));

    // Enrich events by adding sport and city names
    const enrichedEvents = events.map((event: any) => ({
      ...event,
      sport: sportsMap.get(event.sport_id),
      city: citiesMap.get(event.city_id),
    }));

    return new Response(JSON.stringify(enrichedEvents), {
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
