import React, { useState } from "react";
import { Chip } from "react-native-paper";

export default ChipComponent = ({ title, icon, remove, add }) => {
  const [isActive, setActive] = useState(false);
  const toggle = () => {
    const formatted = title.toLowerCase();
    setActive(!isActive);
    isActive ? remove(formatted) : add(formatted);
  };
  return (
    <Chip
      icon={isActive ? "check" : icon}
      style={{
        margin: 5,
        backgroundColor: isActive ? "#b3b3b3" : "#e6e6e6"
      }}
      selected={isActive}
      onPress={toggle}
    >
      {title}
    </Chip>
  );
};
