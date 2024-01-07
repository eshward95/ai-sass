import { headers } from "next/headers";
import Stripe from "stripe";

import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();

  // const header = stripe.webhooks.generateTestHeaderString({
  //   payload: body,
  //   secret: process.env.STRIPE_WEBHOOK_SECRET as string,
  // });
  const signature = headers().get("stripe-signature") as string;

  let event: Stripe.Event;
  console.log(
    "STRIPE_WEBHOOK_SECRET",
    // header,
    process.env.STRIPE_WEBHOOK_URL || ""
  );
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_URL!
    );
  } catch (error: any) {
    console.log("error", error);
    return new NextResponse(
      `Webhook Error: ${error.message} ${process.env.STRIPE_WEBHOOK_SECRET}`,
      { status: 400 }
    );
  }
  const session = event.data.object as Stripe.Checkout.Session;
  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    console.log("event", event, subscription);
    if (!session?.metadata?.userId) {
      return new NextResponse(`User id is required`, { status: 400 });
    }
    await prismadb.userSubscription.create({
      data: {
        userId: session?.metadata?.userId,
        stripeCustomerId: subscription.customer as string,
        stripeSubscriptionId: subscription.id as string,
        stripePriceId: subscription.items.data[0].price.id as string,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }
  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    console.log("subscription", subscription.customer);
    await prismadb.userSubscription.update({
      where: {
        stripeCustomerId: subscription.customer as string,
      },
      data: {
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
        stripePriceId: subscription.items.data[0].price.id,
      },
    });
  }
  return new Response("RESPONSE EXECUTE", {
    status: 200,
  });
}
