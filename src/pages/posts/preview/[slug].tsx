import { GetStaticProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Head  from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import React, { useEffect } from 'react';
import { client } from '../../../services/prismic';

import styles from '../post.module.scss';
 

interface PostPreviewProps {
    post: {
        slug: string;
        title: string;
        content: string;
        date: string;
    }
}

const PostsPreview: React.FC<PostPreviewProps> = ({ post }) => {

    const { data: session } = useSession();

    const router = useRouter();

    useEffect(() => { 
        if(session?.activeSubscription){
            router.push(`/posts/${post.slug}`)
        }

    },[post.slug, router, session])

  return <>
            <Head>{post.title} | Ignews</Head>
            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.date}</time>
                    <div 
                    className={`${styles.postContent} ${styles.previewContent}`}
                    dangerouslySetInnerHTML={{ __html: post.content}}/>

                    <div className={styles.continueReading}>
                        Wanna continue reading?
                        <Link href="/">
                        <a>Subscribe now 🤗</a>
                        </Link>
                    </div>
                </article>
            </main>
         </>;
}

export default PostsPreview;

export const getStaticPaths = () => {
    return {
        paths:[],
        fallback: "blocking"
    }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { slug } = params;

    const prismic = await client.getByUID('post', String(slug), {});

    const post = {
        slug, 
        title: RichText.asText(prismic.data.title),
        content: RichText.asHtml(prismic.data.content.splice(0,1)),
        date: new Date(prismic.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }),
    }

    return {
        props: {
            post
        },
        redirect: 60 * 30,
    }

}