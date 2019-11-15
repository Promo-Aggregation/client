import React from 'react';
import { Button, Card } from 'react-native-paper';

import styles from "../styles"

export default CardComponent = ({
    title,
    date,
    detailUrl,
    imageUrl,
    navigation,
    type
}) => (
        <Card
            style={styles.card}
            elevation={5}
        >
            <Card.Title title={title} subtitle={date} />
            <Card.Cover source={{ uri: imageUrl }} />
            <Card.Actions>
                <Button
                    onPress={() => navigation.navigate(
                        type === "subscription" ?
                            "SubscriptionsDetail" :
                            "HomeDetail", { url: detailUrl })}
                >Read More</Button>
            </Card.Actions>
        </Card>
    );