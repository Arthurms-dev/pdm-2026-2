import { Link, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View, ActivityIndicator, Button } from "react-native";
import { FontAwesome5 } from "@react-native-vector-icons/fontawesome5";
import React, { useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "@/api/auth";
import Parse from "parse/react-native.js";

export default function Index() {
  const [user, setUser] = useState<Parse.User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        router.replace("/login" as any);
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    }
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/login" as any);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.welcomeText}>Bem-vindo, {user?.get("username")}!</Text>

      <Text>Programação para Dispositivos Móveis</Text>
      
      <Link href={"/listaTarefas" as any}>Tarefas</Link>
      
      <Link href={"/listaTarefas" as any} asChild>
        <Pressable style={styles.pressableLink}>
          <FontAwesome5
            name="tasks"
            size={28}
            color="green"
            iconStyle="solid"
          />
          <Text style={styles.link}>Tarefas</Text>
        </Pressable>
      </Link>

      <View style={{ marginTop: 40 }}>
        <Button title="Sair (Logout)" color="red" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pressableLink: {
    flexDirection: "row",
    marginTop: 10,
  },
  link: {
    marginLeft: 10,
    textDecorationLine: "underline",
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
});