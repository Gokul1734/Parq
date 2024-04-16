import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import bike from "../src/bike.png";
import car from "../src/car.png";

const Selector = () => {
  const navigation = useNavigation();
  const [isbike, setIsbike] = useState("true");

  return (
    <View className="bg-primary flex-1 items-center justify-around">
      <View className="flex-row mb-4 gap-5 justify-center items-start">
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            navigation.navigate("Vehicle", isbike);
          }}
        >
          <Image source={bike} className="ml-12 mt-9" />
          <View className=" justify-center items-center my-2 ml-1">
            <Text className="text-secondary items-end text-xl font-extrabold imprima-regular">
              BIKE
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            navigation.navigate("Vehicle", !isbike);
          }}
        >
          <Image source={car} className="ml-12 mt-9" />
          <View className=" justify-center items-center my-5 ml-1">
            <Text className="text-secondary items-end text-xl font-extrabold imprima-regular">
              CAR
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "40%",
    backgroundColor: "#21242A",
    height: 180,
    margin: 5,
    borderRadius: 16,
    top: 20,
    padding: 3,
  },
});

export default Selector;
