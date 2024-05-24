const formalExample = {
  QA: [
    { question: "May i go to washroom", answer: "No" },
    { question: "What day is today", answer: "It's Monday" },
  ],
};

const axios = require("axios");

const url = "http://localhost:5000/send_prompt";
let ans = "You are the best";

export async function GET(req) {
  const data = { prompt: req.nextUrl.searchParams.get("question") };

  try {
    const response = await axios.post(url, data);
    ans = response.data.output_data;
  } catch (error) {
    console.error("Error:", error);
  }
  const cleanContent = ans.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
  const jsonString = JSON.stringify({ content: cleanContent });
  const message = JSON.parse(jsonString);
  console.log("Question Request:", message);

  return new Response(JSON.stringify(message), {
    headers: { "Content-Type": "application/json" },
  });
}
