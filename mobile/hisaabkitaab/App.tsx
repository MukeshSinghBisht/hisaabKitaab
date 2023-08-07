import VoiceTxt from './VoiceTest';

import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import VoiceTest from './VoiceTest';
const App = () => {
  const [price, setPrice] = useState<number | null>(null);

  return (
    
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     <Text>My App</Text>
     <VoiceTest/>
   </View>
  );
};

export default App;