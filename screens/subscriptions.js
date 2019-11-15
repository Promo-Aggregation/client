// MODULE IMPORTS
import React, { useState } from 'react';
import { View, Image, Dimensions } from "react-native";
//FILE IMPORTS
import Card from "../components/card";

const { width, height } = Dimensions.get("screen")

export default Subscriptions = ({ navigation }) => {
    const [promos, setPromos] = useState([])
    return (
        <View style={styles.container}>
            {
                promos.length === 0 ?
                    (
                        <Image
                            source={{ uri: "https://preview.redd.it/2zt16ywtz2t11.jpg?width=640&crop=smart&auto=webp&s=8eb1cb38347784db71b1a84a80c155de36f84b06" }}
                            style={{ height: height, width: width }}
                        />
                    ) :
                    <Text>more than 1</Text>
            }
        </View>
    );
}