import { colorsByType } from "@/utils/colors";
import { Link, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Details() {
  const params = useLocalSearchParams();
  const name = params.name as string;
  const image = params.image as string;
  const weight = params.weight as string;
  const type = params.type as string;
  const id = params.id as string;
  const url = params.url as string;
  console.log(url);
  if (!id) {
    return (
      <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
        <Text>404 Page Not Found</Text>
        <Link href="/" style={{margin:10, backgroundColor: "lightgray", padding:10, borderRadius:100}}>
            <Text>Go Home</Text>
        </Link>
      </View>
    );
  }
  console.log(image);
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          ...styles.card,
          backgroundColor: colorsByType[type as keyof typeof colorsByType] + 75,
        }}
      >
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text>ID: {id}</Text>
        <Text>Name: {name}</Text>
        <Text>Weight: {weight}</Text>
        <Text>Type: {type}</Text>
        <Text>
          More info available at{" "}
          <Link style={{ textDecorationLine: "underline", fontWeight:300 }} href="/">
            <Text>{url}</Text>
          </Link>{" "}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  card: {
    borderRadius: 50,
    paddingHorizontal: 50,
    paddingVertical: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  textContainer: {
    flexDirection: "column",
    gap: 10,
    padding: 10,
    paddingTop: 30,
    fontSize: 300,
    fontWeight: "100",
  },
});
