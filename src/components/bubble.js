import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import bubble from "../../assets/media/bubble.png";

const { width, height } = Dimensions.get("screen");

const Bubble = ({ toggleIsVisible }) => {
  const position = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    const animate = () => {
      const x = (Math.random() - 0.5) * 2 * width;
      const y = (Math.random() - 0.5) * 2 * height;

      Animated.timing(position, {
        toValue: { x, y },
        duration: 5000,
        useNativeDriver: false,
      }).start(() => {
        animate();
      });
    };
    animate();
  }, []);

  return (
    <Animated.View
      style={{
        transform: position.getTranslateTransform(),
        position: 'absolute',
        bottom: 0,
      }}
    >
      <TouchableOpacity
        onPress={() => toggleIsVisible()}
        // style={styles.bubbleContainer}
      >
        <Image source={bubble} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Bubble;

const styles = StyleSheet.create({});
