import { colorsByType } from "@/utils/colors";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
interface Pokemon {
  id: number,
  name: string,
  weight: number,
  image: string,
  imageBack: string,
  type: string,
  url: string
}

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  useEffect(() => {
    fetchPokemons()
  }, [])

  const fetchPokemons = async () => {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=50")
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
          type: detailedData.types[0].type.name,
          url: p.url
        }
      }))
      setPokemons(detailedPokemons)
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>PokeDex</Text>
      <View style={styles.cardContainer}>

      {pokemons.map((pokemon:Pokemon) => (<Link href={{pathname: "/details", params:{id:pokemon.id, name:pokemon.name, weight:pokemon.weight, image:pokemon.image, type:pokemon.type, url: pokemon.url}}} key={pokemon.id}>
        <View style={{...styles.card, backgroundColor: colorsByType[pokemon.type as keyof typeof colorsByType]}}>
          <Text>{pokemon.name.toLocaleUpperCase()}</Text>
        </View>
      </Link>))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{margin:10, padding:10},
  card: {
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    padding:5,
    // width:"100%",
    textAlign:"center",
    textAlignVertical:"center",
    paddingLeft:10,
    borderWidth:1,
    borderRadius:100,
    paddingVertical:10,
    paddingHorizontal:20,
    flex:3
  },
  cardContainer: {flexDirection:"row", flexWrap:"wrap", gap:10, fontSize:200, alignItems:"center"},
  title : {marginBottom:10, fontSize:50, fontWeight:"100"}
});
