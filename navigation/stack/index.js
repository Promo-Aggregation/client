// MODULE IMPORTS
import React from "react";
import { Image } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
// FILE IMPORTS
import Home from "../../screens/home";
import Subscriptions from "../../screens/subscriptions";
import Newest from "../../screens/newest";
import Detail from "../../components/detail";

export const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: () => (
        <Image
          source={require("../../assets/mole.png")}
          style={{ height: 30, width: 150 }}
        />
      )
    }
  },
  HomeDetail: {
    screen: Detail,
    navigationOptions: {
      title: "Detail"
    }
  }
});

export const SubscriptionsStack = createStackNavigator({
  Subscriptions: {
    screen: Subscriptions,
    navigationOptions: {
      title: "My Subscriptions"
    }
  },
  SubscriptionsDetail: {
    screen: Detail,
    navigationOptions: {
      title: "Detail"
    }
  }
});

export const NewestStack = createStackNavigator({
  Newest: {
    screen: Newest,
    navigationOptions: {
      title: "Newest Promos"
    }
  },
  NewestDetail: {
    screen: Detail,
    navigationOptions: {
      title: "Detail"
    }
  }
});
