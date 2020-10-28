import React, { useState } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, gql, useQuery } from '@apollo/client';
import { Stage, Layer, Text, Circle } from 'react-konva';
import PlantToolbar from './components/PlantToolbar';
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
    <Text text={plant.name} x={10} y={20*i} key={i} />
  );
}

export default function App() {
  const toolbarHeight = 100;
  const mapWidth = window.innerWidth;
  const mapHeight = window.innerHeight - toolbarHeight;
  const [currentPlant, setCurrentPlant] = useState(null);
  return (
    <ApolloProvider client={client}>
      <Stage width={mapWidth} height={mapHeight}>
        <Layer>
          {getPlants(client)}
          <Circle x={200} y={200} stroke="black" radius={50} />
       </Layer>
      </Stage>
      <PlantToolbar client={client} width={mapWidth} height={toolbarHeight} currentPlant={currentPlant} setCurrentPlant={setCurrentPlant} />
    </ApolloProvider>
  );
}