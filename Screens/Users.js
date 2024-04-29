import { child, get } from 'firebase/database';
import React, { useState } from 'react'
import { FlatList, Text, TextInput, TouchableOpacity, View, VirtualizedList } from 'react-native'
import { XMarkIcon } from 'react-native-heroicons/solid';
import config, { db } from '../firebaseConfig';
import { getAuth } from '@firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Users = () => {
 const navigation = useNavigation();
 const usernames = [];
 const uid = getAuth(config).currentUser?.uid;
 // const [searchScreen, setSearchScreen] = useState(false);

 const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(usernames);



 get(child(db, `users/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          for(let key in data) {
           usernames.push(data[key].username);
          }
          
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });


 // const [searchText, setSearchText] = useState("");

 const handleSearch = (text) => {
  setSearchQuery(text);
  const newData = usernames.filter(item => {
    const itemData = item.toLowerCase();
    const textData = text.toLowerCase();
    return itemData.indexOf(textData) > -1;
  });
  setFilteredData(newData);
};
  // console.log(filteredData);

 const renderItem = ({ item }) => (
  <TouchableOpacity
    className="bg-box m-3 py-10 mx-6 pl-4 rounded-2xl flex"
    onPress={() => {
      navigation.navigate("Info", item);
    }}
  >
    <Text className="text-secondary text-xl font-extrabold ">{item}</Text>
  </TouchableOpacity>
);
  return (
    <View className='bg-primary flex-1'>
     <View className="mb-10 mt-16">
        <View className="mx-4 mb-3 flex-row justify-between items-center border border-secondary rounded-full">
          <TextInput
            placeholder="Search Users"
            onChangeText={handleSearch}
            value={searchQuery}
            placeholderTextColor={"lightgray"}
            className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
          />
          <TouchableOpacity
            onPress={(searchText) => {
              setSearchQuery(null);
            }}
            className="rounded-full p-4 m-1 bg-secondary"
          >
            <XMarkIcon size="25" color="white" />
          </TouchableOpacity>
        </View>
        {/* <FlatList
        data={filteredData}
        renderItem={({ item }) => <Text className='bg-white text-black'>{item}</Text>}
        // keyExtractor={item => item.id}
      /> */}

          <VirtualizedList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            getItemCount={() => filteredData.length}
            getItem={(data, index) => data[index]}
          />

        {/* {(searchScreen) ? <></> : <VirtualizedList
            data={usernames}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            getItemCount={() => usernames.length}
            getItem={(data, index) => data[index]}
          />} */}
      </View>
    </View>
  )
}

export default Users