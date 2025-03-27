import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function DiscoverScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'transparent']}
        style={styles.header}>
        <Text style={styles.title}>Découvrir</Text>
      </LinearGradient>

      {/* TODO: Implement swipeable cards for events */}
      <View style={styles.content}>
        <Text style={styles.message}>Chargement des événements...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    height: 120,
    justifyContent: 'flex-end',
    padding: 20
  },
  title: {
    fontSize: 34,
    fontFamily: 'Inter-Bold',
    color: '#fff'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666'
  }
});
