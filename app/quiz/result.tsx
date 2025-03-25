import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, X } from 'lucide-react-native';

export default function QuizResultScreen() {
  const router = useRouter();
  const { score, total, answers, quizTitle } = useLocalSearchParams();
  const parsedAnswers = JSON.parse(answers as string) as Array<{ correct: boolean; selected: number }>;
  const percentage = Math.round((Number(score) / Number(total)) * 100);

  const handleReturnHome = () => {
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Quiz Complete!</Text>
          <Text style={styles.subtitle}>{quizTitle}</Text>
        </View>

        <View style={styles.scoreCard}>
          <Text style={styles.scoreTitle}>Your Score</Text>
          <Text style={styles.scoreValue}>{percentage}%</Text>
          <Text style={styles.scoreDetail}>
            {score} correct out of {total} questions
          </Text>
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Question Summary</Text>
          {parsedAnswers.map((answer, index) => (
            <View key={index} style={styles.summaryItem}>
              <View style={styles.summaryIcon}>
                {answer.correct ? (
                  <Check color="#22c55e" size={20} />
                ) : (
                  <X color="#ef4444" size={20} />
                )}
              </View>
              <Text style={styles.summaryText}>
                Question {index + 1}: {answer.correct ? 'Correct' : 'Incorrect'}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleReturnHome}>
          <Text style={styles.buttonText}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#64748b',
  },
  scoreCard: {
    margin: 16,
    padding: 24,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scoreTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#64748b',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 48,
    fontFamily: 'Inter_700Bold',
    color: '#6366f1',
    marginBottom: 8,
  },
  scoreDetail: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#94a3b8',
  },
  summary: {
    padding: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#1e293b',
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  summaryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  summaryText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#475569',
  },
  footer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  button: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});