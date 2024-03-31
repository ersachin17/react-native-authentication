
import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import { loginUser } from '../Redux/LoginSlice';
import { useSelector } from 'react-redux';
const Login = ({navigation}) => {
  const dispatch = useDispatch()
  const PlayerId = useSelector((state) => state.auth.user?.player);

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const login = async()=>{
    try{
      await dispatch(loginUser({
        email:email,
        password:password,
        loginType: "member",
        partner: "juaaree",
        source: "mobile",
        deviceID: "djfreg839458934sbdewr",
        deviceToken: "enfjrhfiuherughrgu9834976543976983476",
      }));
      navigation.navigate('Home')
    }catch (error) {
      console.error("Login failed:", error);
    } finally {
      setEmail("");
      setPassword("");
    }
  };
  useEffect(() => {
    if (PlayerId) {
      navigation.navigate('Home');
    }
  }, [PlayerId, navigation]);
  return (
    <View style={styles.container}>
      <Text style={{fontSize:20,fontWeight:"bold",alignContent:"center"}}>Login</Text>
      <TextInput style={styles.inputtest} placeholder='Enter Email' value={email}  onChangeText={(text)=>setEmail(text)}/>
      <TextInput style={styles.inputtest} placeholder='Enter Password' value={password} onChangeText={(text)=>setPassword(text)}/>
      <Button title='Login' onPress={login}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth:1,
    borderRadius:10,
    borderColor:"#cccccc",
    marginVertical:100,
    marginHorizontal:30,
  },
  inputtest:{
    borderWidth:1,
    borderRadius:5,
    borderColor:"#cccccc",
    width:"70%",
    alignContent:"center",
    paddingLeft:4,
    margin:4
  }
});

export default Login;
