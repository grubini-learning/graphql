import { graphqlHTTP } from "express-graphql";

import server from "./server";
import { UserSchema } from "./query";

const PORT = 4000;

server.use(
  "/graphql",
  graphqlHTTP({
    schema: UserSchema,
    graphiql: true,
  })
);

server.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
