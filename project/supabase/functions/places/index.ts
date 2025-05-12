import { createClient } from "npm:@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const latitude = url.searchParams.get("latitude");
    const longitude = url.searchParams.get("longitude");
    const type = url.searchParams.get("type");
    const minRating = Number(url.searchParams.get("minRating") || "0");

    if (!latitude || !longitude || !type) {
      throw new Error("Missing required parameters");
    }

    let radius = 5000;
    if (type.includes('restaurant') || type.includes('bar')) {
      radius = 2000;
    }

    const apiKey = Deno.env.get("GOOGLE_MAPS_API_KEY");

    if (!apiKey) {
      throw new Error("Google Maps API key not configured");
    }

    const params = new URLSearchParams({
      location: `${latitude},${longitude}`,
      radius: radius.toString(),
      type: type,
      key: apiKey,
    });

    const googleUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params}`;
    const response = await fetch(googleUrl);
    const data = await response.json();

    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      throw new Error(`Google Places API error: ${data.status}`);
    }

    let results = data.results;
    if (minRating > 0) {
      results = results.filter((place: any) => place.rating >= minRating);
    }

    const detailedPlaces = await Promise.all(
      results.map(async (place: any) => {
        const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,rating,formatted_address,reviews,photos,opening_hours,price_level,user_ratings_total&key=${apiKey}`;
        const detailsResponse = await fetch(detailsUrl);
        const detailsData = await detailsResponse.json();
        
        const details = detailsData.result;
        
        // Get up to 10 photos instead of just 5
        const photoUrls = details.photos
          ? await Promise.all(
              details.photos.slice(0, 10).map(async (photo: any) => {
                return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photo.photo_reference}&key=${apiKey}`;
              })
            )
          : [];

        return {
          id: place.place_id,
          name: place.name,
          type: type,
          images: photoUrls,
          location: place.vicinity,
          fullAddress: details.formatted_address || place.vicinity,
          description: place.vicinity,
          rating: place.rating,
          reviewCount: place.user_ratings_total,
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
          openNow: place.opening_hours?.open_now,
          reviews: details.reviews || [],
        };
      })
    );

    return new Response(JSON.stringify(detailedPlaces), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }
});