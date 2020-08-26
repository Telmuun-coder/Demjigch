import React from 'react';
import {StyleSheet, Text, View, StatusBar, SafeAreaView} from 'react-native';

const Members = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#E51F1D"
        // barStyle="light-content"
        // hidden={true}
      />
      <Text>Members</Text>
    </SafeAreaView>
  );
};

export default Members;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
  },
});
