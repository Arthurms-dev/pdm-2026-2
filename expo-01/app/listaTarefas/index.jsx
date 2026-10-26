import { addTarefa, deleteTarefa, getTarefas, updateTarefa } from "@/api";
import { Tarefa } from "@/components/Tarefa";
import { useTaskFilter } from "@/zustand";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { getCurrentUser } from "@/api/auth";
import {
  Button,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ListaDeTarefas() {
  const router = useRouter();
  const [descricao, setDescricao] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { filtrarConcluidas, toggleFiltrarConcluidas } = useTaskFilter(
    (state) => state,
  );
  
  const queryClient = useQueryClient();
  const { data, isFetching, isLoading, isError, error } = useQuery({
    queryKey: ["tarefas"],
    queryFn: getTarefas,
  });

  useEffect(() => {
    async function checkAuth() {
      const user = await getCurrentUser();
      setIsLoggedIn(!!user);
    }
    checkAuth();
  }, []);

  const addMutation = useMutation({
    mutationFn: addTarefa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
      setDescricao("");
    },
    onError: (error) => {
      alert("Servidor indisponível no momento. Erro: " + error.message);
    },
  });
  
  const updateMutation = useMutation({
    mutationFn: updateTarefa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
    },
    onError: (error) => {
      alert("Servidor indisponível no momento. Erro: " + error.message);
    },
  });
  
  const deleteMutation = useMutation({
    mutationFn: deleteTarefa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
    },
    onError: (error) => {
      alert("Servidor indisponível no momento. Erro: " + error.message);
    },
  });

  function handleAdicionarTarefa() {
    if (!descricao) {
      alert("Digite uma descrição");
      return;
    }
    addMutation.mutate(descricao);
  }
  
  function handleAtualizarTarefa(tarefa) {
    updateMutation.mutate(tarefa);
  }
  
  function handleRemoverTarefa(tarefa) {
    deleteMutation.mutate(tarefa);
  }

  function handleNavigate(id) {
    router.navigate({
      pathname: "/listaTarefas/[id]",
      params: { id: id },
    });
  }

  let tarefas = data;
  if (data && filtrarConcluidas) {
    tarefas = data.filter((tarefa) => !tarefa.concluida);
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {isError && (
        <View>
          <Text style={styles.h2}>Query Error: {error.message}</Text>
          <View style={styles.hr} />
        </View>
      )}
      
      {addMutation.isError && (
        <View>
          <Text style={styles.h2}>Mutation Error: {addMutation.error.message}</Text>
          <View style={styles.hr} />
        </View>
      )}
      
      <Text style={styles.h1}>
        {isLoading && "(carregando...)"} {isFetching && "[buscando...]"}
      </Text>
      <View style={styles.hr} />

      {!isLoggedIn && (
        <Text style={{ color: "orange", marginBottom: 10 }}>
          Modo de visualização. Faça login para adicionar e editar tarefas.
        </Text>
      )}

      {isLoggedIn && (
        <>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <TextInput
              style={{ flex: 1, borderWidth: 1, borderColor: "#ccc", marginRight: 10, padding: 5 }}
              placeholder="Digite a descrição da tarefa"
              value={descricao}
              onChangeText={setDescricao}
            />
            <Button
              onPress={handleAdicionarTarefa}
              disabled={addMutation.isPending}
              title="Adicionar"
            />
          </View>
          <View style={styles.hr} />
        </>
      )}

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Ocultar as tarefas concluídas </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={filtrarConcluidas ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleFiltrarConcluidas}
          value={filtrarConcluidas}
        />
      </View>
      <View style={styles.hr} />

      <FlatList
        data={tarefas}
        renderItem={({ item: tarefa }) => (
          <Tarefa
            key={tarefa.objectId}
            tarefa={tarefa}
            onUpdate={handleAtualizarTarefa}
            onDelete={handleRemoverTarefa}
            onNavigate={handleNavigate}
            disabled={updateMutation.isPending || deleteMutation.isPending}
            isLoggedIn={isLoggedIn} 
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  hr: {
    height: 3,
    backgroundColor: "black",
    marginVertical: 5,
  },
  h1: {
    fontSize: 20,
  },
  h2: {
    fontSize: 16,
  },
});