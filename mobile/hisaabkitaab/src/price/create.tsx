import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
// import ImagePicker, {ImagePickerResponse} from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';

interface ImageLocal {
  data: string;
}

interface Item {
  name: string;
  price: string;
  unit: string;
  image_url: string;
  created_at: string;
}

export const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    marginTop: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 16,
  },
  successMessage: {
    color: 'green',
    marginTop: 8,
  },
  errorMessage: {
    color: 'red',
    marginTop: 8,
  },
});

const CreateItemForm: React.FC = () => {
  const [item, setItem] = useState<Item>({
    name: '',
    price: '',
    unit: '',
    image_url: '',
    created_at: new Date().toISOString(),
  });

  const [image, setImage] = useState<ImageLocal | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleImagePicker = (response: ImagePicker.ImagePickerResponse) => {
    if (response.didCancel || response.errorMessage) {
      return;
    }

    const imageData: ImageLocal = {
      data: response?.assets?.[0].uri ?? '',
    };

    setImage(imageData);
  };
  const navigation = useNavigation();
  const handleSubmit = () => {
    const apiUrl =
      'https://371ea2ur16.execute-api.ap-south-1.amazonaws.com/dev/item';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...item,
        image_url: image?.data ?? '',
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setSuccessMessage('Record successfully created');
        setErrorMessage(null);
        setItem({
          name: '',
          price: '',
          unit: '',
          image_url: '',
          created_at: new Date().toISOString(),
        });
        setImage(null);
        navigation.navigate('Items Listing');
      })
      .catch(error => {
        console.error('Error:', error);
        setErrorMessage('Error creating record');
        setSuccessMessage(null);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={text => setItem({...item, name: text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        onChangeText={text => setItem({...item, price: text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Unit"
        onChangeText={text => setItem({...item, unit: text})}
      />

      {/* Image picker button */}
      <TouchableOpacity
        onPress={() =>
          ImagePicker.launchImageLibrary(
            {mediaType: 'photo'},
            handleImagePicker,
          )
        }>
        <Text>Choose Image</Text>
      </TouchableOpacity>

      {/* Display selected image */}
      {image && (
        <Image
          source={{uri: `data:image/jpeg;base64,${image.data}`}}
          style={styles.image}
        />
      )}

      {/* Success and Error messages */}
      {successMessage && (
        <Text style={styles.successMessage}>{successMessage}</Text>
      )}
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

      {/* Submit button */}
      <Button title="Submit" onPress={handleSubmit} style={styles.button} />
    </View>
  );
};

export default CreateItemForm;
