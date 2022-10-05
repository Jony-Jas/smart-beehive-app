import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

import { LineChart } from "react-native-chart-kit";

const Weight = ({ route }) => {
  const { weight } = route.params;
  const data = {
    labels: Object.keys(weight),
    datasets: [
      {
        data: Object.values(weight),
      },
    ],
    legend: ["weightidity Today"],
  };
  const chartConfig = {
    backgroundGradientFrom: "#0093E9",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#80D0C7",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <TouchableOpacity>
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
            ></View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          fromZero={true}
          xLabelsOffset={-20}
          verticalLabelRotation={90}
          data={data}
          width={350}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={{
            borderRadius: 16,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#FFFFE0",
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
  chartContainer: {
    paddingVertical: 50,
    display: "flex",
    alignItems: "center",
  },
});

export default Weight;
