import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import CardToDo from "./components/CardToDo/CardToDo";
import Header from "./components/Header/Header";
const ToDo = [
  { id: 1, title: "Sortir le chien", isCompleted: true },
  { id: 2, title: "Aller chez le garagiste", isCompleted: false },
  { id: 3, title: "Faire les courses", isCompleted: true },
  { id: 4, title: "Appeler le vétérinaire", isCompleted: true },
  { id: 5, title: "Appeler le vétérinaire", isCompleted: true },
  { id: 6, title: "Appeler le vétérinaire", isCompleted: true },
  { id: 7, title: "Appeler le vétérinaire", isCompleted: true },
  { id: 8, title: "Appeler le vétérinaire", isCompleted: true },
  { id: 9, title: "Appeler le vétérinaire", isCompleted: true },
];

export default function App() {
  let [todoList, setTodoList] = useState(ToDo);

  function renderTodoList() {
    return todoList.map((todo) => (
      <View style={s.cardItem} key={todo.id}>
        <CardToDo todo={todo}></CardToDo>
      </View>
    ));
  }

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header></Header>
          </View>
          <View style={s.body}>
            <ScrollView>{renderTodoList()}</ScrollView>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <Text>Footer</Text>
      </View>
    </>
  );
}
