import React from "react";
import ApplicationNavigator from "./src/navigation/Application";
import { ThemeProvider } from "@/theme";
import { storage } from "@/store";

const App = () => {
  return (
    <ThemeProvider storage={storage}>
      <ApplicationNavigator />
    </ThemeProvider>
  );
};

export default App;
