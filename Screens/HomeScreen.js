import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
  VirtualizedList,
} from "react-native";
// import XMarkIcon from "react-native-vector-icons/MaterialIcons";
import { ChevronLeftIcon, XMarkIcon } from "react-native-heroicons/solid";
import { config, db } from "../firebaseConfig";
import { child, get, getDatabase, ref } from "firebase/database";
import bike from "../src/bike.png";
import car from "../src/car.png";
import profile from "../src/profile.png";

const HomeScreen = () => {

 const locations = ['Anna Nagar Metro','Ramapuram','Phoenix Mall'
 ]
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  const auth = getAuth(config);
  const [user, setUser] = useState("null");
  // const db = ref(getDatabase(config));
  const [isbike, setIsbike] = useState("true");
  const [name, setName] = useState("");
  const uid = getAuth(config).currentUser?.uid;
  const vname = useRoute().params;
  // console.log(vname);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);
  const handleLogout = async () => {
    try {
      if (user) {
        // If user is already authenticated, log out

        await signOut(auth);
        navigation.navigate("Login");
        // setUser(null);
      }
    } catch (error) {
      alert(error);
    }
  };
  get(child(db, `users/${uid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setName(data.username);
      } else {
        setName("Guest");
      }
    })
    .catch((error) => {
      console.error(error);
    });

    const renderItem = ({ item }) => (
     <TouchableOpacity
       className="bg-box m-3 py-10 mx-6 pl-4 rounded-2xl flex"
       onPress={() => {
         navigation.navigate("Slot", item);
       }}
     >
       <Text className="text-secondary text-xl font-extrabold ">{item}</Text>
     </TouchableOpacity>
   );
  return (
    <SafeAreaView className="bg-primary flex-1">
      <View className="flex-row justify-between m-2 mt-9 mx-4 ">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          className="flex-row gap-1 border-2 mt-1 border-secondary rounded-full w-10 h-10 items-center justify-center pr-1 pb-1 "
        >
          <ChevronLeftIcon size={26} color={"#258EA6"} />
        </TouchableOpacity>
        <View className="flex-row items-center gap-x-4">
          <Text className="text-white font-extrabold text-xl">{name}</Text>
          <Image className="border-2 rounded-full" source={profile} />
        </View>
      </View>
      <View className="mb-10 mt-4">
        <View className="mx-4 mb-3 flex-row justify-between items-center border border-secondary rounded-full">
          <TextInput
            placeholder="Search Parking Locations"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor={"lightgray"}
            className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
          />
          <TouchableOpacity
            onPress={(searchText) => {
              setSearchText("");
            }}
            className="rounded-full p-4 m-1 bg-secondary"
          >
            <XMarkIcon size="25" color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {/* <View className="m-3">
        <Button
          title="Book Slots"
          onPress={() => {
            navigation.navigate("Slot", vname);
          }}
          color={"#258EA6"}
          className="bg-secondary rounded-lg"
        />
      </View> */}
      <VirtualizedList
            data={locations}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            getItemCount={() => locations.length}
            getItem={(data, index) => data[index]}
          />
      <View className=" flex justify-end mb-12">
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
