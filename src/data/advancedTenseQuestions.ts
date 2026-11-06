import { Question, KahootOption } from '../types/game';

const SHAPES: Array<KahootOption['shape']> = ['triangle', 'diamond', 'circle', 'square'];
const COLORS: Array<KahootOption['color']> = ['red', 'blue', 'yellow', 'green'];

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function buildKahootOptions(correctText: string, distractors: string[]): KahootOption[] {
  const validDistractors = Array.from(new Set(distractors.filter((d) => d !== correctText))).slice(0, 3);
  while (validDistractors.length < 3) {
    validDistractors.push(`opzione_${validDistractors.length + 1}`);
  }
  const rawOptions = [
    { text: correctText, isCorrect: true },
    { text: validDistractors[0], isCorrect: false },
    { text: validDistractors[1], isCorrect: false },
    { text: validDistractors[2], isCorrect: false },
  ];
  const shuffled = shuffleArray(rawOptions);
  return shuffled.map((opt, index) => ({
    id: `opt-tense-${index}-${Math.random().toString(36).substring(2, 7)}`,
    text: opt.text,
    shape: SHAPES[index],
    color: COLORS[index],
    isCorrect: opt.isCorrect,
  }));
}

/**
 * Handcrafted Questions covering Verb Complexity & Tense Variety (Passato Prossimo & Irregular Participles)
 */
