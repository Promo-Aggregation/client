// MODULE IMPORTS
import React, { useState, useEffect } from "react";
import { View, Button, FlatList, TextInput, Text } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import PercentageCircle from "react-native-percentage-circle";
import { useDispatch } from "react-redux";
import Axios from "axios";
import queryString from "query-string";
//FILE IMPORTS
import { refresh, login } from "../store/actions";
import Card from "../components/card";
import Chip from "../components/chip";
import categories from "../categories";
import styles from "../styles";

export default Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);
  const [text, setText] = useState("");
  const [tags, setTags] = useState([]);
  const [promos, setPromos] = useState([]);
  const [progress, setProgress] = useState(1);
  const getToken = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      return;
    }
    const value = await Notifications.getExpoPushTokenAsync();
    dispatch(login(value));
  };
  const timerHandler = (limit, interval) => {
    const id = setInterval(() => {
      setProgress(prev => {
        if (prev > limit) {
          clearInterval(id);
          return prev;
        } else {
          return prev + 1;
        }
      });
    }, interval);
  };
  const fetchAll = async () => {
    timerHandler(80, 15);
    setStatus(true);
    const { data } = await Axios.get(
      "https://promo-aggregator.crowfx.online/promos"
    );
    setStatus(false);
    setPromos(data);
    timerHandler(100, 1);
  };
  const search = async () => {
    try {
      const { data } = await Axios({
        method: "get",
        url: `https://promo-aggregator.crowfx.online/promos/search?q=${text}`
      });
      setPromos(data);
    } catch (e) {
      console.log(e);
    }
  };
  const remove = removed => {
    setTags(prev => prev.filter(tag => tag !== removed));
  };
  const add = added => {
    setTags(prev => [...prev, added]);
  };
  const refetch = async () => {
    const { data } = await Axios({
      method: "get",
      url: `https://promo-aggregator.crowfx.online/promos?offset=${promos.length}`
    });
    setPromos([...promos, ...data]);
  };
  useEffect(() => {
    fetchAll();
    dispatch(refresh());
    getToken();
  }, []);
  useEffect(() => {
    let url = "https://promo-aggregator.crowfx.online/promos/tags";
    const qs = queryString.stringify({ tags });
    if (tags.length > 0) {
      Axios({
        method: "get",
        url: `${url}?${qs}`
      })
        .then(({ data: promos }) => {
          setPromos(promos);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [tags]);
  if (progress < 100) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
        <PercentageCircle
          radius={75}
          percent={progress}
          color="#19f"
          textStyle={{ fontSize: 15, color: "#19f" }}
          borderWidth={5}
        />
      </View>
    );
  }
  return (
    <>
      <View style={styles.view}>
        <TextInput
          placeholder="Search..."
          style={styles.input}
          value={text}
          onChangeText={setText}
          onSubmitEditing={search}
        />
        <View style={styles.search}>
          <Button
            title="Search"
            color="#19f"
            onPress={search}
            style={{ position: "relative", marginLeft: 250 }}
          />
        </View>
      </View>
      <View style={styles.bulkChip}>
        {categories.map((category, index) => (
          <Chip
            title={category.name}
            icon={category.icon}
            key={index}
            remove={remove}
            add={add}
          />
        ))}
      </View>
      <FlatList
        data={promos}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item }) =>
          item.title &&
          item.date &&
          item.detailUrl &&
          item.imageUrl && (
            <Card promo={item} navigation={navigation} type="home" />
          )
        }
        onEndReached={refetch}
        refreshing={status}
        onRefresh={fetchAll}
      />
    </>
  );
};
