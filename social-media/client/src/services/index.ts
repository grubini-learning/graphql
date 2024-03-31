import { GraphQLClient } from "graphql-request";

export * from "./queries";

export class GraphClient {
  private static client: GraphQLClient;

  private constructor() {}

  public static getInstance(): GraphQLClient {
    if (!GraphClient.client) {
      const token = localStorage.getItem("token") || "";
      GraphClient.client = new GraphQLClient("http://localhost:4000/graphql", {
        headers: {
          Authorization: token,
        },
      });
    }

    return GraphClient.client;
  }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQwLCJpYXQiOjE3MTA3OTM3OTF9.55NMUmpsr-q9C3CSL36aQGwa2IqFPlgQ-fYyNXYasC
