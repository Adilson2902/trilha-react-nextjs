import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head  from 'next/head';
import { RichText } from 'prismic-dom';
import React from 'react';
import { client } from '../../services/prismic';

import styles from './post.module.scss';
 

interface PostProps {
    post: {
        slug: string;
        title: string;
        content: string;
        date: string;
    }
}

const Posts: React.FC<PostProps> = ({ post }) => {
  return <>
            <Head>{post.title} | Ignews</Head>
            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.date}</time>
                    <div 
                    className={styles.postContent}
                    dangerouslySetInnerHTML={{ __html: post.content}}/>
                </article>
            </main>
         </>;
}

export default Posts;


export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const session = await getSession({ req })
    const { slug } = params;

    if(!session.activeSubscription){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const prismic = await client.getByUID('post', String(slug), {});

    const post = {
        slug, 
        title: RichText.asText(prismic.data.title),
        content: RichText.asHtml(prismic.data.content),
        date: new Date(prismic.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }),
    }

    return {
        props: {
            post
        }
    }

}