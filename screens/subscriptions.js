// MODULE IMPORTS
import React from 'react';
//FILE IMPORTS
import Card from "../components/card";

export default Subscriptions = ({ navigation }) => {
    return (
        <>
            <Card
                title="Title"
                date="18 January 2019"
                detailUrl="https://google.com"
                imageUrl="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                navigation={navigation}
                type="subscription"
            />
        </>
    );
}