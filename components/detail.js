// MODULE IMPORTS
import React, { useState, useEffect } from "react";
import { Title, Text, Divider, Button, Paragraph } from "react-native-paper";
import { View, Image, Dimensions, ScrollView } from "react-native";
import * as WebBrowser from "expo-web-browser";
//FILE IMPORTS
export default Detail = ({ navigation }) => {
  const [size, setSize] = useState({});
  const promo = navigation.getParam("promo");
  let {
    title,
    imageUrl,
    detailUrl,
    detail: { syaratKetentuan, cara },
    minimalTransaction
  } = promo;
  imageUrl = imageUrl.includes("https") ? imageUrl : `https:${imageUrl}`;
  const minimum = () => {
    const number_string = minimalTransaction.toString();
    const remainder = number_string.length % 3;
    let money = number_string.substr(0, remainder);
    const thousand = number_string.substr(remainder).match(/\d{3}/g);
    if (thousand) {
      const separator = remainder ? "." : "";
      money += separator + thousand.join(".");
    }
    return `Rp. ${money}`;
  };
  const { width } = Dimensions.get("window");
  useEffect(() => {
    Image.getSize(imageUrl, (w, h) => {
      const scale = width / w;
      setSize({
        width: width - 20,
        height: h * scale - 20
      });
    });
  }, []);
  return (
    <View>
      <ScrollView>
        <Title style={{ margin: 30, justifyContent: "center" }}>{title}</Title>
        <Image
          style={{
            margin: 10,
            width: size.width || width,
            height: size.height || 200
          }}
          source={{
            uri: imageUrl
          }}
          resizeMethod="scale"
        />
        {minimalTransaction && (
          <>
            <Text style={{ fontSize: 20, marginLeft: 10 }}>
              Minimum Transaksi:
            </Text>
            <Paragraph style={{ margin: 10, paddingHorizontal: 5 }}>
              {minimum()}
            </Paragraph>
            <Divider style={{ margin: 20 }} />
          </>
        )}
        <Text style={{ fontSize: 20, marginLeft: 10 }}>
          Syarat & Ketentuan:
        </Text>
        <View style={{ margin: 10, paddingHorizontal: 5 }}>
          {syaratKetentuan.map((cond, index) => (
            <Text
              key={index}
              style={{ marginVertical: 5, textAlign: "justify" }}
            >
              {index + 1}. {cond}
            </Text>
          ))}
        </View>
        {cara.length > 0 && (
          <>
            <Divider style={{ margin: 10 }} />
            <Text style={{ fontSize: 20, marginLeft: 10 }}>
              Cara Berpartisipasi:
            </Text>
            <View style={{ margin: 10, paddingHorizontal: 5 }}>
              {cara.map((way, index) => (
                <Text
                  key={index}
                  style={{ marginVertical: 5, textAlign: "justify" }}
                >
                  {way}
                </Text>
              ))}
            </View>
          </>
        )}
        <Button onPress={() => WebBrowser.openBrowserAsync(detailUrl)}>
          Open In Web
        </Button>
      </ScrollView>
    </View>
  );
};
