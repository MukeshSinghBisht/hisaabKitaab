import React, {Component} from 'react';
import {View, Button, Text} from 'react-native';
import Voice from '@react-native-community/voice';
import {config} from '../../config';
interface State {
  recognizedText: string;
  price: number;
}

class VoiceExtended extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      recognizedText: '',
      price: 0,
    };
    Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
    Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
  }

  onSpeechStartHandler() {
    console.log('Speech started');
  }

  onSpeechEndHandler() {
    console.log('Speech ended');
  }
  async getPrice(textData: any) {
    try {
      const url = `${config.priceUrl}?query=${textData}`;
      console.log('url:', url);
      const response = await fetch(url);
      console.log({response})
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not in JSON format');
      }
      const data = await response.json();
      // Assuming your API response has a 'price' field, update the 'price' state with the fetched value.
      console.log({data: data});
      this.setState({price: data[0].price});
    } catch (error) {
      console.log('error as string', JSON.stringify(error));
      console.error('Error fetching data:', error);
    }
  }
  async onSpeechResultsHandler(event: {value: string[]}) {
    console.log('Speech results:', event.value);
    this.setState({recognizedText: event.value[0]});
    await this.getPrice(this.state.recognizedText);
    this.setState({recognizedText: event.value[0]});
  }

  onStartButtonPress() {
    console.log('button pressed');
    Voice.start('en-US');
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 40,
        }}>
        <Button
          title="Start Recording"
          onPress={this.onStartButtonPress.bind(this)}
        />
        <Text style={{marginTop: 20}}>
          Recognized Text:{' '}
          {this.state.recognizedText
            ? this.state.recognizedText
            : 'No speech input yet'}
        </Text>
        <Text style={{marginTop: 20}}>
          Price: {this.state.price ? this.state.price : 'Ask price'}
        </Text>
      </View>
    );
  }
}

export default VoiceExtended;
