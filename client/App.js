import React, { useState, useEffect } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, gql, useQuery } from '@apollo/client';
import { Stage, Layer, Text, Circle } from 'react-konva';
import PlantToolbar from './components/PlantToolbar';
const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

function addPlant(e, currentPlant, drawnPlants, setDrawnPlants) {
  let plants = drawnPlants.slice();
  plants.push({plant: currentPlant, x: e.evt.layerX, y: e.evt.layerY});
  plants = plants.sort((a, b) => {
    if (a.plant.maxHeight >= b.plant.maxHeight) {
      return 1;
    }
    return -1;
  });
  setDrawnPlants(plants);
}

export default function App() {
  const toolbarHeight = 100;
  const mapWidth = window.innerWidth;
  const mapHeight = window.innerHeight - toolbarHeight;
  const [currentPlant, setCurrentPlant] = useState(null);
  const [drawnPlants, setDrawnPlants] = useState([]);

  return (
    <ApolloProvider client={client}>
      <Stage width={mapWidth} height={mapHeight} onClick={(e) => {addPlant(e, currentPlant, drawnPlants, setDrawnPlants); }}>
        <Layer>
          {drawnPlants.map((data, i) => 
            <Circle key={i} x={data.x} y={data.y} stroke="black" fill={data.plant.color} radius={data.plant.maxWidth} />
          )}
       </Layer>
      </Stage>
      <PlantToolbar client={client} width={mapWidth} height={toolbarHeight} currentPlant={currentPlant} setCurrentPlant={setCurrentPlant} />
    </ApolloProvider>
  );
}