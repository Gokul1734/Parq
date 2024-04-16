import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
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
    <View className=" bg-primary flex-1 justify-center items-center h-full -mt-30">
      <Text className=" text-white text-4xl my-10 ">Signup</Text>
      <View className="">
        <TextInput
          className="w-80 h-16 bg-box rounded-md mb-12 px-5 text-white "
          placeholderTextColor={'gray'}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />
        <TextInput
          className="w-80 h-16 bg-box rounded-md mb-12 px-5 text-white "
          placeholderTextColor={'gray'}
          placeholder="Name"
          onChangeText={setName}
          value={name}
          keyboardType="default"
        />
        <TextInput
          className="w-80 h-16 bg-box rounded-md mb-12 px-5 text-white "
          placeholderTextColor={'gray'}
          placeholder="Phone Number"
          onChangeText={setPhone}
          value={phone}
          type="tel"
          keyboardType="number-pad"
        />
        <TextInput
          className="w-80 h-16 bg-box rounded-md mb-12 px-5 text-white "
          placeholderTextColor={'gray'}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <TextInput
          className="w-80 h-16 bg-box rounded-md mb-12 px-5 text-white "
          placeholderTextColor={'gray'}
          placeholder="Confirm Password"
          onChangeText={setConfirmpassword}
          value={confirmPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity onPress={handleAuthentication}>
        <Text className="text-white bg-secondary p-3 px-5 font-bold rounded-lg">
          Signup
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
