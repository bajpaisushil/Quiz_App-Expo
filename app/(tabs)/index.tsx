import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { quizzes } from '@/data/quizzes';

export default function QuizListScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Available Quizzes</Text>
      <View style={styles.quizList}>
        {quizzes.map((quiz) => (
          <TouchableOpacity
            key={quiz.id}
            style={styles.quizCard}
            onPress={() => router.push(`/quiz/${quiz.id}`)}>
            <Image source={{ uri: quiz.image }} style={styles.quizImage} />
            <View style={styles.quizInfo}>
              <Text style={styles.quizTitle}>{quiz.title}</Text>
              <Text style={styles.quizDescription}>{quiz.description}</Text>
              <View style={styles.quizMeta}>
                <Text style={styles.quizMetaText}>
                  {quiz.questions.length} questions
                </Text>
                <Text style={styles.quizMetaText}>{quiz.duration} min</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
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
  quizList: {
    padding: 16,
    gap: 16,
  },
  quizCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quizImage: {
    width: '100%',
    height: 160,
  },
  quizInfo: {
    padding: 16,
  },
  quizTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#1e293b',
    marginBottom: 4,
  },
  quizDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#64748b',
    marginBottom: 12,
  },
  quizMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  quizMetaText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#94a3b8',
  },
});