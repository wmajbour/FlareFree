import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
  const [symptoms, setSymptoms] = useState('');
  const [diet, setDiet] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    console.log('Symptoms:', symptoms);
    console.log('Diet Restrictions:', diet);
  };

  return (
    <View style={styles.container}>
      {!submitted ? (
        <>
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

          <Button title="Submit" onPress={handleSubmit} />
        </>
      ) : (
        <Text style={styles.success}>Thank you! We are generating recommendations...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  label: { fontSize: 18, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20 },
  success: { fontSize: 20, textAlign: 'center' }
});
