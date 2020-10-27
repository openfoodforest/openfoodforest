import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloClient, ApolloProvider, InMemoryCache, gql, useQuery } from '@apollo/client';

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
  if (loading) return <p>Loading ...</p>;
  if (error) {
    console.log(error);
    return <p>Error</p>;
  }

  return data.plants.map(plant => 
    <div key={plant.name}>
      <p>{plant.name}</p>
      <p>{plant.maxWidth}</p>
    </div>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Text>{getPlants(client)}</Text>
        <StatusBar style="auto" />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
