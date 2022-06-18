/**
 * Sample React Native App
 * https://github.com/facebook/react-native

 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Geolocation from 'react-native-geolocation-service';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  PermissionsAndroid,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Alert,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useEffect, useState} from 'react';

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  const requestLocationAccess = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Emerygency App',
        message: 'Example App access to your location ',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      setHasLocationPermission(true);
    } else {
      setHasLocationPermission(false);
    }
  };

  const onPress = () => {
    if (!hasLocationPermission) {
      Alert.alert("You don't have location permission enabled");
    }
    Geolocation.getCurrentPosition((success, err) => {
      if (success) {
        console.log('current location is', success);
      }
      if (err) {
        console.warn('Error occured', err);
      }
    });
  };
  useEffect(() => {
    requestLocationAccess();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Hello <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
            <Button
              title="Emergency Button"
              color="#f194ff"
              onPress={onPress}
            />
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to ReloadInstructions what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
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
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
