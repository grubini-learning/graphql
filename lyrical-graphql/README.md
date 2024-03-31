# Apollo React

## Create Provider

1. import ApolloClient and ApolloProvider

```tsx
import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({});

const Root = () => {
  return <ApolloProvider client={client}>Lyrical</ApolloProvider>;
};

ReactDOM.render(<Root />, document.querySelector("#root"));
```

2. Query from a component

```tsx
const Component = (props) => {
  const { loading, songs } = props.data;

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {songs.map((song) => (
        <p key={song.id}>{song.title}</p>
      ))}
    </div>
  );
};

export default graphql(getSongs)(SongList);
```

## Mutate from a component

Query variables

```graphql
mutation AddSong($title: String) {
  addSong(title: $title) {
    id
  }
}
```

```graphql
mutate({
        variables: {
          title,
        },
        refetchQueries: [{ query: fetchSongs }],
})
```

## Refresh queries

`refetchQueries`, is used when an update made in the backend is immediately needed to be reflected on the front end.

## Adding a mutation and a query to a component

`graphql(deleteSong)(graphql(fetchSongs)(SongList));`

## Caching in React Apollo Client

To allow automatic changes to data that id stores in the Apollo Provider, we add `dataIdFromObject: (o) => o.id` in the Apollo Client configuration object.

### Resources

- http://dev.apollodata.com/react/cache-updates.html

### Optimistic UI updates

Data flow:
Call mutation -> Guess at the response we would get -> UI updates -> response comes back -> UI updates from the response in the backend server

## Tips

1. If we are using a field of a resource make sure to ask for it everywhere else.
