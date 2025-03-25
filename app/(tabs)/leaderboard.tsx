import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Medal } from 'lucide-react-native';

const leaderboardData = [
  { id: '1', name: 'John Doe', score: 95, quizzes: 10 },
  { id: '2', name: 'Jane Smith', score: 90, quizzes: 8 },
  { id: '3', name: 'Bob Johnson', score: 85, quizzes: 12 },
];

export default function LeaderboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={leaderboardData}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.leaderboardItem}>
            <View style={styles.rank}>
              {index < 3 ? (
                <Medal
                  size={24}
                  color={index === 0 ? '#fbbf24' : index === 1 ? '#94a3b8' : '#d97706'}
                />
              ) : (
                <Text style={styles.rankText}>{index + 1}</Text>
              )}
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userMeta}>
                {item.quizzes} quizzes completed
              </Text>
            </View>
            <Text style={styles.score}>{item.score}%</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#1e293b',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  list: {
    padding: 16,
    gap: 12,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  rank: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#64748b',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#1e293b',
    marginBottom: 2,
  },
  userMeta: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#94a3b8',
  },
  score: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#6366f1',
  },
});