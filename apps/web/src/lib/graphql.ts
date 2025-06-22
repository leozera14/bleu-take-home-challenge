import { Client, cacheExchange, fetchExchange } from "urql";

export const graphqlClient = new Client({
  url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? "",
  exchanges: [cacheExchange, fetchExchange]
})