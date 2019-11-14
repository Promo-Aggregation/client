// MODULE IMPORTS
import React from "react";
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// FILE IMPORTS
import Home from "../../screens/home";
import Favorites from "../../screens/favorites";


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
    Favorites: {
        screen: Favorites,
        navigationOptions: {
            title: "Favorites",
            tabBarIcon: ({ focused }) => (
                <MaterialIcons
                    name="favorite"
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