export const ADVANCED_TENSE_QUESTIONS: Question[] = [
  // 1. Irregular Participle: scrivere -> scritto
  {
    id: 'tense-participle-scrivere',
    type: 'conjugation',
    prompt: 'Qual è il participio passato irregolare del verbo "SCRIVERE" (写)?',
    subPrompt: '🔥 Passato Prossimo 核心过去分词',
    targetVerb: 'scrivere',
    correctAnswerText: 'scritto',
    difficulty: 'advanced',
    tense: 'passato_prossimo',
    options: buildKahootOptions('scritto', ['scrivuto', 'scrivito', 'scrisso']),
    explanation: {
      rule: 'Scrivere ha un participio passato irregolare: scrivere -> scritto (non "scrivuto"!).',
      verbTranslation: 'scrivere = 写 (to write) -> scritto',
      sentenceMeaning: 'Ho scritto una lettera. (我写了一封信。)',
    },
  },

  // 2. Irregular Participle: prendere -> preso
  {
    id: 'tense-participle-prendere',
    type: 'conjugation',
    prompt: 'Qual è il participio passato irregolare di "PRENDERE" (拿/喝/乘车)?',
    subPrompt: '🔥 Passato Prossimo 核心过去分词',
    targetVerb: 'prendere',
    correctAnswerText: 'preso',
    difficulty: 'advanced',
    tense: 'passato_prossimo',
    options: buildKahootOptions('preso', ['prenduto', 'prendito', 'prento']),
    explanation: {
      rule: 'Prendere è un verbo con participio irregolare in -so: prendere -> preso.',
      verbTranslation: 'prendere = 拿/取/喝 -> preso',
      sentenceMeaning: 'Hai preso un caffè stamattina? (你今天早上喝咖啡了吗？)',
    },
  },

  // 3. Irregular Participle: vedere -> visto
  {
    id: 'tense-participle-vedere',
    type: 'conjugation',
    prompt: 'Qual è il participio passato più comune del verbo "VEDERE" (看/见)?',
    subPrompt: '🔥 Passato Prossimo 核心过去分词',
    targetVerb: 'vedere',
    correctAnswerText: 'visto',
    difficulty: 'intermediate',
    tense: 'passato_prossimo',
    options: buildKahootOptions('visto', ['veduto', 'vistato', 'vedato']),
    explanation: {
      rule: 'Vedere forma comunemente il participio passato in "visto": vedere -> visto.',
      verbTranslation: 'vedere = 看见 -> visto',
      sentenceMeaning: 'Abbiamo visto un bel film. (我们看了一部好电影。)',
    },
  },

  // 4. Irregular Participle: leggere -> letto
  {
    id: 'tense-participle-leggere',
    type: 'conjugation',
    prompt: 'Qual è il participio passato irregolare di "LEGGERE" (读/阅读)?',
    subPrompt: '🔥 Passato Prossimo 核心过去分词',
    targetVerb: 'leggere',
    correctAnswerText: 'letto',
    difficulty: 'advanced',
    tense: 'passato_prossimo',
    options: buildKahootOptions('letto', ['legguto', 'leggito', 'lesso']),
    explanation: {
      rule: 'Leggere raddoppia la t nel participio passato: leggere -> letto.',
      verbTranslation: 'leggere = 阅读 -> letto',
      sentenceMeaning: 'Ho letto quel libro di italiano. (我读了那本意大利语书。)',
    },
  },

  // 5. Irregular Participle: chiudere -> chiuso
  {
    id: 'tense-participle-chiudere',
    type: 'conjugation',
    prompt: 'Qual è il participio passato del verbo "CHIUDERE" (关上)?',
    subPrompt: '🔥 Passato Prossimo 核心过去分词',
    targetVerb: 'chiudere',
    correctAnswerText: 'chiuso',
    difficulty: 'advanced',
    tense: 'passato_prossimo',
    options: buildKahootOptions('chiuso', ['chiuduto', 'chiudito', 'chiutto']),
    explanation: {
      rule: 'Chiudere forma il participio irregolare in -so: chiudere -> chiuso.',
      verbTranslation: 'chiudere = 关上 -> chiuso',
      sentenceMeaning: 'Chi ha chiuso la porta? (谁把门关上了？)',
    },
  },

  // 6. Irregular Participle: rispondere -> risposto
  {
    id: 'tense-participle-rispondere',
    type: 'conjugation',
    prompt: 'Qual è il participio passato di "RISPONDERE" (回答)?',
    subPrompt: '🔥 Passato Prossimo 核心过去分词',
    targetVerb: 'rispondere',
    correctAnswerText: 'risposto',
    difficulty: 'advanced',
    tense: 'passato_prossimo',
    options: buildKahootOptions('risposto', ['risponduto', 'rispondito', 'risposo']),
    explanation: {
      rule: 'Rispondere forma il participio passato in -sto: rispondere -> risposto.',
      verbTranslation: 'rispondere = 回答 -> risposto',
      sentenceMeaning: 'Lo studente ha risposto alla domanda. (学生回答了问题。)',
    },
  },

  // 7. Full Compound Tense: Io + avere + scrivere
  {
    id: 'tense-compound-ho-scritto',
    type: 'fill_blank',
    prompt: 'Ieri sera io (scrivere) _____ un messaggio a Maria.',
    subPrompt: '🔥 近过去时 Passato Prossimo 填空',
    targetVerb: 'scrivere',
    pronoun: 'io',
    correctAnswerText: 'ho scritto',
    difficulty: 'advanced',
    tense: 'passato_prossimo',
    options: buildKahootOptions('ho scritto', ['ho scrivuto', 'scrivo', 'sono scritto']),
    explanation: {
      rule: 'Passato Prossimo con ausiliare avere: "io ho" + participio irregolare "scritto" = ho scritto.',
      verbTranslation: 'scrivere = 写 -> ho scritto (我写了)',
      sentenceMeaning: '昨晚我给玛丽亚写了一条消息。',
    },
  },

  // 8. Full Compound Tense: Noi + avere + vedere
  {
    id: 'tense-compound-abbiamo-visto',
    type: 'fill_blank',
    prompt: 'Sabato scorso noi (vedere) _____ una partita di calcio.',
    subPrompt: '🔥 近过去时 Passato Prossimo 填空',
    targetVerb: 'vedere',
    pronoun: 'noi',
    correctAnswerText: 'abbiamo visto',
    difficulty: 'intermediate',
    tense: 'passato_prossimo',
    options: buildKahootOptions('abbiamo visto', ['abbiamo veduto', 'vediamo', 'siamo visti']),
    explanation: {
      rule: 'Noi + ausiliare avere (abbiamo) + participio (visto) = abbiamo visto.',
      verbTranslation: 'vedere = 看 -> abbiamo visto (我们看了)',
      sentenceMeaning: '上周六我们看了一场足球比赛。',
    },
  },

  // 9. Full Compound Tense: Tu + avere + prendere
  {
    id: 'tense-compound-hai-preso',
    type: 'fill_blank',
    prompt: 'Che cosa (prendere) _____ tu stamattina al bar?',
    subPrompt: '🔥 近过去时 Passato Prossimo 提问句',
    targetVerb: 'prendere',
    pronoun: 'tu',
    correctAnswerText: 'hai preso',
    difficulty: 'advanced',
    tense: 'passato_prossimo',
    options: buildKahootOptions('hai preso', ['hai prenduto', 'prendi', 'sei preso']),
    explanation: {
      rule: 'Tu + ausiliare avere (hai) + participio irregolare (preso) = hai preso.',
      verbTranslation: 'prendere = 拿/点餐 -> hai preso (你点了/喝了)',
      sentenceMeaning: '今天早上你在咖啡厅点了什么？',
    },
  },

  // 10. Regular Compound Tense: parlare (-are -> -ato)
  {
    id: 'tense-compound-ho-parlato',
    type: 'fill_blank',
    prompt: 'Io (parlare) _____ con il professore dopo la lezione.',
    subPrompt: '🌱 -ARE 动词近过去时规则变化 (-ato)',
    targetVerb: 'parlare',
    pronoun: 'io',
    correctAnswerText: 'ho parlato',
    difficulty: 'beginner',
    tense: 'passato_prossimo',
    options: buildKahootOptions('ho parlato', ['ho parlito', 'parlo', 'sono parlato']),
    explanation: {
      rule: 'I verbi regolari in -are formano il participio passato in -ato: parlare -> parlato. Io ho parlato.',
      verbTranslation: 'parlare -> parlato (ho parlato = 我说了/交谈了)',
      sentenceMeaning: '下课后我和教授交谈了。',
    },
  },

  // 11. Regular Compound Tense: finire (-ire -> -ito)
  {
    id: 'tense-compound-hai-finito',
    type: 'fill_blank',
    prompt: 'Tu (finire) _____ di fare i compiti di italiano?',
    subPrompt: '⚡ -IRE 动词过去分词规则变化 (-ito)',
    targetVerb: 'finire',
    pronoun: 'tu',
    correctAnswerText: 'hai finito',
    difficulty: 'intermediate',
    tense: 'passato_prossimo',
    options: buildKahootOptions('hai finito', ['hai finiscito', 'finisci', 'sei finito']),
    explanation: {
      rule: 'Attenzione! Nel participio passato non si usa -isc-! Finire -> finito (hai finito).',
      verbTranslation: 'finire -> finito (hai finito = 你完成了吗)',
      sentenceMeaning: '你做完意大利语作业了吗？',
    },
  },

  // 12. Full Compound Tense: Avere avuto
  {
    id: 'tense-compound-ho-avuto',
    type: 'fill_blank',
    prompt: 'Ieri io non sono venuto perché (avere) _____ molto freddo.',
    subPrompt: '🔥 动词 AVERE 自身的近过去时 (ho avuto)',
    targetVerb: 'avere',
    pronoun: 'io',
    correctAnswerText: 'ho avuto',
    difficulty: 'intermediate',
    tense: 'passato_prossimo',
    options: buildKahootOptions('ho avuto', ['ho avito', 'avevo', 'sono avuto']),
    explanation: {
      rule: 'Il participio passato di avere è "avuto". Con "io" diventa: ho avuto (ho avuto freddo = 我觉得冷了)。',
      verbTranslation: 'avere -> avuto (ho avuto = 我有了/经历了)',
      sentenceMeaning: '昨天我没来，因为我觉得非常冷。',
    },
  },

  // 13. Tense Contrast: Presente vs Passato Prossimo
  {
    id: 'tense-contrast-oggi-ieri',
    type: 'fill_blank',
    prompt: 'Di solito noi (mangiare) _____ a casa, ma ieri (mangiare) _____ al ristorante.',
    subPrompt: '👑 现在时 (Di solito) 与 过去时 (Ieri) 对比',
    targetVerb: 'mangiare',
    correctAnswerText: 'mangiamo / abbiamo mangiato',
    difficulty: 'advanced',
    tense: 'misto',
    options: buildKahootOptions('mangiamo / abbiamo mangiato', [
      'abbiamo mangiato / mangiamo',
      'mangiano / hanno mangiato',
      'mangiamo / siamo mangiati',
    ]),
    explanation: {
      rule: 'Di solito (平时通常) 用现在时 mangiamo；ieri (昨天) 用近过去时 abbiamo mangiato。',
      verbTranslation: 'mangiare = 吃',
      sentenceMeaning: '通常我们在家吃，但昨天我们在餐厅吃了。',
    },
  },

  // 14. Auxiliary Selection with Avere
  {
    id: 'tense-auxiliary-rule',
    type: 'classification',
    prompt: 'In italiano, i verbi come studiare, mangiare, scrivere formano il Passato Prossimo con:',
    subPrompt: '💡 复合时态助动词法则',
    correctAnswerText: 'L\'ausiliare AVERE (ho studiato, ho mangiato)',
    difficulty: 'beginner',
    tense: 'passato_prossimo',
    options: buildKahootOptions('L\'ausiliare AVERE (ho studiato, ho mangiato)', [
      'L\'ausiliare ESSERE (sono studiato)',
      'Senza ausiliare (solo il verbo all\'infinito)',
      'L\'ausiliare FARE (faccio studiato)',
    ]),
    explanation: {
      rule: 'I verbi transitivi e la maggior parte delle azioni attive prendono l\'ausiliare avere: ho studiato, abbiamo mangiato, hanno scritto.',
      verbTranslation: 'ausiliare avere = 助动词 avere',
      sentenceMeaning: '意大利语及物动词近过去时使用 avere 作助动词。',
    },
  },

  // 15. Advanced Irregular: Mettere -> messo
  {
    id: 'tense-participle-mettere',
    type: 'conjugation',
    prompt: 'Qual è il participio passato irregolare del verbo "METTERE" (放/置)?',
    subPrompt: '🔥 笔记核心动词过去分词',
    targetVerb: 'mettere',
    correctAnswerText: 'messo',
    difficulty: 'advanced',
    tense: 'passato_prossimo',
    options: buildKahootOptions('messo', ['mettuto', 'mettito', 'metto']),
    explanation: {
      rule: 'Mettere ha il participio passato irregolare in doppio -ss-: mettere -> messo.',
      verbTranslation: 'mettere = 放置 -> messo',
      sentenceMeaning: 'Ho messo il quaderno nello zaino. (我把笔记本放进书包里了。)',
    },
  },
];
