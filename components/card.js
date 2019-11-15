// MODULE IMPORTS
import React from 'react';
import { Button, Card, Paragraph } from 'react-native-paper';
// FILE IMPORTS
import styles from "../styles"

export default CardComponent = ({
    title,
    date,
    detailUrl,
    imageUrl,
    navigation,
    code,
    type
}) => (
        <Card
            style={styles.card}
            elevation={5}
        >
            <Card.Cover source={{ uri: imageUrl }} />
            <Card.Title title={title} subtitle={date} />
            <Card.Content>
                <Paragraph>{code}</Paragraph>
            </Card.Content>
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