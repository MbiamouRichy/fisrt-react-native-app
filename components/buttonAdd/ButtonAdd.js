import { Text, TouchableOpacity } from "react-native";
import { s } from "./ButtonAdd.style";
export default function ButtonAdd({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={s.btn}>
      <Text style={s.txt}>+ New todo</Text>
    </TouchableOpacity>
  );
}
