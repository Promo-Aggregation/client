// MODULE IMPORTS
import React from "react";
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Ionicons, Entypo } from "@expo/vector-icons";
// FILE IMPORTS
import {
  HomeStack as Home,
  SubscriptionsStack as Subscriptions,
  NewestStack as Newest
} from "../stack";

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: "Home",
        tabBarIcon: () => <Ionicons name="ios-home" color="#fff" size={24} />,
        tabBarColor: "#19f"
      }
    },
    Newest: {
      screen: Newest,
      navigationOptions: {
        title: "Newest",
        tabBarIcon: () => <Entypo name="new" color="#fff" size={24} />,
        tabBarColor: "#19f"
      }
    },
    Subscriptions: {
      screen: Subscriptions,
      navigationOptions: {
        title: "Subscriptions",
        tabBarIcon: () => (
          <Ionicons name="md-pricetags" color="#fff" size={24} />
        ),
        tabBarColor: "#19f"
      }
    }
  },
  {
    shifting: true
  }
);

export default createAppContainer(TabNavigator);
