import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {config} from '../../config';

interface DataItem {
  id: string;
  price: string;
  unit: string;
  name: string;
}

export function ItemsListingScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e6ffe6',
      }}>
      <Table />
    </View>
  );
}

const Table: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);

  function fetchData() {
    const url = `${config.crudUrl}`;
    console.log('url:', url);

    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        console.log('items list in app,responseData:', responseData);
        setData(responseData);
      })
      .catch(error => {
        console.error('API Error:', error);
      });
  }

  function handleDelete(id: string) {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            // Call the delete API with the item ID
            const deleteUrl = `https://371ea2ur16.execute-api.ap-south-1.amazonaws.com/dev/item/${id}`;
            try {
              const response = await fetch(deleteUrl, {method: 'DELETE'});
              if (response.ok) {
                console.log('Item deleted successfully');
                // Show success message
                Alert.alert('Success', 'Item successfully deleted');
                // Refresh the data
                fetchData();
              } else {
                console.error('Delete API Error:', response.status);
                Alert.alert('Error', 'Failed to delete item');
              }
            } catch (error) {
              console.error('Delete API Error:', error);
              Alert.alert('Error', 'Failed to delete item');
            }
          },
        },
      ],
      {cancelable: false},
    );
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', margin: 15, fontSize: 25}} />
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Actions</Text>
        <Text style={styles.headerCell}>Name</Text>
        <Text style={styles.headerCell}>Price</Text>
        <Text style={styles.headerCell}>Unit</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.row}>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'left',
                  fontWeight: '800',
                  marginLeft: 40,
                  color: 'red',
                  marginRight: 10,
                  marginLeft: 20,
                  textAlignVertical: 'center',
                }}>
                Remove
              </Text>
            </TouchableOpacity>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.price}</Text>
            <Text style={styles.cell}>{item.unit}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    marginLeft: 1,
    width: 400,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: 'purple',
    paddingBottom: 8,
    marginBottom: 40,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingBottom: 8,
    marginBottom: 8,
  },
  cell: {
    flex: 1,
    textAlign: 'left',
    fontWeight: '800',
    marginLeft: 40,
    textAlignVertical: 'center',
  },
});

export default Table;
