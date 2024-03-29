import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string; 
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ priceId }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubscribe  = useCallback( async () => {
    if(!session){
      signIn('github');
      return;
    }

    if(session.activeSubscription){
      router.push('/posts');
      return;
    }

    try {
        const response = await api.post('/subscribe')

        const { sessionId } = response.data;

        const stripe = await getStripeJs();

        await stripe.redirectToCheckout({ sessionId });

    } catch (error) {
      console.log(error)
      alert(error.message);
    }

  }, [session]);

  return (
  <button type='button' className={styles.subscribeButton}  onClick={handleSubscribe}>
    Subscribe now
  </button>);
}

export default SubscribeButton;