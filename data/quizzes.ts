export interface Question {
  question: string;
  options: string[];
  correctOption: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: number;
  questions: Question[];
}

export const quizzes: Quiz[] = [
  {
    id: '1',
    title: 'JavaScript Fundamentals',
    description: 'Test your knowledge of JavaScript basics',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&auto=format&fit=crop',
    duration: 10,
    questions: [
      {
        question: 'What is the output of typeof null?',
        options: ['null', 'undefined', 'object', 'number'],
        correctOption: 2,
      },
      {
        question: 'Which method removes the last element from an array?',
        options: ['pop()', 'push()', 'shift()', 'unshift()'],
        correctOption: 0,
      },
      {
        question: 'What is the result of 3 + "3"?',
        options: ['6', '33', 'NaN', 'Error'],
        correctOption: 1,
      },
      {
        question: 'Which operator is used for strict equality comparison?',
        options: ['==', '===', '=', '!='],
        correctOption: 1,
      },
      {
        question: 'What is the scope of a variable declared with let?',
        options: ['Global scope', 'Function scope', 'Block scope', 'Module scope'],
        correctOption: 2,
      },
    ],
  },
  {
    id: '2',
    title: 'React Native Basics',
    description: 'Check your understanding of React Native',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&auto=format&fit=crop',
    duration: 15,
    questions: [
      {
        question: 'Which component is used to handle touch events?',
        options: ['TouchableOpacity', 'Pressable', 'Button', 'All of the above'],
        correctOption: 3,
      },
      {
        question: 'What is the purpose of the StyleSheet.create method?',
        options: [
          'To create inline styles',
          'To optimize style performance',
          'To validate styles',
          'To inherit styles',
        ],
        correctOption: 1,
      },
      {
        question: 'Which hook is used for side effects in React Native?',
        options: ['useState', 'useEffect', 'useCallback', 'useMemo'],
        correctOption: 1,
      },
      {
        question: 'What is the main difference between View and ScrollView?',
        options: [
          'View is scrollable',
          'ScrollView can contain multiple components',
          'ScrollView supports scroll interactions',
          'There is no difference',
        ],
        correctOption: 2,
      },
      {
        question: 'Which navigation library is recommended for React Native?',
        options: [
          'React Navigation',
          'React Router',
          'Native Navigation',
          'Navigation.js',
        ],
        correctOption: 0,
      },
    ],
  },
];