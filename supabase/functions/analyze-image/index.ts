import { createClient } from "npm:@supabase/supabase-js@2.39.0";
import { decode as base64Decode } from "https://deno.land/std@0.210.0/encoding/base64.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl, genre } = await req.json();

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    // Get image data
    let imageData;
    if (imageUrl.startsWith('data:image')) {
      // Handle base64 image
      const base64Data = imageUrl.split(',')[1];
      imageData = base64Decode(base64Data);
    } else {
      // Fetch image from URL
      const response = await fetch(imageUrl);
      imageData = await response.arrayBuffer();
    }

    // Convert image data to base64 for Vision API
    const base64Image = btoa(String.fromCharCode(...new Uint8Array(imageData)));

    // Call Vision API to analyze image
    const visionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analyze this image and create a compelling ${genre} story based on what you see. The story should be engaging and match the genre's style. Keep the story between 300-500 words.`
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`
                }
              }
            ]
          }
        ],
        max_tokens: 1000
      })
    });

    const visionData = await visionResponse.json();
    const storyContent = visionData.choices[0].message.content;

    // Generate a title based on the story
    const titleResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: `Generate a short, captivating title for this ${genre} story:\n\n${storyContent}`
          }
        ],
        max_tokens: 50
      })
    });

    const titleData = await titleResponse.json();
    const title = titleData.choices[0].message.content.replace(/["']/g, '');

    return new Response(
      JSON.stringify({ title, content: storyContent }),
      { 
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to analyze image and generate story' }),
      { 
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      }
    );
  }
});