import { GetServerSideProps } from 'next';
import Head from 'next/head';
import SubscribeButton from './components/SubscribeButton';
import styles from './home.module.scss';
import { stripe } from './services/stripe';

export default function Home(props) {
  console.log(props)
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get acess to all the publications <br/>
            <span>for $9.90 month</span>
          </p>

          <SubscribeButton />
        </section>

        <img src='/images/avatar.svg' alt='Girl codings' />
      </main>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve("price_1LDbtVLrkU38SwUl9K3uH55Z", {
    expand: ['product']
  });

  const product = {
    priceId: price.id,
    amount: (price.unit_amount/100)
  };

  return {
     props: {
        product
     }
  }
}