import React, { type ReactNode } from 'react';
import {
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {Colors} from '../core';
export const Section = (props: { title: string; children?: ReactNode }) => {
    const { children, title } = props;
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.sectionContainer}>
            <Text
                style={[styles.sectionTitle, { color: isDarkMode ? 'white' : 'black', },]}>
                {title}
            </Text>
            <Text
                style={[styles.sectionDescription, { color: isDarkMode ? Colors.light : Colors.dark, },]}>
                {children}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    }
});