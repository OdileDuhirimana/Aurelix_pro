import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

type DotSpinnerProps = {
  size?: number;
  dotSize?: number;
  color?: string;
};

const DOT_COUNT = 8;
const DURATION = 1000;

const DotSpinner: React.FC<DotSpinnerProps> = ({ size = 50, dotSize = 10, color = '#00B074' }) => {
  const radius = size / 2;
  const animatedValues = useRef(
    Array.from({ length: DOT_COUNT }, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const animations = animatedValues.map((value, index) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue: 1,
            duration: DURATION,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: DURATION,
            useNativeDriver: true,
          }),
        ])
      );
    });

    animations.forEach((anim, index) => {
      setTimeout(() => anim.start(), (DURATION / DOT_COUNT) * index);
    });
  }, []);

  return (
    <View style={[styles.spinner, { width: size, height: size }]}>
      {animatedValues.map((value, index) => {
        const angle = (index * 2 * Math.PI) / DOT_COUNT;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        // Varying size effect
        const varyingSize = dotSize * (1 + 0.5 * Math.sin(angle));

        const opacity = value.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.3, 1, 0.3],
        });

        const scale = value.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.9, 2, 1], // Adjust scale to make dots appear different in size
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                width: varyingSize,
                height: varyingSize,
                borderRadius: varyingSize / 2,
                backgroundColor: color,
                opacity,
                transform: [
                  { translateX: x },
                  { translateY: y },
                  { scale },
                ],
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dot: {
    position: 'absolute',
  },
});

export default DotSpinner;
