// MODULE IMPORTS
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import Chip from "../components/chip"
//FILE IMPORTS

export default Home = ({ navigation }) => {
    const [tags, setTags] = useState([])
    const toggle = (newTag) => {
        if (tags.indexOf(newTag) === -1) {
            setTags([...tags, newTag])
        } else {
            tags.splice(tags.indexOf(newTag), 1)
            setTags(tags)
        }
    }
    const filter = () => {
        console.log(tags)
    }
    return (
        <>
            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    margin: 5,
                    justifyContent: "center"
                }}
            >
                <Chip
                    title="Food"
                    icon="food"
                    toggle={toggle}
                />
                <Chip title="Entertainment"
                    icon={require("../assets/entertainment.png")}
                    toggle={toggle}
                />
                <Chip
                    title="Travel"
                    icon="beach"
                    toggle={toggle}
                />
            </View>
            <View style={{
                justifyContent: "flex-end",
                flexDirection: "row",
                marginRight: 30
            }}>
                <Button
                    title="Filter"
                    color="#e60000"
                    onPress={filter}
                    style={{ position: "relative", marginLeft: 250 }}
                />
            </View>
            <Button
                title="Click"
                onPress={() => navigation.navigate("HomeDetail", { url: "https://dana.id/promo/detail/257/full" })}
                style={[styles.container, { margin: 20 }]}
            />
        </>
    );
}