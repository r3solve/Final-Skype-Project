import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FAB, Portal, Modal, Provider } from 'react-native-paper';

const HomeScreen = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.textStyle}>Home Screen</Text>

        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
            <Text>This is a modal!</Text>
          </Modal>
        </Portal>

        <FAB
          icon="message"
          style={styles.fab}
          onPress={showModal}
        />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
  },
});

export default HomeScreen;
