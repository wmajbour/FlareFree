import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from 'react-native';

export default function RecommendationScreen({ route }) {
  const { symptoms, diet } = route.params;
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('http://192.168.1.230:8000/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ symptoms, diet }),
        });

        const data = await response.json();
        setRecommendations(data.recommended_foods);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Foods:</Text>
      {recommendations.length > 0 ? (
        recommendations.map((item, index) => (
          <Text key={index} style={styles.item}>• {item}</Text>
        ))
      ) : (
        <Text>Loading recommendations...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  item: { fontSize: 18, marginBottom: 10 },
});
