import React, { useState } from 'react'
import { screenDimensions } from '../App'
import { Text, View, VirtualizedList } from 'react-native'
import { useRoute } from '@react-navigation/native'
import config, { db } from '../firebaseConfig';
import { getAuth } from '@firebase/auth';
import { child, get } from 'firebase/database';

const Userinfo = () => {
 const username = useRoute().params;
 const [userData,setuserData] = useState([]);

 get(child(db, `users/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          for(let key in data) {
           if(data[key].username == username) {
            setuserData(data[key]);
           }
          }
          
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

      const renderItem = ({ item }) => (
       <View className="bg-box m-3 py-10 mx-6 pl-4 rounded-2xl flex">
         <Text className="text-secondary text-xl font-extrabold ">{item}</Text>
       </View>
     );
  // console.log(userData['bike']);
  return (
   <View style={{width:screenDimensions.width,height:screenDimensions.height,flex:1}}>
   <View className=" bg-primary flex-1 h-full" >
    <View className='mt-16 items-center'>
    <Text className='text-secondary text-2xl font-extrabold'>{username}</Text> 
    </View>
    <View className='my-10'>
     <Text className="text-base text-text leading-normal bg-box m-2 p-5 mx-5 rounded-full">Phone : {userData.phone}</Text>
     <Text className="text-base text-text leading-normal bg-box m-2 p-5 mx-5 rounded-full">Email : {userData.email}</Text>
    </View>
    <View>

    </View>
    </View>
   </View>
  )
}

export default Userinfo
