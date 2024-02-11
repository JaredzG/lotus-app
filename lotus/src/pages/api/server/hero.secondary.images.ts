import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

const GET: APIRoute = async ({ params, request }) => {
  const { data: heroes, error } = await supabase
    .from("hero")
    .select(
      "alias, complexity, attack_type, primary_attribute, secondary_image_key"
    )
    .order("alias", { ascending: true });

  if (error !== null) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify(heroes), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { GET };
