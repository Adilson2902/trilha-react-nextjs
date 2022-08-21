import Head  from 'next/head';
import { client } from '../../services/prismic';
import { RichText } from 'prismic-dom';
import styles from './styles.module.scss';
import Link from 'next/link';

interface IPage {
    slug: string,
    date: string,
    title: string,
    content:  string,
}

interface IPropsPage {
    page: IPage[],
}

export default function Posts({ page }: IPropsPage) {


    return (
        <>
        <Head><title>Posts | Ignews</title></Head>

        <main className={styles.container}>
            <div className={styles.posts}>
            {
                page.map((i)=> {
                    return (
                        <Link href={`/posts/${i.slug}`} key={i.slug}>
                        <a>
                        <time>{i.date}</time>
                        <strong>{i.title}</strong>
                        <p>{i.content}</p>
                        </a>
                        </Link>
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

    const posts = page.map(i => ({
        slug: i.uid,
        date: new Date(i.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }),
        title: RichText.asText(i.data.title),
        content: i.data.content.find(content => content.type === "paragraph")?.text ?? ''
    }))
  
    return {
      props: {
        page: posts,
      },
    }
  }