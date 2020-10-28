import React from 'react';
import { gql, useQuery } from '@apollo/client';

function getPlants(client, currentPlant, setCurrentPlant) {
  const { loading, error, data } = useQuery(gql`
    query getPlants {
      plants {
        name
        maxWidth
        maxHeight
        color
      }
    }
  `, { client });
  if (loading) return null
  if (error) {
    console.log(error);
    return null;
  }

  return data.plants.map((plant, i) => 
    <button key={i} onClick={() => {setCurrentPlant(plant);}}style={{marginRight: 5, background: currentPlant === plant ? "pink" : "#ddd", width: 100, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "5px"}}>
        <div style={{width: 40, height: 40, borderRadius: 25, background: plant.color}}></div>
        {plant.name}
    </button>
  );
}

export default function PlantToolbar(props) {
  const { client, width, height, currentPlant, setCurrentPlant } = props;
  
  return (
    <div height={height} width={width} style={{background:"#eee", height, width, padding: "5px", display: "flex", boxSizing: "border-box"}}>
        {getPlants(client, currentPlant, setCurrentPlant)}
    </div>
  );
}