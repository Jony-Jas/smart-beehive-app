import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

const firebaseConfig = {
  //#######################
  //                      #
  // Your firebase config #
  //                      #
  //######################
};

let myApp = initializeApp(firebaseConfig);

const Home = ({ navigation }) => {
  const [temp, setTemp] = useState({});
  const [hum, setHum] = useState({});
  const [weight, setWeight] = useState({});

  const triggerNotifications = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Alert 🔔",
        body: "The Temperature limit of the hive has been exceeded.",
        data: { data: "goes here" },
      },
      trigger: { seconds: 1 },
    });
  };

  const weighttriggerNotifications = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Alert 🔔",
        body: "The honey is ready to harvest",
        data: { data: "goes here" },
      },
      trigger: { seconds: 1 },
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log("Home");

      const db = getDatabase(myApp);
      const tempRef = ref(db, "temp/");
      const humRef = ref(db, "hum/");
      const weightRef = ref(db, "weight/");

      const id = setInterval(() => {
        function run() {
          onValue(tempRef, (snapshot) => {
            const data = snapshot.val();
            setTemp(data);
            if (Object.values(data).pop() >= 46) triggerNotifications();      //Temperature Threshold
            console.log("Temperature: ", data);
          });
          onValue(humRef, (snapshot) => {
            const data = snapshot.val();
            setHum(data);
            console.log("Humidity: ", data);
          });
          onValue(weightRef, (snapshot) => {
            const data = snapshot.val();
            setWeight(data);
            if(Object.values(data).pop() >= 100) weighttriggerNotifications();    //Weight Threshold
            console.log("Weight: ", data);
          });
        }
        run();
      }, 5000);

      return () => {
        clearInterval(id);
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Temperature", { temp: temp })}
        >
          <View>
            <Text style={styles.title}>Temperature</Text>
            <View style={styles.innerContainer}>
              <Image
                source={require("../assets/temp.png")}
                style={styles.image}
              />
              <View style={styles.innerLeftContainer}>
                <Text style={styles.value}>{Object.values(temp).pop()} °C</Text>
                <Text style={styles.content}>Showing current temperature</Text>
                <Text style={styles.subContent}>
                  Last updated time : {Object.keys(temp).pop()} IST
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <View style={styles.button}>
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  View Details
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.subContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Humidity", { hum: hum })}
        >
          <View>
            <Text style={styles.title}>Humidity</Text>
            <View style={styles.innerContainer}>
              <Image
                source={require("../assets/hum.png")}
                style={styles.image}
              />
              <View style={styles.innerLeftContainer}>
                <Text style={styles.value}>
                  {Object.values(hum).pop()} g/m³
                </Text>
                <Text style={styles.content}>Showing current Humidity</Text>
                <Text style={styles.subContent}>
                  Last updated time : {Object.keys(hum).pop()} IST
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <View style={styles.button}>
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  View Details
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.subContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Weight", { weight: weight })}
        >
          <View>
            <Text style={styles.title}>Weight</Text>
            <View style={styles.innerContainer}>
              <Image
                source={require("../assets/weight.png")}
                style={styles.image}
              />
              <View style={styles.innerLeftContainer}>
                <Text style={styles.value}>
                  {Object.values(weight).pop()} g
                </Text>
                <Text style={styles.content}>Showing current weight</Text>
                <Text style={styles.content}>of the beehive</Text>
                <Text style={styles.subContent}>
                  Last updated time : {Object.keys(weight).pop()} IST
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <View style={styles.button}>
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  View Details
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  subContainer: {
    paddingVertical: 20,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  innerLeftContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  image: {
    width: 80,
    height: 80,
  },
  subContent: {
    fontStyle: "italic",
    fontSize: 12,
  },
  button: {
    width: "60%",
    height: 35,
    backgroundColor: "#cebd66",
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
