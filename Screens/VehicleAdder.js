import { firebase } from "@react-native-firebase/auth";
import { child, getDatabase, ref, set } from "firebase/database";
import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { config } from "../firebaseConfig";
import { getAuth } from "@firebase/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
let count = 0;

const BikeAdder = () => {
  const vname = useRoute().params;
  const [Name, setName] = useState("");
  const [vno, setVno] = useState("");
  const db = getDatabase(config);
  const navigation = useNavigation();
  const uid = getAuth(config).currentUser?.uid;
  const vbool = vname == "Bike" ? true : false;
  const [loading, setLoading] = useState(false);
  const BikeData = () => {
    set(ref(db, `/users/${uid}/${vname}/${Name}`), {
      vehname: Name,
      vehno: vno,
    });
    alert(`Added ${Name} to your collection!`);
    count++;
    setLoading(true);
    navigation.navigate("Vehicle", vbool);
  };

  return (
    <SafeAreaView className=" bg-primary flex-1 justify-center items-center h-full -mt-30">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Text className=" text-white text-4xl my-10 ">Add you {vname}</Text>
          <View className="">
            <TextInput
              className="w-80 h-16 bg-box rounded-md mb-12 px-5 text-white "
              placeholder={`${vname} Name`}
              onChangeText={setName}
              value={Name}
              keyboardType="default"
            />
            <TextInput
              className="w-80 h-16 bg-box rounded-md mb-12 px-5 text-white "
              placeholder={`${vname} Registration Number`}
              onChangeText={setVno}
              value={vno}
              keyboardType="default"
            />
          </View>
          <TouchableOpacity>
            <Text
              className="text-white bg-secondary p-3 px-5 font-bold rounded-lg"
              onPress={BikeData}
            >
              ADD {vname}
            </Text>
          </TouchableOpacity>
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

export default BikeAdder;
