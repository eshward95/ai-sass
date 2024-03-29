import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

// const openai = new OpenAI({
//   apiKey: process.env.OPEN_AI_KEY,
// });
const replicate = new Replicate({
  auth: process.env.REPLICATE_AI_KEY!,
});

// const openai = new OpenAIApi(config)

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!prompt)
      return new NextResponse("Please enter a prompt", { status: 400 });

    const freeTrial = await checkApiLimit();

    const isPro = await checkSubscription();

    if (!freeTrial && !isPro)
      return new NextResponse("Please upgrade your account", { status: 403 });
    if (!isPro) {
      await increaseApiLimit();
    }

    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt,
        },
      }
    );
    return NextResponse.json(response);
  } catch (error) {
    console.log("[VIDEO ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
