import { Pressable, Switch, Text, View } from "react-native";
import { FontAwesome5 } from "@react-native-vector-icons/fontawesome5";

export function Tarefa({ tarefa, onUpdate, onDelete, onNavigate, disabled, isLoggedIn }) {
  function handleConcluidaChange() {
    onUpdate({ ...tarefa, concluida: !tarefa.concluida });
  }

  return (
    <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 5 }}>
      <Pressable onPress={() => onNavigate(tarefa.objectId)} style={{ flex: 1 }}>
        <Text style={{ textDecorationLine: tarefa.concluida ? 'line-through' : 'none' }}>
          {tarefa.descricao}{" "}
        </Text>
      </Pressable>
      
      {isLoggedIn && (
        <>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={tarefa.concluida ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleConcluidaChange}
            value={tarefa.concluida}
            disabled={disabled}
          />
          <Pressable 
            onPress={() => onDelete(tarefa)} 
            disabled={disabled} 
            style={{ marginLeft: 10 }}
          >
            <FontAwesome5 name="trash-alt" size={24} color="red" />
          </Pressable>
        </>
      )}
    </View>
  );
}