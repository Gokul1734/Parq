import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import user from "../src/user.png";
import camera from "../src/camera.png";
import loc from "../src/location.png";
import { screenDimensions } from "../App";



const AdminScreen = () => {
  const navigation = useNavigation();
  return (
    <View className="bg-primary flex-1 items-center justify-center gap-1 -ml-6" style={{width:screenDimensions.width+50,height:screenDimensions.height}}>
      <ScrollView className=" gap-5 w-9/12">
        <TouchableOpacity
          style={styles.container}
          onPress={() => {navigation.navigate('Users')}}
        >
          <Image source={user} className="ml-14 mt-9" />
          <View className=" justify-center items-center my-2 ml-1">
            <Text className="text-secondary items-end text-xl font-extrabold imprima-regular">
              Users
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {navigation.navigate('Camera')}}
        >
          <Image source={camera} className="ml-12 mt-9" />
          <View className=" justify-center items-center my-5 ml-1">
            <Text className="text-secondary items-end text-xl font-extrabold imprima-regular">
              QR Scanner
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {navigation.navigate('Location')}}

        >
          <Image source={loc} className="ml-14 mt-9" />
          <View className=" justify-center items-center my-2 ml-1">
            <Text className="text-secondary items-end text-xl font-extrabold imprima-regular">
              Locations
            </Text>
          </View>
        </TouchableOpacity>
        
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: "#21242A",
    height: 180,
    margin: 5,
    borderRadius: 16,
    top: 20,
    padding: 3,
  },
});

export default AdminScreen;
