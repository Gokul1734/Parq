import React, { useState } from "react";
import {
  Button,
  FlatList,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  VirtualizedList,
} from "react-native";
import { ChevronLeftIcon, XMarkIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import CarPlacement from "../components/CarPlacement";
const Slot = () => {
  const navigation = useNavigation();
  const vname = useRoute().params;
  console.log(vname);
  const data = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
  ];

  const [selectedItem, setSelectedItem] = useState(null);

  const HandleSelectItem = (item) => {
    setSelectedItem(item);
    // console.log(item);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        HandleSelectItem(item);
      }}
      className="border-2 border-secondary h-9 mr-5
       justify-center items-center rounded-full w-24 "
      style={{
        backgroundColor:
          selectedItem && selectedItem.id === item.id
            ? "#258EA6"
            : "transparent",
      }}
    >
      <Text className="text-white imprima-regular text-lg">
        Floor {item.id}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="bg-primary flex-1 ">
      <View className="flex-row  m-8 mt-9 mx-7 ">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          className="flex-row gap-1 border-2 mt-1 border-secondary rounded-full w-10 h-10 items-center justify-center pr-1 pb-1 "
        >
          <ChevronLeftIcon size={26} color={"#258EA6"} />
        </TouchableOpacity>
        <Text className=" text-white text-xl m-2.5 pl-4">Pick your Slot</Text>
      </View>
      <View className=" h-screen p-3.5 flex-col gap-5  ">
        <View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
          />
        </View>
        {selectedItem && (
          <View className=" h-4/5  p-2">
            <CarPlacement floor={selectedItem.name} vname={vname} />
          </View>
        )}
      </View>
    </View>
  );
};

export default Slot;
