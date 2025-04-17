import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [symptoms, setSymptoms] = useState('');
  const [diet, setDiet] = useState('');
  const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      justifyContent: 'center', 
      padding: 20, 
      backgroundColor: '#f0f8ff'
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 40,
      color: '#333',
    },
    label: { 
      fontSize: 18, 
      marginBottom: 8 
    },
    input: { 
      borderWidth: 1, 
      borderColor: '#ccc', 
      padding: 12, 
      borderRadius: 6, 
      marginBottom: 20, 
      backgroundColor: '#fff'
    },
    buttonContainer: {
      marginTop: 10,
      borderRadius: 6,
      overflow: 'hidden',
    },
  });
  

  const handleSubmit = () => {
    navigation.navigate('Recommendations', { symptoms, diet });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FlareFree</Text>
  
      <Text style={styles.label}>Enter your symptoms:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., fatigue, joint pain"
        value={symptoms}
        onChangeText={setSymptoms}
      />
  
      <Text style={styles.label}>Enter your diet restrictions:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., gluten-free, sugar-free"
        value={diet}
        onChangeText={setDiet}
      />
  
      <View style={styles.buttonContainer}>
        <Button title="Get Recommendations" onPress={handleSubmit} color="#4CAF50" />
      </View>
    </View>
  );
} 