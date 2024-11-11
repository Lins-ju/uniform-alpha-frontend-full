import React, { useEffect, useRef } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';

const BlinkingText = ({ text, isLoading }) => {
    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const blink = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0, // Fade out
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1, // Fade in
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        );
        blink.start();

        return () => blink.stop();
    }, [opacity]);

    return (
        <View>
            {isLoading ? <Animated.Text style={[styles.text, { opacity }]}> {text} </Animated.Text> : null }
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 18
    },
});

export default BlinkingText;