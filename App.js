// import { View, Text } from 'react-native'
// import React from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
// const App = () => {
//   const Stack = createNativeStackNavigator();
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name='Home' component={Home} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

// export default App
import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from './components/screen/Home'
import ProductInfo from './components/screen/ProductInfo'
import MyCart from './components/screen/MyCart'

const App = () => {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ProductInfo" component={ProductInfo} />
        <Stack.Screen name="MyCart" component={MyCart} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App