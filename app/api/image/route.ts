import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

// const openai = new OpenAIApi(config)

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!prompt)
      return new NextResponse("Please enter a prompt", { status: 400 });
    if (!amount)
      return new NextResponse("Please enter a amount", { status: 400 });
    if (!resolution)
      return new NextResponse("Please enter a resolution", { status: 400 });

    const freeTrial = await checkApiLimit();

    if (!freeTrial)
      return new NextResponse("Please upgrade your account", { status: 403 });

    await increaseApiLimit();

    const response = await openai.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.log("[IMAGE ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
