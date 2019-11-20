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
        backgroundColor: isActive ? "#19f" : "#e6e6e6"
      }}
      selectedColor={isActive ? "#fff" : "#000"}
      selected={isActive}
      onPress={toggle}
    >
      {title}
    </Chip>
  );
};
