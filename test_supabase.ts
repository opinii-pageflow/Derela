import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://nvuhfmnyphknxjxoqbct.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52dWhmbW55cGhrbnhqeG9xYmN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwNzE2NzQsImV4cCI6MjA4NzY0NzY3NH0.NdFJq7ZkvQczqQJHKJBITI9bVGWsVC6J4b4ejY3r0pk";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function testInsert() {
  console.log("Testing insert into 'responses' table...");
  const { data, error } = await supabase
    .from('responses')
    .insert([
      {
        source: "Test Script",
        first_purchase_reason: "Quality",
        return_reason: "Confidence",
        daily_usage_moments: ["Work"],
        clothing_value_priority: "Comfort",
        overall_experience: "Excellent",
        feeling_when_using: "Great",
        brand_in_3_words: "Amazing, Reliable, Stylish"
      }
    ])
    .select();

  if (error) {
    console.error("Error inserting data:", error);
    process.exit(1);
  } else {
    console.log("Data inserted successfully:", data);
  }
}

testInsert();
