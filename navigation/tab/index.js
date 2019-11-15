// MODULE IMPORTS
import React from "react";
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
// FILE IMPORTS
import { HomeStack as Home, SubscriptionsStack as Subscriptions } from "../stack";


const TabNavigator = createMaterialBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: "Home",
            tabBarIcon: ({ focused }) => (
                <Ionicons
                    name="ios-home"
                    color={focused ? "red" : "black"}
                    size={24}
                />
            )
        }
    },
    Subscriptions: {
        screen: Subscriptions,
        navigationOptions: {
            title: "Subscriptions",
            tabBarIcon: ({ focused }) => (
                <Ionicons
                    name="md-pricetags"
                    color={focused ? "red" : "black"}
                    size={24}
                />
            ),
        }
    }
},
    {
        shifting: true,
        activeColor: "#000",
        inactiveColor: "#888",
        barStyle: { backgroundColor: "#fff" },
    });

export default createAppContainer(TabNavigator);