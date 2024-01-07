import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const settingUrls = absoluteUrl("/settings");

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();
    if (!user || !userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userSubscription = await prismadb.userSubscription.findUnique({
      where: { userId },
    });
    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingUrls,
      });
      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }
    const stripeSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Eddie Pro",
              description: "Unlimited AI generations",
            },
            unit_amount: 2000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
      mode: "subscription",
      success_url: settingUrls,
      cancel_url: settingUrls,
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
    });
    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[STRIPE ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
