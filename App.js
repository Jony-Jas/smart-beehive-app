import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./pages/Home";
import Temperature from "./pages/Temperature";
import Humidity from "./pages/Humidity";
import Weight from "./pages/Weight";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Temperature" component={Temperature} />
          <Stack.Screen name="Humidity" component={Humidity} />
          <Stack.Screen name="Weight" component={Weight} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}