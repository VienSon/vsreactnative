import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from './core/Colors';
import { Section } from './ui/index';
import {
  RootState, LOCAL_DB, fetchData,
  setData, useAppDispatch, useAppSelector
} from './core';
import { MMKV } from 'react-native-mmkv';
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const mmkv = new MMKV();
  // console.log(mmkv.getString('data'));
  const dispatch = useAppDispatch();
  useEffect(() => {
    let data = mmkv.getString(LOCAL_DB.DATA)
    if (data) {
      console.log('Reload from local');
      dispatch(setData(data));
    } else {
      console.log('Load from server');
      dispatch(fetchData("http://localhost:8000/homedb_v2.json"));
    }

    return () => {
    }
  }, [dispatch])

  const demoHomeData = useAppSelector((state: RootState) => state.app_data.data);
  const error = useAppSelector((state: RootState) => state.app_data.error);
  // console.log(error);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/* <Header /> */}
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Data">
            Data fetching from server
            <Text style={styles.highlight}> LocalHost</Text>
            {JSON.stringify(demoHomeData)}
          </Section>
          {!error ?
            <></> : <Section title="Error">
              Server data invalid:
              <Text style={styles.highlight}> {JSON.stringify(error)}</Text>
            </Section>
          }

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
});

export default App;
