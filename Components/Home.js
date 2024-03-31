import React, { useState,useEffect} from 'react';
import { View, Text, Button, TextInput, FlatList, Pressable,StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/LoginSlice';
import { addTodo,deleteTodo } from '../Redux/TodoSlice';

const Home = ({ navigation }) => {
  const PlayerId = useSelector((state) => state.auth.user?.player);
  const todos = useSelector((state)=>state.todos.todos);
  const dispatch = useDispatch();
  const [text, setText] = useState('');
    const handleAddTodo = ()=>{
      if(text.trim() !== ''){
        const newTodo = {id:Math.random().toString(),text}
        dispatch(addTodo(newTodo));
        setText('')
      }
       };
    
    const handledelete = (id)=>{
      dispatch(deleteTodo(id));
    };
  
  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Login'); 
  };
  useEffect(() => {
    if (!PlayerId) {
      navigation.navigate('Login');
    }
  }, [PlayerId, navigation]);
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 15, marginBottom: 10, fontWeight: 'bold' }}>
        Welcome To Dashboard Player No -- {PlayerId} No </Text>
        <Button title='Logout' onPress={handleLogout}/>
      <View style={styles.flex}>
        <TextInput
          style={styles.text}
          placeholder="Add Your Todo"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <Button color={'purple'} title="Add Todo" onPress={handleAddTodo} />
      </View>
      <FlatList
  style={styles.todolist}
  data={todos}
  renderItem={({ item }) => (
    <Pressable onPress={() => handledelete(item.id)}>
      <Text style={styles.todo}>{item.text.text}</Text>
    </Pressable>
  )}
  keyExtractor={(item) => item.id.toString()}
/>

      
        </View>
    );
};
  
const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    marginTop:40
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'purple',
    paddingBottom: 20,
    marginBottom: 20,
    marginTop:10
  },
  text: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '75%',
    marginRight: 5,
    padding: 5,
    borderRadius: 8,
    fontSize: 20,
    color: 'purple',
  },
  todo: {
    borderWidth: 1,
    borderColor: '#cccccc',
    marginVertical: 5,
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 8,
    backgroundColor: 'purple',
    color: 'white',
  },
  todolist: {
    height: '85%',
  },
});

export default Home;