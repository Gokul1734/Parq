const parkingData = [
  [true, true, true],
  [true, true, false],
  [false, true, false],
  [true, true, false],
];

function generateAlphabet() {
  const alphabet = [];
  for (let i = 65; i <= 90; i++) {
    alphabet.push(String.fromCharCode(i));
  }
  return alphabet;
}

for (let index = 0; index < parkingData.length; index++) {
  const element = parkingData[index];
  col(generateAlphabet()[index], element);
}

function col(letter, data) {
  //letter = "A"
  //data = [true,false,true]
  // console.log(letter);
  for (let index = 0; index < data.length; index++) {
    const number = index < 10 ? `0${index}` : `${index}`;
    console.log(`${letter}${number} - ${data[index]}`);
  }
}

/*
"@firebase/auth": "^1.6.2",
    "@heroicons/react": "^1.0.6",
    "@react-native-async-storage/async-storage": "^1.21.0",
    "@react-native-firebase/app": "^19.1.0",
    "@react-native-firebase/auth": "^19.1.0",
    "@react-native-firebase/database": "^19.1.1",
    "react-native-heroicons": "^3.2.0",
        "@react-navigation/native": "^6.1.16",
    "@react-navigation/stack": "^6.3.28",
    "@types/react": "~18.2.45",
    "expo": "^50.0.15",
    "expo-status-bar": "~1.11.1",
    "firebase": "^10.9.0",
    "heroicons": "github:tailwindlabs/heroicons",
    "nativewind": "^2.0.11",
    "react": "18.2.0",
    "react-native": "^0.73.6",
    "react-native-gesture-handler": "^2.14.0",
    "react-native-qrcode-svg": "^6.3.0",
    "typescript": "^5.3.0"
*/

