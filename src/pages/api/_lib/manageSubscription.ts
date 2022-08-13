import { fauna } from "../../../services/faunadb";
import { query as q } from "faunadb";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
    subscriptionId: string,
    customerId: string
){
    console.log(customerId);
    console.log('oi')
    const userRef = await fauna.query(
        q.Select(
            "ref",
            q.Get(
                q.Match(
                    q.Index('user_by_stripe_customer_id'),
                    customerId
                    )
            )
        )
    ).catch(err => console.log(err))
    console.log('oi')

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    console.log('oi')

    const subscriptionData = {
        id: subscription.id,
        userId: userRef,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id
    }

    console.log('entrei')

    await fauna.query(
      q.Create( q.Collection('subscriptions'),
        { data: subscriptionData })
    )
}