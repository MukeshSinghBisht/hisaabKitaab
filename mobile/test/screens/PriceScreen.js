import React from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const PriceScreen = () => {
  const handleGetPrice = async () => {
    try {
      const response = await axios.get('http://localhost:8000/price/getPrice/gaay%20dudh/');
      // Handle the response data
      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Price Screen</Text>
      {/* Add your "Get Price" button here */}
      <Button title="Get Price" onPress={() => handleGetPrice()} />
    </View>
  );
};

export default PriceScreen;