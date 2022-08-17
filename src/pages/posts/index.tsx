import Head  from 'next/head';
import { client } from '../../services/prismic';
import Prismic from "@prismicio/client"
import styles from './styles.module.scss';

export default function Posts({ page }) {

    return (
        <>
        <Head><title>Posts | Ignews</title></Head>

        <main className={styles.container}>
            <div className={styles.posts}>
            {
                page.map((i, index)=> {
                    return (
                        <a href='' key={index}>
                        <time>12 de março de 2021</time>
                        <strong>{i.data.title[0].text}</strong>
                        <p>{i.data.content[0].text}</p>
                        </a>
                    )    
                })
            }

            </div>
        </main>
        </>
    );
}


export async function getStaticProps() {
  
    const page = await client.dangerouslyGetAll();
  
    return {
      props: {
        page: page,
      },
    }
  }