import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});
const instructionMessage = {
  role: "system",
  content:
    "You are a code generator. You must answer only in markdown code snippets. Use code comments for explaination",
};

// const openai = new OpenAIApi(config)

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!messages)
      return new NextResponse("Please enter a prompt", { status: 400 });
    const freeTrial = await checkApiLimit();

    if (!freeTrial)
      return new NextResponse("Please upgrade your account", { status: 403 });

    await increaseApiLimit();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });
    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("[CODE ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
