import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screenDimensions } from "../App";
// import { handleSignIn } from "../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";
import config from "../firebaseConfig";
import { getDatabase, ref, set } from "firebase/database";
import { ScrollView } from "react-native-gesture-handler";

const auth = getAuth(config);
const db = getDatabase(config);

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true);
  const [confirmPassword, setConfirmpassword] = useState("");
  const navigation = useNavigation();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //   });

  //   return () => unsubscribe();
  // }, [auth]);

  const handleAuthentication = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setTimeout(async () => {
            set(ref(db, "users/" + user.uid), {
              username: name,
              email: email,
              phone: phone,
            }),
              200;
            console.log("User created successfully!");
          });
        }
      });

      navigation.navigate("Login");
    } catch (error) {
      console.error("Authentication error:", error.message);
    }
  };

  return (
    <View className=" bg-primary flex-1 justify-center items-center h-full p-5 ">
     <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{alignItems:'center'}} style={{width:screenDimensions.width*0.8,height:screenDimensions.height*0.3,flex:1}}>
      <Text className=" text-white text-3xl my-10 ">Signup</Text>
      <View className="">
        <TextInput
          className="h-16 bg-box rounded-md mb-10 px-5 text-white"
          style={{width:screenDimensions.width*0.8,height:screenDimensions.height*0.09}}
          placeholderTextColor={'gray'}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />
        <TextInput
          className="w-80 h-16 bg-box rounded-md mb-10 px-5 text-white "
          style={{width:screenDimensions.width*0.8,height:screenDimensions.height*0.09}}

          placeholderTextColor={'gray'}
          placeholder="Name"
          onChangeText={setName}
          value={name}
          keyboardType="default"
        />
        <TextInput
          className="w-80 h-16 bg-box rounded-md mb-10 px-5 text-white "
          style={{width:screenDimensions.width*0.8,height:screenDimensions.height*0.09}}

          placeholderTextColor={'gray'}
          placeholder="Phone Number"
          onChangeText={setPhone}
          value={phone}
          type="tel"
          keyboardType="number-pad"
        />
        <TextInput
          className="w-80 h-16 bg-box rounded-md mb-10 px-5 text-white "
          style={{width:screenDimensions.width*0.8,height:screenDimensions.height*0.09}}

          placeholderTextColor={'gray'}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <TextInput
          className="w-80 h-16 bg-box rounded-md mb-10 px-5 text-white "
          style={{width:screenDimensions.width*0.8,height:screenDimensions.height*0.09}}
          placeholderTextColor={'gray'}
          placeholder="Confirm Password"
          onChangeText={setConfirmpassword}
          value={confirmPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity onPress={handleAuthentication} className='items-center'>
        <Text className="text-white bg-secondary p-3 px-5 font-bold rounded-lg">
          Signup
        </Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SignIn;
