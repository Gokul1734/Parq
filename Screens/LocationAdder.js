import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { v4 } from 'uuid';
// import { handleSignIn } from "../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";
import config from "../firebaseConfig";
import { child, getDatabase, ref, set } from "firebase/database";
import { screenDimensions } from "../App";
import { ScrollView } from "react-native-gesture-handler";

const auth = getAuth(config);
const db = getDatabase(config);

const SignIn = () => {
  const [Location, setLocation] = useState("");
  const [Geolocation, setGeolocation] = useState("");
  const [MaxSlots, setMaxSlots] = useState("");
  const [Floors, setFloors] = useState("");
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true);
  const [Description, setDescription] = useState("");
  const navigation = useNavigation();
  console.log(v4());

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //   });

  //   return () => unsubscribe();
  // }, [auth]);

 const addLocation = () => {
  // const URL = `https://www.google.com/maps/place/${Geolocation}`;
  set(ref(db,`/locations/L${MaxSlots}`), {
    Location : Location,
    Geolocation : Geolocation,
    MaxSlots: MaxSlots,
    Floors : Floors,
    Description : Description,
  })


  // Linking.openURL(`https://www.google.com/maps/place/${Geolocation}`);
 }

  return (
    <ScrollView 
    className=" bg-primary flex-1 h-full" 
    style={{width:screenDimensions.width,height:screenDimensions.height}}
    contentContainerStyle={{
     alignItems: 'center', // Align items horizontally in the center
     justifyContent: 'flex-start', // Justify content vertically to the start (top)
   }}
    >
      <Text className=" text-white text-4xl my-10 ">Location</Text>
      <View className="">
        <TextInput
          className="w-80 h-16 bg-box rounded-md mb-12 px-5 text-white "
          placeholderTextColor={'gray'}
          placeholder="Location"
          onChangeText={setLocation}
          value={Location}
          keyboardType="email-address"
        />
        <TextInput
          className="w-80 h-16 bg-box rounded-md mb-12 px-5 text-white"
          placeholderTextColor={'gray'}
          placeholder="Geo Location"
          onChangeText={setGeolocation}
          value={Geolocation}
          keyboardType="default"
        />
        <TextInput
          className="w-80 h-16 bg-box rounded-md mb-12 px-5 text-white "
          placeholderTextColor={'gray'}
          placeholder="MaxSlots Available"
          onChangeText={setMaxSlots}
          value={MaxSlots}
          type="tel"
          keyboardType="number-pad"
        />
        <TextInput
          className="w-80 h-16 bg-box rounded-md mb-12 px-5 text-white "
          placeholderTextColor={'gray'}
          placeholder="Floors"
          onChangeText={setFloors}
          value={Floors}
        />
        <TextInput
          className="w-80 h-16 bg-box rounded-md mb-12 px-5 text-white "
          placeholderTextColor={'gray'}
          placeholder="Description"
          onChangeText={setDescription}
          value={Description}
        />
      </View>
      <TouchableOpacity onPress={addLocation} >
        <Text className="text-white bg-secondary p-3 px-5 font-bold rounded-lg mb-5">
          Add Location
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignIn;
