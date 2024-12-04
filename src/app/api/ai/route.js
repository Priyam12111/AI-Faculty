import axios from "axios";

export async function GET(req) {
  // WARNING: Add an authentication layer to protect ChatGPT API consumption.

  const question = req.nextUrl.searchParams.get("question") || "formal";

  // Removed the undefined 'speech' variable
  console.log("Question: " + question);

  // Proper POST request with the 'data' property
  const resp = await axios({
    url: "https://priyam1211.pythonanywhere.com/chat",
    method: "POST",
    data: {
      message: question + " in less than 20 words", // Payload for POST request
    },
  });

  // Get the response data
  const ans = resp.data;

  console.log(ans);

  // Return a properly formatted JSON response
  return Response.json({
    message: question,
    ans: [ans.response], // Assuming `ans` needs to be an array
  });
}
