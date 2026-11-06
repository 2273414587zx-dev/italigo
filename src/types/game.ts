export type VerbCategory = 'are' | 'ere' | 'ire_regular' | 'ire_isc';

export type Pronoun = 'io' | 'tu' | 'lui_lei' | 'noi' | 'voi' | 'loro';

export interface VerbConjugation {
  io: string;
  tu: string;
  lui_lei: string;
  noi: string;
  voi: string;
  loro: string;
}

export interface VerbItem {
  id: string;
  infinitive: string;
  category: VerbCategory;
  translationEn: string;
  translationZh: string;
  notes?: string;
  conjugations: VerbConjugation;
}

export type QuestionType =
  | 'conjugation' // Given pronoun + infinitive -> choose conjugated form
  | 'fill_blank'   // Given sentence with blank -> choose conjugated form
  | 'classification' // Given verb -> which category does it belong to? (-are, -ere, -ire regolare, -ire -isc-)
  | 'translation'  // Meaning match (Italian -> Chinese/English or vice versa)
  | 'identify_pronoun' // Given conjugated verb -> which pronoun?
  | 'family_relation' // Determine relationship between family members
  | 'vocabulary'; // Vocabulary context, definition, opposite, or category

export interface KahootOption {
  id: string;
  text: string;
  shape: 'triangle' | 'diamond' | 'circle' | 'square';
  color: 'red' | 'blue' | 'yellow' | 'green';
  isCorrect: boolean;
}

export type DifficultyLevel = 'all' | 'beginner' | 'intermediate' | 'advanced';

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  subPrompt?: string;
  targetVerb?: string;
  pronoun?: string;
  options: KahootOption[];
  correctAnswerText: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tense?: 'presente' | 'passato_prossimo' | 'misto';
  explanation: {
    rule: string;
    conjugationTable?: VerbConjugation;
    verbTranslation: string;
    sentenceMeaning?: string;
    vocabNote?: string;
  };
}

export type QuizCategoryFilter =
  | 'all'
  | 'are'
  | 'ere'
  | 'ire_all'
  | 'ire_regular'
  | 'ire_isc'
  | 'notebook_sentences'
  | 'notebook_vocab'
  | 'notebook_avere'
  | 'notebook_mesi_date'
  | 'notebook_possessivi'
  | 'family'
  | 'vocab_all'
  | 'vocab_cibo'
  | 'vocab_casa'
  | 'vocab_contrari'
  | 'vocab_citta';

export interface GameSettings {
  category: QuizCategoryFilter;
  difficulty: DifficultyLevel; // 'all' | 'beginner' | 'intermediate' | 'advanced'
  questionCount: number;
  timeLimitSec: number; // 0 for untimed, 15, 20, 30
  soundEnabled: boolean;
  musicEnabled: boolean;
  autoAdvance: boolean;
}

export type GameStage =
  | 'lobby'
  | 'playing'
  | 'feedback'
  | 'podium'
  | 'dictionary'
  | 'grammar_guide'
  | 'family_guide'
  | 'vocab_guide';

export type VocabTopic = 'cibo' | 'casa' | 'contrari' | 'citta' | 'aggettivi' | 'professioni' | 'notebook' | 'mesi' | 'avere_idioms';

export interface VocabItem {
  id: string;
  italian: string; // e.g. "il formaggio"
  topic: VocabTopic;
  translationZh: string; // "奶酪"
  translationEn: string; // "cheese"
  gender?: 'm' | 'f' | 'pl';
  plural?: string; // "i formaggi"
  opposite?: string; // "il contrario" if applicable
  exampleSentence: string;
  exampleSentenceZh: string;
  notes?: string;
}

export interface UserAnswerRecord {
  questionId: string;
  question: Question;
  selectedOptionId: string;
  isCorrect: boolean;
  timeSpentSec: number;
  pointsEarned: number;
}

export interface DailyStreakData {
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string; // 'YYYY-MM-DD'
  completedDates: string[]; // Set of 'YYYY-MM-DD' dates completed
  totalQuizzesCompleted: number;
  todayCompleted: boolean;
}

