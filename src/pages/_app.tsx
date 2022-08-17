import { AppProps } from 'next/app';
import Header from '../components/Header';
import { PrismicProvider } from '@prismicio/react'
import '../styles/global.scss'
import { SessionProvider } from 'next-auth/react';
import { client } from '../services/prismic';

function MyApp({ Component, pageProps }: AppProps) {


  
  return (

      <SessionProvider session={pageProps.session}>
          <Header />
          <PrismicProvider client={client}>
          <Component {...pageProps} />
          </PrismicProvider>
      </SessionProvider> 

  )
}

export default MyApp;
