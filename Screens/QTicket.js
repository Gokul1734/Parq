import { getAuth } from "@firebase/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import QRCode from "react-native-qrcode-svg";
import { child, get } from "firebase/database";
import { config, db } from "../firebaseConfig";
import { screenDimensions } from "../App";

const QTicket = () => {
  const navigation = useNavigation();
  const uid = getAuth(config).currentUser?.uid;
  const { slot, location,vname } = useRoute().params;
  console.log(slot,location,vname);
  useEffect(() => {
    get(child(db, `users/${uid}/${"Bike" && "Car"}/${vname}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (data.vehname == vname) {
            console.log(data.vehno);
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
  const timeStamp = Date.now();
  const time = new Date(timeStamp);
  // console.log(time.toLocaleDateString());
  // console.log(time.toLocaleTimeString());

  const jsonData = [
    {
      id: uid,
      // vname: vname ? vname : "",
      vno: "TN07BF9199",
      date: "2022-02-02",
      time: "12 AM",
      status: "Active",
      // slot: slot ? slot : "",
    },
  ];
  const jsonString = JSON.stringify(jsonData);
  return (
    <ScrollView className="bg-primary flex-1   ">
      <View className="flex-row  m-2 mt-10 mx-2 ">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          className="flex-row gap-1 border-2 mt-1 border-secondary rounded-full w-10 h-10 items-center justify-center pr-1 pb-1 "
        >
          <ChevronLeftIcon size={20} color={"#258EA6"} />
        </TouchableOpacity>
      </View>
      <View className="flex items-center">
        <View 
        className=" bg-secondary items-center p-6 mt-16 h-72 w-72 rounded-md"
        style={{width:screenDimensions.width*0.8,height:screenDimensions.height*0.45}}
        >
          <QRCode
            className=" bg-secondary items-center mt-40 h-72 w-72"
            style={{width:screenDimensions.width*0.8,height:screenDimensions.height*0.45}}
            value={jsonString}
            size={240}
            color="#258EA6"
          />
        </View>
        <Text className="text-lg mt-4 text-center  w-72 text-secondary ">
          Scan this before entering the Parking Premisis
        </Text>
      </View>
      <View className="flex justify-start items-start mt-24 mx-10 ">
        <Text className="text-xl text-secondary">Date : {time.toLocaleDateString()}  {time.toLocaleTimeString()} </Text>
        <Text className="text-xl text-secondary">Slot ID : {slot}</Text>
        <Text className="text-xl text-secondary">
          Parking Location : {vname}
        </Text>
        <Text className="text-xl text-secondary">
          Expiry : 24 Hrs
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
        }}
        className="flex-row mt-14 items-center justify-center bg-red-500 p-4 mx-7 w-80 rounded-full mb-5"
        style={{width:screenDimensions.width*0.8,height:screenDimensions.height*0.1}}
      >
        <Text className="text-xl font-semibold">Cancel Booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default QTicket;
