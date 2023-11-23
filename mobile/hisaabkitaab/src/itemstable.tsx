import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

interface DataItem {
  id: string;
  price: string;
  unit: string;
  name: string;
}

const data: DataItem[] = [
  {id: '1', price: '$10', unit: 'each', name: 'milk'},
  {id: '2', price: '$15', unit: 'pair', name: 'curd'},
  {id: '3', price: '$25', unit: 'dozen', name: 'cheese'},
  // Add more data items here
];
import {config} from '../config';

// async function getItems() {
//   try {
//     const url = `${config.apiUrl}/price/items/`;
//     console.log('url:', url);
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const contentType = response.headers.get('content-type');
//     if (!contentType || !contentType.includes('application/json')) {
//       throw new Error('Response is not in JSON format');
//     }
//     const data = await response.json();
//     // Assuming your API response has a 'price' field, update the 'price' state with the fetched value.
//     console.log({data: data});
//     this.setState({data: data});
//   } catch (error) {
//     console.log('error as string', JSON.stringify(error));
//     console.error('Error fetching data:', error);
//   }
// }

const Table: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    const url = `${config.crudUrl}`;
    console.log('url:', url);
    // Perform your API call here and update the data state
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        console.log('items list in app,responseData:', responseData);
        setData(responseData); // Update the data state with API response data
        // setIsLoading(false); // Set loading to false when data is loaded
      })
      .catch(error => {
        console.error('API Error:', error);
        // setIsLoading(false); // Set loading to false in case of an error
      });
  }, []); // The empty dependency array ensures the effect runs only once (on component mount)

  return (
    <View style={styles.container}>
      <Text style={{fontWeight:'bold', margin: 15, fontSize:25}}></Text>
      <View style={styles.headerRow}>
      <Text style={styles.headerCell}>Name</Text>
        <Text style={styles.headerCell}>Price</Text>
        <Text style={styles.headerCell}>Unit</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.row}>
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
    fontSize: 20,
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
    textAlign: 'center',
    fontWeight: '800'
  },
});

export default Table;
