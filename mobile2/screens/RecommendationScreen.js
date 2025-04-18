import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';

export default function RecommendationScreen({ route, navigation }) {
  const { symptoms, diet } = route.params;
  const [recommendations, setRecommendations] = useState([]);  // <- EMPTY ARRAY INITIALIZED
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('http://localhost:8000/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ symptoms, diet }),
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(`AI error: ${data.error}`);
        }

        setRecommendations(data.recommended_foods || []); // If API returns undefined, fallback to []
        console.log('Recommendations:');
        (data.recommended_foods || []).forEach(food => console.log(' -', food)); // Log each food item

      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setRecommendations([`Error: ${error.message}`]);  // Set as array with one error string
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Foods:</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        recommendations.map((item, index) => (
          <Text key={index} style={styles.item}>• {item}</Text>
        ))
      )}

      <View style={styles.buttonContainer}>
        <Button title="Back to Home" onPress={() => navigation.navigate('Home')} color="#4CAF50" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#fffaf0'
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20 
  },
  item: { 
    fontSize: 18, 
    marginVertical: 8 
  },
  buttonContainer: {
    marginTop: 30,
    borderRadius: 6,
    overflow: 'hidden',
  },
});
