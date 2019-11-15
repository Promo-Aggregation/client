import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { Chip } from "react-native-paper";

export default ChipComponent = ({ title, icon, toggle }) => {
    const [isActive, setActive] = useState(false)
    const handler = () => {
        setActive(!isActive)
        toggle(title)

    }
    return (
        <Chip
            icon={icon}
            style={{
                margin: 5,
                backgroundColor: isActive ?
                    "#7e2" :
                    "#e6e6e6"

            }}
            selected={isActive}
            onPress={handler}
        >{title}
        </Chip>
    )

}
