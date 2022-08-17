import * as prismic from '@prismicio/client'

export const repositoryName = 'ignews-ignite-adilson2902'

export const client = prismic.createClient(repositoryName, {
  accessToken: process.env.PRISMIC_ACESS_TOKEN,
})
