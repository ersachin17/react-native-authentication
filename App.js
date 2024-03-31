import {NavigationContainer} from '@react-navigation/native'
import Login from './Components/Login'
import Home from './Components/Home'
import { Provider } from 'react-redux'
import store from './Redux/Store'
import persistStore from 'redux-persist/es/persistStore'
import { PersistGate } from 'redux-persist/integration/react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
 const App = ()=> {
  const Stack = createNativeStackNavigator()
  let persistor = persistStore(store)
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
     <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}} name='Login' component={Login}/>
        <Stack.Screen name='Home' options={{headerShown:false}} component={Home}/>
      </Stack.Navigator>
     </NavigationContainer>
    </PersistGate>
    </Provider>
  )
 }
export default App