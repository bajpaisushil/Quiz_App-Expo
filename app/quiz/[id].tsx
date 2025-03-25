import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, X } from 'lucide-react-native';
import { quizzes } from '@/data/quizzes';

export default function QuizScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const quiz = quizzes.find((q) => q.id === id);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Array<{ correct: boolean; selected: number }>>([]);

  const currentQuestion = quiz?.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === (quiz?.questions.length ?? 0) - 1;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);

  if (!quiz || !currentQuestion) {
    return null;
  }

  const handleOptionPress = (index: number) => {
    if (!isAnswerChecked) {
      setSelectedOption(index);
    }
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    
    const isCorrect = selectedOption === currentQuestion.correctOption;
    setIsAnswerChecked(true);
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswers([...answers, { correct: isCorrect, selected: selectedOption }]);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      router.replace({
        pathname: '/quiz/result',
        params: {
          score,
          total: quiz.questions.length,
          answers: JSON.stringify(answers),
          quizTitle: quiz.title,
        },
      });
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progress}>
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` },
            ]}
          />
        </View>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>{currentQuestion.question}</Text>

        <View style={styles.options}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selectedOption === index && styles.selectedOption,
                isAnswerChecked && index === currentQuestion.correctOption && styles.correctOption,
                isAnswerChecked &&
                  selectedOption === index &&
                  index !== currentQuestion.correctOption &&
                  styles.incorrectOption,
              ]}
              onPress={() => handleOptionPress(index)}
              disabled={isAnswerChecked}>
              <Text
                style={[
                  styles.optionText,
                  selectedOption === index && styles.selectedOptionText,
                  isAnswerChecked &&
                    (index === currentQuestion.correctOption || selectedOption === index) &&
                    styles.checkedOptionText,
                ]}>
                {option}
              </Text>
              {isAnswerChecked && index === currentQuestion.correctOption && (
                <Check color="#22c55e" size={20} />
              )}
              {isAnswerChecked && selectedOption === index && index !== currentQuestion.correctOption && (
                <X color="#ef4444" size={20} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        {!isAnswerChecked ? (
          <TouchableOpacity
            style={[styles.button, selectedOption === null && styles.buttonDisabled]}
            onPress={handleCheckAnswer}
            disabled={selectedOption === null}>
            <Text style={[styles.buttonText, selectedOption === null && styles.buttonTextDisabled]}>
              Check Answer
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>{isLastQuestion ? 'See Results' : 'Next Question'}</Text>
          </TouchableOpacity>
        )}
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
  },
  progress: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#64748b',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 2,
  },
  questionContainer: {
    flex: 1,
    padding: 16,
  },
  question: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#1e293b',
    marginBottom: 24,
  },
  options: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  selectedOption: {
    backgroundColor: '#eff6ff',
    borderColor: '#6366f1',
  },
  correctOption: {
    backgroundColor: '#f0fdf4',
    borderColor: '#22c55e',
  },
  incorrectOption: {
    backgroundColor: '#fef2f2',
    borderColor: '#ef4444',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#475569',
  },
  selectedOptionText: {
    color: '#6366f1',
    fontFamily: 'Inter_600SemiBold',
  },
  checkedOptionText: {
    fontFamily: 'Inter_600SemiBold',
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
  buttonDisabled: {
    backgroundColor: '#e2e8f0',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  buttonTextDisabled: {
    color: '#94a3b8',
  },
});