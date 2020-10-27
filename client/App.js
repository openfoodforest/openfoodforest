import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, gql, useQuery } from '@apollo/client';
import { Stage, Layer, Text, Circle } from 'react-konva';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

function getPlants(client) {
  const { loading, error, data } = useQuery(gql`
    query getPlants {
      plants {
        name
        maxWidth
      }
    }
  `, { client });
  if (loading) return null
  if (error) {
    console.log(error);
    return null;
  }

  return data.plants.map((plant, i) => 
    <Text text={plant.name} x={10} y={20*i} />
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {getPlants(client)}
          <Circle x={200} y={200} stroke="black" radius={50} />
       </Layer>
      </Stage>
    </ApolloProvider>
  );
}
//