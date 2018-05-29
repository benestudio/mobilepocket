/**
 * palette: https://coolors.co/1d2d44-0b5a84-2274a5-86bbd8-f4fafe
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import ItemList from './Components/ItemList';
import AddItem from './Components/AddItem';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      indicator: false,
    };
  }
  /**
   * persist items only
   */
  static async persistState(state) {
    AsyncStorage.setItem('@MobilePocket:items', JSON.stringify(state.items));
  }
  /**
   * update state with persisted items
   */
  static async loadState(state) {
    const itemsString = await AsyncStorage.getItem('@MobilePocket:items');
    console.log('itemsString', itemsString);
    if (itemsString === null) {
      console.log('there are no persisted items yet');
      return {...state};
    }
    return {
      ...state,
      items: JSON.parse(itemsString)
    };
  }
  async componentDidMount() {
    try {
      const loadedState = await App.loadState(this.state);
      this.setState(loadedState);
    } catch(e) {
      Alert.alert(e.toString());
    }
  }
  addItem = uri => {
    const { items } = this.state;
    const newItems = [{ id: items.length.toString(), uri }, ...items];
    this.setState({
      items: newItems,
    }, () => {
      App.persistState(this.state);
    });
  }
  removeItem = ({ id }) => {
    const { items } = this.state;
    const newItems = items.filter(item => item.id != id);
    this.setState({
      items: newItems,
    }, () => {
      App.persistState(this.state);
    });
  }
  showIndicator = () => {
    this.setState({ indicator: true });
  }
  hideIndicator = () => {
    this.setState({ indicator: false });
  }
  handleAddItemPress = () => {
    const options = {
      title: 'Select or Take Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    this.showIndicator();
    ImagePicker.showImagePicker(options, (response) => {
      console.log('image picker response = ', response);
      if (response.error) {
        this.hideIndicator();
        return Alert.alert(response.error);
      }
      if (response.didCancel) {
        this.hideIndicator();
        return console.log('user cancelled');
      }
      this.hideIndicator();
      this.addItem(response.uri);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mobile Pocket</Text>
        <Text style={styles.description}>Scan your belongings</Text>
        <Text style={styles.description}>to have all the important stuff with you</Text>
        <AddItem onPress={this.handleAddItemPress} />
        {
          this.state.indicator
           ? <ActivityIndicator size="large" style={styles.indicator} />
           : <ItemList
              items={this.state.items}
              onRemove={item => this.removeItem(item)}
            />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F4FAFE',
    paddingTop: 30,
  },
  indicator: {
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1D2D44',
    margin: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
    marginTop: 0,
    color: '#1D2D44',
  },
});
