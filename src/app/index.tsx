import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
interface Pokemon {
  id: number,
  name: string,
  weight: number,
  image: string,
  imageBack: string,
  type: string
}
export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  useEffect(() => {
    fetchPokemons()
  }, [])

  const fetchPokemons = async () => {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20")
      const data = await res.json()
      const detailedPokemons = await Promise.all(data.results.map(async (p:any) => {
        const detailedRes = await fetch(p.url)
        const detailedData = await detailedRes.json()
        return {
          id: detailedData.id,
          name: detailedData.name,
          weight: detailedData.weight,
          image: detailedData.sprites.front_default,
          imageBack: detailedData.sprites.back_default,
          type: detailedData.types[0].type.name
        }
      }))
      setPokemons(detailedPokemons)
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <ScrollView >
      <Text>PokeDex</Text>
      {pokemons.map((pokemon:Pokemon) => (<Link href="/details" key={pokemon.id}>
        <View>
          <Text>{pokemon.name}</Text>
        </View>
      </Link>))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
