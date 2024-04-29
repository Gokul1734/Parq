import React, { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  Animated,
  TouchableOpacity,
  View,
} from "react-native";
import filledCar from "../src/filledSlot.png";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const CarPlacement = ({ floor,location, vname }) => {
  const parkingData = [
    [false, true, false],
    [true, true, false],
    [false, true, true],
    // [false, false, false],
    // [true, true, false],
    // [false, false, true],

  ];
  // console.log(vname);

  const navigation = useNavigation();

  // const handleGesture = useAnimatedGestureHandler({
  //   onActive: {},
  //   onEnd: {},
  // });

  function generateAlphabet() {
    const alphabet = [];
    for (let i = 65; i <= 90; i++) {
      alphabet.push(String.fromCharCode(i));
    }
    return alphabet;
  }

  const rows = parkingData.length;
  const cols = parkingData[0].length;
  const [selection, setSelection] = useState(false);

  const rowstyle = "flex flex-row  justify-center items-center";
  const boxstyle =
    "flex-1 h-20 justify-center items-center border-4 border-secondary";

  const RenderRow = ({ cols, data }) => {
    // console.log(data);
    return (
      <View className={rowstyle}>
        {data[0] ? <Aslot item={`${cols}00`} /> : <Fslot />}
        {data[1] ? <Aslot item={`${cols}01`} /> : <Fslot />}
        {data[2] ? <Aslot item={`${cols}02`} /> : <Fslot />}
      </View>
    );
  };

  const selected = (item) => {
    setSelection(item);
  };

  const Fslot = () => {
    return (
      <View className={boxstyle}>
        <Image source={filledCar} className="h-10 w-16" />
      </View>
    );
  };

  const Aslot = ({ item }) => {
    // console.log(item);
    return (
      <View className={boxstyle}>
        <TouchableOpacity
          className="rounded-lg p-1 border-4 border-secondary px-4"
          onPress={() => selected(item)}
          style={{
            backgroundColor: selection == item ? "#258EA6" : "transparent",
          }}
        >
          <Text className="text-white font-bold text-lg">{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex  justify-center items-center">
      <View style={{alignItems:'center',justifyContent:'center'}}>
        <RenderRow cols={"A"} data={parkingData[0]} />
        <RenderRow cols={"B"} data={parkingData[1]} />
        <RenderRow cols={"C"} data={parkingData[2]} />
        {/* <RenderRow cols={"D"} data={parkingData[3]} />
        <RenderRow cols={"E"} data={parkingData[4]} />
        <RenderRow cols={"F"} data={parkingData[5]} /> */}

      </View>
      {selection ? (
        <TouchableOpacity
          onPress={() => {
            // console.log(time);
            navigation.navigate("QTicket", {
              slot: selection,
              vname: vname,
              location : location
            });
          }}
          className=" flex-row items-center justify-center mt-10 bg-secondary p-4 mx-5 w-80 rounded-full"
        >
          <Text className="text-xl mx-12 font-bold text-box ">
            {selection} - BOOK SLOT
          </Text>
          {/* <Text className="text-lg ">Book Slot : {selection}</Text> */}
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default CarPlacement;
