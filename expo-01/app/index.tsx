import { Text, View } from "react-native";
import Profile from "../components/Profile/Profile";
import MiniBio from "../components/MiniBio/MiniBio";

export default function Index() {
  return (
    <View
        style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <Text>App criado para a disciplina Programação de Dispositivos Móveis</Text>
      <MiniBio/>
    </View>
  );
}
