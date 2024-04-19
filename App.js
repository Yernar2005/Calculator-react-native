import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import Calculator from "./components/Calculator";

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <Calculator />
    </SafeAreaView>
  );
};

export default App;
