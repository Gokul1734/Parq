import React from "react";
import Navigation from "./Navigation";
import { Dimensions, Text, View } from "react-native";

export const screenDimensions = Dimensions.get('window');

export default function App() {
  console.log(screenDimensions);
  return (
   <View style={{width:screenDimensions.width,height:screenDimensions.height}}>
    <Navigation />
   </View>
  );
}
