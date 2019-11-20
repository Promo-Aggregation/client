// MODULE IMPORTS
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dimensions, TouchableOpacity } from "react-native";
import { Button, Card, Paragraph, Chip } from "react-native-paper";
import Axios from "axios";
import { setUser } from "../store/actions";
// FILE IMPORTS
import styles from "../styles";

export default CardComponent = ({ promo, type, navigation, verify }) => {
  const dispatch = useDispatch();
  const { width } = Dimensions.get("window");
  const { token: device_token, subscriptions } = useSelector(
    state => state.userReducer
  );
  const subscribe = async arrOfTags => {
    const { data: user } = await Axios({
      method: "put",
      url: "https://promo-aggregator.crowfx.online/subscriptions/subscribe",
      data: {
        tags: arrOfTags
      },
      headers: {
        device_token
      }
    });
    dispatch(setUser(user));
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
        <Card.Cover
          source={{
            uri: promo.imageUrl.includes("https")
              ? promo.imageUrl
              : `https:${promo.imageUrl}`
          }}
        />
      </TouchableOpacity>
      <Card.Title title={promo.title} subtitle={promo.date} />
      <Card.Content style={{ flexDirection: "row" }}>
        {promo.tags.map((tag, index) => {
          return subscriptions.indexOf(tag) === -1 &&
            type !== "subscriptions" ? (
            <Chip
              key={index}
              style={{
                margin: 5,
                width: 0.2 * width,
                backgroundColor: "#e6e6e6",
                alignItems: "center"
              }}
              selectedColor={"#000"}
              onPress={() => subscribe([tag])}
            >
              {tag}
            </Chip>
          ) : type === "subscriptions" ? (
            <Chip
              key={index}
              style={{
                margin: 5,
                width: 0.2 * width,
                backgroundColor: "#19f",
                alignItems: "center"
              }}
              selectedColor={"#fff"}
              onPress={() => verify(promo.tags)}
            >
              {tag}
            </Chip>
          ) : (
            <Chip
              key={index}
              style={{
                margin: 5,
                width: 0.2 * width,
                backgroundColor: "#19f",
                alignItems: "center"
              }}
              selectedColor={"#fff"}
            >
              {tag}
            </Chip>
          );
        })}
        {promo.cashback && (
          <Paragraph
            style={{
              marginLeft: 10,
              marginTop: 12,
              marginRight: 20,
              fontSize: 16,
              fontWeight: "bold"
            }}
          >
            {`Cashback ${promo.cashback}%`}
          </Paragraph>
        )}
      </Card.Content>
      <Card.Actions style={{ justifyContent: "space-between" }}>
        <Button onPress={verifyPath} color="#19f">
          Read More
        </Button>
      </Card.Actions>
    </Card>
  );
};
