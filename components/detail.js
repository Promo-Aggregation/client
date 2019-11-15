// MODULE IMPORTS
import React from 'react';
import { WebView } from 'react-native';
//FILE IMPORTS
import styles from "../styles"

export default Detail = ({ navigation }) => {
    const url = navigation.getParam("url")
    return (
        <WebView
            source={{ uri: url }}
            style={styles.detail}
        />
    );
}



