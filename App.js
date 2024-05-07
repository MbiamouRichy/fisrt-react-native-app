import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import Dialog from "react-native-dialog";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import uuid from "react-native-uuid";
import { s } from "./App.style";
import CardToDo from "./components/CardToDo/CardToDo";
import Header from "./components/Header/Header";
import TabBottomMenu from "./components/TabBottomMenu";
import ButtonAdd from "./components/buttonAdd/ButtonAdd";

let isFirstRender = true;
let isLoadUpdate = false;
export default function App() {
  const [selectedTabName, setSelectedTabName] = useState("all");
  let [todoList, setTodoList] = useState([]);
  let [isAddDialogVisible, setIsAddDialogVisible] = useState(false);
  let [inputValue, setInputValue] = useState("");

  useEffect(() => {
    LoadTodoList();
  }, []);

  useEffect(() => {
    if (isLoadUpdate) {
      isLoadUpdate = false;
    } else {
      if (isFirstRender) {
        saveTodoList();
      } else {
        isFirstRender = false;
      }
    }
  }, [todoList]);

  async function saveTodoList() {
    try {
      await AsyncStorage.setItem("@todolist", JSON.stringify(todoList));
    } catch (err) {
      alert("Erreur " + err);
    }
  }
  async function LoadTodoList() {
    try {
      const stringifiedTodoList = await AsyncStorage.getItem("@todolist");
      if (stringifiedTodoList !== null) {
        const parsedTodoList = JSON.parse(stringifiedTodoList);
        isLoadUpdate = true;
        setTodoList(parsedTodoList);
      }
    } catch (err) {
      alert("Erreur " + err);
    }
  }
  function deleteTodo(todoToDelete) {
    Alert.alert("suppression", "Supprimer cette tache ?", [
      {
        text: "supprimer",
        style: "destructive",
        onPress: () => {
          setTodoList(todoList.filter((todo) => todo.id !== todoToDelete.id));
        },
      },
      {
        text: "Annuler",
        style: "cancel",
      },
    ]);
  }
  const getFilteredList = () => {
    switch (selectedTabName) {
      case "all":
        return todoList;
      case "inProgress":
        return todoList.filter((todo) => !todo.isCompleted);
      case "done":
        return todoList.filter((todo) => todo.isCompleted);
      default:
        return [];
    }
  };

  function updateTodo(todo) {
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };

    const indexToUpdate = todoList.findIndex(
      (todo) => todo.id === updatedTodo.id
    );

    const updatedTodoList = [...todoList];
    updatedTodoList[indexToUpdate] = updatedTodo;
    setTodoList(updatedTodoList);
  }
  function showAddDialog() {
    setIsAddDialogVisible(true);
  }
  function addTodo() {
    const id = uuid.v4();
    const newTodo = {
      id: id,
      title: inputValue,
      isCompleted: false,
    };

    setTodoList([...todoList, newTodo]);
    setIsAddDialogVisible(false);
  }
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header></Header>
          </View>
          <View style={s.body}>
            <ScrollView>
              {getFilteredList().map((todo) => (
                <View style={s.cardItem} key={todo.id}>
                  <CardToDo
                    onLongPress={deleteTodo}
                    onPress={updateTodo}
                    todo={todo}
                  ></CardToDo>
                </View>
              ))}
            </ScrollView>
          </View>
          <ButtonAdd onPress={showAddDialog} />
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <TabBottomMenu
          todoList={[...todoList]}
          onPress={setSelectedTabName}
          selectedTabName={selectedTabName}
        />
      </View>
      <Dialog.Container
        visible={isAddDialogVisible}
        onBackdropPress={() => setIsAddDialogVisible(false)}
      >
        <Dialog.Title>Créer une tache</Dialog.Title>
        <Dialog.Description>
          Choisir un nom pour la nouvelle tache
        </Dialog.Description>
        <Dialog.Input onChangeText={setInputValue}></Dialog.Input>
        <Dialog.Button
          disabled={inputValue.trim().length === 0}
          label="Créer"
          onPress={addTodo}
        />
      </Dialog.Container>
    </>
  );
}
