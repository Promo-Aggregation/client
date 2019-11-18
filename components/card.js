// MODULE IMPORTS
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dimensions, TouchableOpacity } from "react-native";
import { Button, Card, Paragraph, Chip } from "react-native-paper";
import Axios from "axios";
import { subscribed } from "../store/actions";
// FILE IMPORTS
import colors from "../colors";
import styles from "../styles";

export default CardComponent = ({ promo, type, navigation, verify }) => {
  const dispatch = useDispatch();
  const { width } = Dimensions.get("window");
  const device_token = useSelector(state => state.userReducer.token);
  const subscribe = async () => {
    await Axios({
      method: "put",
      url: "https://promo-aggregator.crowfx.online/subscriptions/subscribe",
      data: {
        tags: promo.tags
      },
      headers: {
        device_token
      }
    });
    dispatch(subscribed(device_token));
    alert("Subscribed!");
  };
  const verifyPath = () => {
    if (type === "home") navigation.navigate("HomeDetail", { promo });
    else if (type === "newest") navigation.navigate("NewestDetail", { promo });
    else navigation.navigate("SubscriptionsDetail", { promo });
  };
  return (
    <Card style={styles.card} elevation={5}>
      <TouchableOpacity onPress={verifyPath}>
        <Card.Cover source={{ uri: promo.imageUrl }} />
      </TouchableOpacity>
      <Card.Title title={promo.title} subtitle={promo.date} />
      <Card.Content style={{ flexDirection: "row" }}>
        <Paragraph style={{ marginTop: 12, marginRight: 20 }}>
          {promo.kodePromo || "No Promo Code"}
        </Paragraph>
        {promo.tags.map((tag, index) => (
          <Chip
            key={index}
            style={{
              margin: 5,
              width: 0.2 * width,
              backgroundColor: colors[index],
              alignItems: "center"
            }}
            selectedColor="#fff"
          >
            {tag}
          </Chip>
        ))}
      </Card.Content>
      <Card.Actions style={{ justifyContent: "space-between" }}>
        <Button onPress={verifyPath} color="#19f">
          Read More
        </Button>
        {type !== "subscriptions" ? (
          <Button onPress={subscribe}>Subscribe</Button>
        ) : (
          <Button onPress={() => verify(promo.tags)}>Unsubscribe</Button>
        )}
      </Card.Actions>
    </Card>
  );
};
