import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import bubble from "../../assets/media/bubble.png";

const { width, height } = Dimensions.get("screen");

const Bubble = () => {
  const position = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    const animate = () => {
      const x = Math.random() * width ;
      const y = Math.random() * height;

      Animated.timing(position, {
        toValue: { x, y },
        duration: 10000,
        useNativeDriver: false,
      }).start(() => {
        animate();
      });
    };
    animate();
  }, []);

  return (
    <TouchableOpacity>
      <Animated.Image source={bubble} style={position.getLayout()} />
    </TouchableOpacity>
  );
};

export default Bubble;

const styles = StyleSheet.create({});
