import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import chechImg from "../../assets/check.png";
import { s } from "./CardToDo.style.js";

export default function CardToDo({ onLongPress, todo, onPress }) {
  return (
    <TouchableOpacity
      onLongPress={() => onLongPress(todo)}
      onPress={() => onPress(todo)}
      style={s.card}
    >
      <Text
        style={[
          s.title,
          todo.isCompleted && { textDecorationLine: "line-through" },
        ]}
      >
        {todo.title}
      </Text>
      {todo.isCompleted && <Image style={s.img} source={chechImg}></Image>}
    </TouchableOpacity>
  );
}
