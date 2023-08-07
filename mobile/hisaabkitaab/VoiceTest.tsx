import React, {Component} from 'react';
import {View, Button, Text} from 'react-native';
import Voice from '@react-native-community/voice';

interface State {
  recognizedText: string;
  price: number;
}

class VoiceTest extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      recognizedText: '',
      price: 0
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
  async getPrice (textData) {
    try {
      const response = await fetch('https://0e4a-2401-4900-1f3a-3235-5-a210-9106-3bc9.ngrok-free.app/price/getPrice?query=' + textData);
    //   const response = await fetch('https://0e4a-2401-4900-1f3a-3235-5-a210-9106-3bc9.ngrok-free.app/price/getPrice');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not in JSON format');
      }
      const data = await response.json();
      // Assuming your API response has a 'price' field, update the 'price' state with the fetched value.
     console.log({data: data})
    this.setState({price: data.price});

    } catch (error) {
      console.log('error as string',JSON.stringify(error))
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
    console.log('button pressed')
    Voice.start('en-US');
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
          Price:{' '}
          {this.state.price
            ? this.state.price
            : 'Ask price'}
        </Text>
      </View>
    );
  }
}

export default VoiceTest;
