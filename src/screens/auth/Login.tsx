import React from "react";
import { View, Text, Button } from "react-native";

export default function Login({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login Screen</Text>

      <Button
        title="Go to Register"
        onPress={() => navigation.navigate("Register")}
      />
      <Button
        title="Go to Main App"
        onPress={() => navigation.navigate("Main")}
      />
    </View>
  );
}
