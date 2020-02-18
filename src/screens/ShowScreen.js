import React, { useContext } from "react";
import { Context } from "../context/BlogContext";
import { View, Text, StyleSheet, Image } from "react-native";

const ShowScreen = ({ navigation }) => {
  console.log(navigation.getParam("id"));
  const { state } = useContext(Context);
  const blogPost = state.find(
    blogPost => blogPost.id === navigation.getParam("id")
  );
  return (
    <View>
      <Text>{blogPost.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ShowScreen;
