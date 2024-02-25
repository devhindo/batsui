import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

function BatsAreAwakeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Don't make any noise until 6am</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height,
    },
    text: {
        color: 'white',
        fontSize: width * 0.05,
    },
});

export default BatsAreAwakeScreen;