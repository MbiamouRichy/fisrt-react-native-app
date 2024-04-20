import { Image, Text } from "react-native";
import logo from "../../assets/logo.png";
import { s } from "./Hearder.style";
const ToDo = [
  { id: 1, title: "Sortir le chien", isCompleted: true },
  { id: 2, title: "Aller chez le garagiste", isCompleted: false },
  { id: 3, title: "Faire les courses", isCompleted: true },
  { id: 4, title: "Appeler le vétérinaire", isCompleted: true },
];
export default function Header() {
  return (
    <>
      <Image style={s.img} source={logo} resizeMode="contain" />
      <Text style={s.subtitle}>Tu as probablement un truc a faire</Text>
    </>
  );
}
