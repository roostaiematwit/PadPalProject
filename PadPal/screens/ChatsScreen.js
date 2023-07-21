import React from "react";
import stylesGlobal from "../styles/styles";
import { View, StyleSheet, FlatList , Text} from "react-native";
//import { ListItem, Avatar } from "react-native-elements";
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  userName,
  PostTime,
  MessageText,
  TextSection,
  UserName
} from '../styles/MessageStyles';

const list = [
  {
    name: "Marco",
    avatar_url: "https://example.com/avatar2.jpg",
    subtitle: "Pedro, stop being such a good programmer!",
  },
  {
    name: "Nick",
    avatar_url: "https://example.com/avatar1.jpg",
    subtitle:
      "Marco told me your a bad programmer and that hes gas lighting you",
  },

  // ... add more chats
];

// BEGIN MARCO ADDING

const Messages = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../assets/users/user-3.jpg'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../assets/users/user-1.jpg'),
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../assets/users/user-4.jpg'),
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../assets/users/user-6.jpg'),
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../assets/users/user-7.jpg'),
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];

//END MARCO ADDING
const ChatsScreen = () => {
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }



 
  return (
    <View style = {styles.container} >
      <Container>
        <FlatList
          data={Messages}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
          <Card>
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={item.userImg} />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.userName}</UserName>
                  <PostTime>{item.messageTime}</PostTime>
                </UserInfoText>
                <MessageText>{item.messageText}</MessageText>
              </TextSection>
            </UserInfo>
          </Card>
            )}
         ></FlatList>
        </Container>
      {/* {list.map((chatList, i) => (
        <ListItem key={i} bottomDivider>
          <Avatar
            rounded
            title={chatList.name[0]}
            containerStyle={{ backgroundColor: getRandomColor() }}
          />
          <ListItem.Content>
            <ListItem.Title>{chatList.name}</ListItem.Title>
            <ListItem.Subtitle style={styles.subtitle}>
              {chatList.subtitle}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))} */}
    </View>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    
  },
  subtitle: {
    color: "gray",
    fontSize: 16,
  },
});
