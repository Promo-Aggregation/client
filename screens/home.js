// MODULE IMPORTS
import React, { useState, useEffect } from 'react';
import { View, Button, FlatList } from 'react-native';
import Axios from "axios";
//FILE IMPORTS
import Card from "../components/card";
import Chip from "../components/chip";

export default Home = ({ navigation }) => {
    const [tags, setTags] = useState([])
    const [promos, setPromos] = useState([])
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
    const fetchAll = async () => {
        const { data: foods } = await Axios.get("http://localhost:3000/promos/dana-food")
        setPromos(foods)
        const { data: games } = await Axios.get("http://localhost:3000/promos/dana-game")
        setPromos([...promos, ...games])
        const { data: entertainment } = await Axios.get("http://localhost:3000/promos/dana-entertainment")
        setPromos([...promos, ...entertainment])
    }
    useEffect(() => {
        fetchAll()
    }, [])
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
                <Chip
                    title="Entertainment"
                    icon={require("../assets/entertainment.png")}
                    toggle={toggle}
                />
                <Chip
                    title="Gaming"
                    icon="gamepad-variant"
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
            <FlatList
                data={promos}
                keyExtractor={(item, index) => String(index)}
                renderItem={({ item: { title, date, kodePromo, detailUrl, imageUrl } }) => (
                    <Card
                        title={title}
                        date={date}
                        code={kodePromo || "No Promo Code"}
                        detailUrl={detailUrl}
                        imageUrl={imageUrl}
                        navigation={navigation}
                        type="home"
                    />
                )}
            />
        </>
    );
}