import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  SectionList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  VirtualizedList,
} from "react-native";
import {
  ChevronLeftIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "react-native-heroicons/solid";
import BikeAdder from "./VehicleAdder";
import { useNavigation, useRoute } from "@react-navigation/native";
import { config, db } from "../firebaseConfig";
import { child, get, getDatabase, onValue, ref } from "firebase/database";
import profile from "../src/profile.png";
import { getAuth } from "@firebase/auth";

// const bikeDat = ref(db, "users/" + uid + "/bikes/");
const BikeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();
  const uid = getAuth(config).currentUser?.uid;
  const route = useRoute();
  const vname = route.params ? "Bike" : "Car";
  const [Bikes, setBikes] = useState([]);
  const [Cars, setCars] = useState([]);
  const vehicle = route.params ? Bikes : Cars;
  const isFocused = navigation.isFocused();

  useEffect(() => {
    get(child(db, `users/${uid}/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setLoading(false);
          const data = snapshot.val();
          setName(data.username);
          for (var veh in data[`${vname}`]) {
            if (!vehicle.includes(veh)) {
              vehicle.push(veh);
            }
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="bg-box m-3 py-10 mx-6 pl-4 rounded-2xl flex"
      onPress={() => {
        navigation.navigate("Home", item);
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
      <View className=" mt-8 mx-4 mb-3 flex-row justify-between items-center border border-secondary rounded-full">
        <TextInput
          placeholder={`Search your ${vname}`}
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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AddVehicle", vname);
        }}
        className="flex-row items-center justify-center align-middle bg-box m-3 py-4 mx-6 pl-4 rounded-2xl"
      >
        <Text className="text-secondary text-xl font-extrabold mr-2 ">
          {`Add ${vname}`}
        </Text>
        <PlusCircleIcon color={"#258EA6"} size={30} />
      </TouchableOpacity>

      {loading ? (
        <View className="flex justify-center items-center">
          <ActivityIndicator animating={true} color="#fff" />
        </View>
      ) : (
        <>
          <VirtualizedList
            data={vehicle}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            getItemCount={() => vehicle.length}
            getItem={(data, index) => data[index]}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const Loader = () => (
  <View className="flex-1 justify-center items-center">
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

export default BikeScreen;

// const addBike = () => {
//  // const newBike = {
//  //   id: "V003",
//  //   name: "Honda Xtreme 125R",
//  //   bno: "TN07BF0307",
//  //   membership: ["L002", "L003", "L008"],
//  // };
//  // if (newBike) {
//  //   Bikes.push(newBike);
//  //   return Bikes;
//  // } else {
//  //   return Bikes;
//  // }
// };
