import { createStackNavigator } from 'react-navigation-stack';

import Home from "../../screens/home"
import Subscriptions from "../../screens/subscriptions"
import Detail from "../../components/detail"

export const HomeStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: "Promo Aggregation"
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
})