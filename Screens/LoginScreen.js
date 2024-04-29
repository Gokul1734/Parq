import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import config from "../firebaseConfig";
import screenDimensions from '../App'
// import firebase from "../firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const auth = getAuth(config);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const HandleLogin = async () => {
    try {
      if(email == 'gokul@gmail.com' && password == 'admin') {
       navigation.navigate("Admin");
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);

      console.log("User signed in successfully!");
      navigation.navigate("Selector");
    } catch (error) {
      alert(error);
    }
  };

  return (
   <View style={{width:screenDimensions.width,height:screenDimensions.height,flex:1}}>
    <View className=" bg-primary flex-1 justify-center items-center h-full" >
      <Text className=" text-white text-4xl my-20 ">Login</Text>
      <View className="">
        <TextInput
          className="w-80 h-16 bg-box rounded-md mb-12 px-5 text-white "
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />
        <TextInput
          className="w-80 h-16 bg-box rounded-md mb-12 px-5 text-white "
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
      </View>
      <TouchableOpacity onPress={HandleLogin}>
        <Text className="text-white bg-secondary p-3 px-5 font-bold rounded-lg">
          Login
        </Text>
      </TouchableOpacity>
      <View className="flex    text-white">
        <Text className="pt-10 text-white">New to Parq Appplication ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text className="text-secondary">Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
};

export default Login;
