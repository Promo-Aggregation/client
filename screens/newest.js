// MODULE IMPORTS
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import PercentageCircle from "react-native-percentage-circle";
//FILE IMPORTS
import Card from "../components/card";
import { refresh } from "../store/actions";

export default Newest = ({ navigation }) => {
  const { promos, status, interval } = useSelector(state => state.promoReducer);
  const [progress, setProgress] = useState(1);
  const dispatch = useDispatch();
  const timer = () => {
    const id = setInterval(() => {
      setProgress(prev => {
        if (prev > status) {
          clearInterval(id);
          return prev;
        } else {
          return prev + 1;
        }
      });
    }, interval);
  };
  if (status < 100)
    <View style={styles.container}>
      <PercentageCircle
        radius={75}
        percent={progress}
        color={"#3498db"}
        textStyle={{ fontSize: 15 }}
        borderWidth={5}
      />
    </View>;
  return (
    <FlatList
      data={promos}
      keyExtractor={(_, index) => String(index)}
      renderItem={({ item }) =>
        item.title &&
        item.date &&
        item.detailUrl &&
        item.imageUrl && (
          <Card promo={item} navigation={navigation} type="newest" />
        )
      }
      refreshing={status < 100}
      onRefresh={() => dispatch(refresh())}
      onEndReached={() => dispatch(refresh(promos, promos.length))}
    />
  );
};
