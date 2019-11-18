// MODULE IMPORTS
import React, { useEffect, useState } from "react";
import { FlatList, Image, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Provider, Portal, Dialog, Title, Button } from "react-native-paper";
import Multi from "react-native-multiple-select-list";
import Axios from "axios";
//FILE IMPORTS
import { subscribed, extendedSubscribed } from "../store/actions";
import Card from "../components/card";

export default Subscriptions = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [tags, setTags] = useState([]);
  const [filteredTags, setFiltered] = useState([]);
  const dispatch = useDispatch();
  const { token, subscriptions } = useSelector(state => state.userReducer);
  const { status } = useSelector(state => state.promoReducer);
  const verify = tags => {
    setTags(tags);
    setVisible(true);
  };
  const unsubscribe = async () => {
    if (filteredTags.length === 0) {
      alert("Please Select A Category");
    } else {
      await Axios({
        method: "put",
        url: "https://promo-aggregator.crowfx.online/subscriptions/unsubscribe",
        data: {
          tags: filteredTags
        },
        headers: {
          device_token: token
        }
      });
      dispatch(subscribed(token));
      alert("Unsubscribed!");
      setVisible(false);
    }
  };
  useEffect(() => {
    dispatch(subscribed(token));
  }, []);
  return subscriptions.length === 0 ? (
    <Image source={require("../assets/empty.png")} style={styles.empty} />
  ) : (
    <Provider>
      <Portal>
        <FlatList
          data={subscriptions}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item }) =>
            item.title &&
            item.date &&
            item.detailUrl &&
            item.imageUrl && (
              <Card
                promo={item}
                navigation={navigation}
                type="subscriptions"
                verify={verify}
              />
            )
          }
          onEndReached={() =>
            dispatch(
              extendedSubscribed(token, subscriptions.length, subscriptions)
            )
          }
          refreshing={status < 100}
          onRefresh={() => dispatch(subscribed(token))}
        />
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Title style={{ textAlign: "center", padding: 15 }}>Category:</Title>
          <View style={{ margin: 10 }}>
            <Multi
              options={tags}
              multiple={true} //
              callback={selected => {
                if (selected) {
                  let result = [];
                  selected.forEach(index => {
                    result.push(tags[index]);
                  });
                  setFiltered(result);
                }
              }}
              style={{ margin: 10 }}
              rowBackgroundColor={"#e6e6e6"}
              rowHeight={50}
              rowRadius={50}
              iconColor={"#00a2dd"}
              iconSize={30}
              selectedIconName={"ios-checkmark-circle-outline"}
              unselectedIconName={"ios-radio-button-off"}
              selected={["0", "1"]}
            />
          </View>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button onPress={unsubscribe}>Unsubscribe</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};
