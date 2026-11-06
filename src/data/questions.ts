import { Question, KahootOption, QuizCategoryFilter, VerbItem, DifficultyLevel } from '../types/game';
import { VERBS_DATA } from './verbs';
import { FAMILY_WORKSHEET_QUESTIONS } from './familyQuestions';
import { get100FamilyQuestions } from './massiveFamilyBank';
import { generateVocabularyQuestions } from './vocabularyData';
import { NOTEBOOK_AVERE_QUESTIONS, NOTEBOOK_MESI_DATE_QUESTIONS } from './notebookAvereAndDates';
import { NOTEBOOK_POSSESSIVE_QUESTIONS } from './notebookPossessives';
import { ADVANCED_TENSE_QUESTIONS } from './advancedTenseQuestions';

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
  // Ensure exactly 3 unique distractors that are not equal to correctText
  const validDistractors = Array.from(new Set(distractors.filter((d) => d !== correctText))).slice(0, 3);

  // If not enough distractors, generate generic fallback
  while (validDistractors.length < 3) {
    validDistractors.push(`forma_${validDistractors.length + 1}`);
  }

  const rawOptions = [
    { text: correctText, isCorrect: true },
    { text: validDistractors[0], isCorrect: false },
    { text: validDistractors[1], isCorrect: false },
    { text: validDistractors[2], isCorrect: false },
  ];

  const shuffled = shuffleArray(rawOptions);

  return shuffled.map((opt, index) => ({
    id: `opt-${index}-${Math.random().toString(36).substring(2, 7)}`,
    text: opt.text,
    shape: SHAPES[index],
    color: COLORS[index],
    isCorrect: opt.isCorrect,
  }));
}

/**
 * Handcrafted Worksheet Sentence Questions based on Notebook Page 4 & 5
 */
export const NOTEBOOK_WORKSHEET_QUESTIONS: Question[] = [
  {
    id: 'ws-1',
    type: 'fill_blank',
    prompt: 'Io (studiare) _____ italiano all\'Università di Bridgewater.',
    subPrompt: 'Notebook Page 4 笔记填空题 1',
    targetVerb: 'studiare',
    pronoun: 'io',
    correctAnswerText: 'studio',
    options: buildKahootOptions('studio', ['studia', 'studiamo', 'studii']),
    explanation: {
      rule: 'Verbo in -are (studiare). Con "io" si toglie -are e si aggiunge la desinenza -o: studi + o = studio.',
      verbTranslation: 'studiare = 学习 (to study)',
      sentenceMeaning: '我在布里奇沃特大学学习意大利语。',
    },
  },
  {
    id: 'ws-2',
    type: 'fill_blank',
    prompt: 'La mia amica migliore Giulia (studiare) _____ spagnolo.',
    subPrompt: 'Notebook Page 4 笔记填空题 2',
    targetVerb: 'studiare',
    pronoun: 'lei',
    correctAnswerText: 'studia',
    options: buildKahootOptions('studia', ['studio', 'studie', 'studiano']),
    explanation: {
      rule: 'Giulia corrisponde al pronome di terza persona singolare "lei". Per i verbi in -are, la desinenza è -a: studia.',
      verbTranslation: 'studiare = 学习 (to study)',
      sentenceMeaning: '我最好的朋友朱莉娅学习西班牙语。',
    },
  },
  {
    id: 'ws-3',
    type: 'fill_blank',
    prompt: 'Noi (guidare) _____ a BSU insieme.',
    subPrompt: 'Notebook Page 4 笔记填空题 3',
    targetVerb: 'guidare',
    pronoun: 'noi',
    correctAnswerText: 'guidiamo',
    options: buildKahootOptions('guidiamo', ['guidate', 'guidano', 'guido']),
    explanation: {
      rule: 'Per tutti i verbi regolari (-are, -ere, -ire), la prima persona plurale "noi" finisce sempre in -iamo: guid + iamo = guidiamo.',
      verbTranslation: 'guidare = 开车 (to drive)',
      sentenceMeaning: '我们一起开车去BSU。',
    },
  },
  {
    id: 'ws-4',
    type: 'fill_blank',
    prompt: 'Io (preferire) _____ arrivare molto presto.',
    subPrompt: 'Notebook Page 4 笔记填空题 4 (-isc- 重点词)',
    targetVerb: 'preferire',
    pronoun: 'io',
    correctAnswerText: 'preferisco',
    options: buildKahootOptions('preferisco', ['prefero', 'preferio', 'preferisci']),
    explanation: {
      rule: 'Preferire è un verbo in -ire con infisso -isc-. Per "io" si aggiunge -isc- + -o: prefer + isc + o = preferisco (pronuncia: preferisko).',
      verbTranslation: 'preferire = 更喜欢/偏好 (to prefer)',
      sentenceMeaning: '我更喜欢很早就到达。',
    },
  },
  {
    id: 'ws-5',
    type: 'fill_blank',
    prompt: '...ma Giulia (partire) _____ la sua casa tardi.',
    subPrompt: 'Notebook Page 4 笔记填空题 5 (Regolari vs -isc- 对比)',
    targetVerb: 'partire',
    pronoun: 'lei',
    correctAnswerText: 'parte',
    options: buildKahootOptions('parte', ['partisce', 'parta', 'parti']),
    explanation: {
      rule: 'Attenzione! "Partire" è un verbo in -ire REGOLARE (senza -isc-). Per lui/lei la desinenza è -e: part + e = parte (NON "partisce"!).',
      verbTranslation: 'partire = 出发/离开 (to leave/depart)',
      sentenceMeaning: '但是朱莉娅很晚才从家里出发。',
    },
  },
  {
    id: 'ws-6',
    type: 'fill_blank',
    prompt: 'Di solito noi (arrivare) _____ sempre in ritardo.',
    subPrompt: 'Notebook Page 4 笔记填空题 6',
    targetVerb: 'arrivare',
    pronoun: 'noi',
    correctAnswerText: 'arriviamo',
    options: buildKahootOptions('arriviamo', ['arrivate', 'arrivano', 'arrivo']),
    explanation: {
      rule: 'Verbo in -are con soggetto "noi": desinenza -iamo -> arriviamo.',
      verbTranslation: 'arrivare = 到达 (to arrive)',
      sentenceMeaning: '通常我们总是迟到。',
    },
  },
  {
    id: 'ws-7',
    type: 'fill_blank',
    prompt: 'Lei (arrivare) _____ alle sette un quarto.',
    subPrompt: 'Notebook Page 4 笔记填空题 7',
    targetVerb: 'arrivare',
    pronoun: 'lei',
    correctAnswerText: 'arriva',
    options: buildKahootOptions('arriva', ['arrive', 'arrivo', 'arrivi']),
    explanation: {
      rule: 'Con "lei" e i verbi in -are si aggiunge la desinenza -a: arriv + a = arriva.',
      verbTranslation: 'arrivare = 到达 (to arrive)',
      sentenceMeaning: '她七点一刻到达。',
    },
  },
  {
    id: 'ws-8',
    type: 'fill_blank',
    prompt: 'Che tipo di film (preferire) _____ tu?',
    subPrompt: 'Notebook Page 4 提问句练习',
    targetVerb: 'preferire',
    pronoun: 'tu',
    correctAnswerText: 'preferisci',
    options: buildKahootOptions('preferisci', ['preferi', 'preferisco', 'preferisce']),
    explanation: {
      rule: 'Preferire con "tu": infisso -isc- + desinenza -i: prefer + isc + i = preferisci (pronuncia "preferishee").',
      verbTranslation: 'preferire = 更喜欢 (to prefer)',
      sentenceMeaning: '你更喜欢哪种类型的电影？',
    },
  },
  {
    id: 'ws-9',
    type: 'fill_blank',
    prompt: 'A che ora (partire) _____ il treno per Milano?',
    subPrompt: 'Notebook Page 4 动词出发 partire',
    targetVerb: 'partire',
    pronoun: 'lui',
    correctAnswerText: 'parte',
    options: buildKahootOptions('parte', ['partisce', 'parti', 'partono']),
    explanation: {
      rule: '"Il treno" è terza persona singolare (lui). Partire è un verbo in -ire REGOLARE: il treno parte.',
      verbTranslation: 'partire = 出发 (to depart)',
      sentenceMeaning: '去米兰的火车几点出发？',
    },
  },
  {
    id: 'ws-10',
    type: 'fill_blank',
    prompt: 'Tu (capire) _____ la spiegazione del professore?',
    subPrompt: 'Notebook Page 3 & 5 重点词 capire',
    targetVerb: 'capire',
    pronoun: 'tu',
    correctAnswerText: 'capisci',
    options: buildKahootOptions('capisci', ['capi', 'capisci? ', 'capisce', 'capisco']),
    explanation: {
      rule: 'Capire è un verbo -isc-. Per "tu": cap + isc + i = capisci (pronuncia: "ka-pee-shee"). Dal tuo quaderno: "Capisci? Understand!"',
      verbTranslation: 'capire = 理解/明白 (to understand)',
      sentenceMeaning: '你理解教授的讲解吗？',
    },
  },
  {
    id: 'ws-11',
    type: 'fill_blank',
    prompt: 'Noi (finire) _____ di studiare alle sei di sera.',
    subPrompt: 'Notebook Page 3 & 5 易错点: noi/voi 不加 -isc-!',
    targetVerb: 'finire',
    pronoun: 'noi',
    correctAnswerText: 'finiamo',
    options: buildKahootOptions('finiamo', ['finisciamo', 'finisco', 'finite']),
    explanation: {
      rule: 'Regola d\'oro dal quaderno: con "noi" e "voi", i verbi in -isc- NON prendono mai -isc-! Quindi: noi finiamo (e NON "finisciamo"!).',
      verbTranslation: 'finire = 完成/结束 (to finish)',
      sentenceMeaning: '我们晚上六点结束学习。',
    },
  },
  {
    id: 'ws-12',
    type: 'fill_blank',
    prompt: 'I bambini (dormire) _____ otto ore per notte.',
    subPrompt: 'Notebook Page 3 & 5: dormire 是普通规则还是 -isc-?',
    targetVerb: 'dormire',
    pronoun: 'loro',
    correctAnswerText: 'dormono',
    options: buildKahootOptions('dormono', ['dormiscono', 'dormano', 'dorme']),
    explanation: {
      rule: 'Dal tuo quaderno: "dormire" è nella colonna REGOLARI! Terza persona plurale (loro): dorm + ono = dormono (e NON "dormiscono"!).',
      verbTranslation: 'dormire = 睡觉 (to sleep)',
      sentenceMeaning: '孩子们每晚睡八个小时。',
    },
  },
  {
    id: 'ws-13',
    type: 'fill_blank',
    prompt: 'Io e Marco (prendere) _____ un espresso al bar.',
    subPrompt: 'Notebook Page 2 -ere 动词 prendere',
    targetVerb: 'prendere',
    pronoun: 'noi',
    correctAnswerText: 'prendiamo',
    options: buildKahootOptions('prendiamo', ['prendete', 'prendono', 'prendo']),
    explanation: {
      rule: '"Io e Marco" = noi. Verbo in -ere (prendere): desinenza -iamo -> prendiamo.',
      verbTranslation: 'prendere = 喝(咖啡)/拿 (to take/drink)',
      sentenceMeaning: '我和马可在酒吧喝一杯意式浓缩咖啡。',
    },
  },
  {
    id: 'ws-14',
    type: 'fill_blank',
    prompt: 'Chi (chiudere) _____ la porta d\'ingresso?',
    subPrompt: 'Notebook Page 2 -ere 动词 chiudere',
    targetVerb: 'chiudere',
    pronoun: 'lui',
    correctAnswerText: 'chiude',
    options: buildKahootOptions('chiude', ['chiuda', 'chiudo', 'chiudi']),
    explanation: {
      rule: '"Chi" (chiunque) regge la terza persona singolare (lui/lei). Per i verbi in -ere la desinenza è -e: chiude.',
      verbTranslation: 'chiudere = 关上/关闭 (to close/shut)',
      sentenceMeaning: '谁关上了大门？',
    },
  },
  {
    id: 'ws-15',
    type: 'fill_blank',
    prompt: 'Gli studenti (aprire) _____ i quaderni a pagina dieci.',
    subPrompt: 'Notebook Page 5 -ire 规则动词 aprire',
    targetVerb: 'aprire',
    pronoun: 'loro',
    correctAnswerText: 'aprono',
    options: buildKahootOptions('aprono', ['apriscono', 'apreno', 'aprono?']),
    explanation: {
      rule: '"Aprire" è un verbo in -ire REGOLARE. Con loro: apr + ono = aprono (NON apriscono!).',
      verbTranslation: 'aprire = 打开 (to open)',
      sentenceMeaning: '学生们把笔记本翻到第十页。',
    },
  },
  {
    id: 'ws-16',
    type: 'fill_blank',
    prompt: 'Oggi io (pulire) _____ tutta la mia camera.',
    subPrompt: 'Notebook Page 5 -ire -isc- 动词 pulire',
    targetVerb: 'pulire',
    pronoun: 'io',
    correctAnswerText: 'pulisco',
    options: buildKahootOptions('pulisco', ['pulo', 'pulio', 'pulisce']),
    explanation: {
      rule: '"Pulire" fa parte dei verbi in -isc-: con "io" diventa pul + isc + o = pulisco.',
      verbTranslation: 'pulire = 打扫/清洁 (to clean)',
      sentenceMeaning: '今天我打扫我的整个房间。',
    },
  },
  {
    id: 'ws-17',
    type: 'fill_blank',
    prompt: 'Voi (vedere) _____ quel bel monumento là in fondo?',
    subPrompt: 'Notebook Page 2 -ere 动词 vedere',
    targetVerb: 'vedere',
    pronoun: 'voi',
    correctAnswerText: 'vedete',
    options: buildKahootOptions('vedete', ['vedate', 'vedite', 'vedono']),
    explanation: {
      rule: 'Verbi in -ere con "voi": desinenza -ete -> ved + ete = vedete. (Dal tuo quaderno: io vedo, tu vedi, lui vede, noi vediamo, voi vedete, loro vedono).',
      verbTranslation: 'vedere = 看见 (to see)',
      sentenceMeaning: '你们看到远处那个美丽的纪念碑了吗？',
    },
  },
  {
    id: 'ws-18',
    type: 'fill_blank',
    prompt: 'Loro (conoscere) _____ bene la città di Firenze.',
    subPrompt: 'Notebook Page 2 -ere 动词 conoscere',
    targetVerb: 'conoscere',
    pronoun: 'loro',
    correctAnswerText: 'conoscono',
    options: buildKahootOptions('conoscono', ['conosce', 'conosciamo', 'conoscano']),
    explanation: {
      rule: 'Conoscere con "loro": conosc + ono = conoscono. Significato: conoscere persone o luoghi.',
      verbTranslation: 'conoscere = 认识/了解 (to know people/places)',
      sentenceMeaning: '他们非常了解佛罗伦萨这座城市。',
    },
  },
  {
    id: 'ws-19',
    type: 'fill_blank',
    prompt: 'In cima alla pagina del quaderno hai annotato "baci -> kisses" e "piacere => like". Come si dice "我喜欢意式浓缩咖啡"?',
    subPrompt: 'Notebook Page 2 页首核心表达',
    targetVerb: 'piacere',
    correctAnswerText: 'Mi piace il caffè espresso.',
    options: buildKahootOptions('Mi piace il caffè espresso.', [
      'Io piaccio il caffè espresso.',
      'Prendo piacere il caffè.',
      'Ho piacere di caffè espresso.',
    ]),
    explanation: {
      rule: '笔记页首写道："piacere => like"。意语常用表达：Mi piace + 单数名词 (Mi piace il caffè, Mi piace la pizza)。baci 则是亲吻复数 (单数 il bacio)。',
      verbTranslation: 'piacere = 喜欢',
      sentenceMeaning: 'Mi piace il caffè espresso. (我喜欢意式浓缩咖啡。)',
    },
  },
  {
    id: 'ws-20',
    type: 'fill_blank',
    prompt: 'Nel quaderno hai annotato "conoscere = know/meet (+ ppl / place)". Quale frase è corretta?',
    subPrompt: 'Notebook Page 2 动词 conoscere 用法考查',
    targetVerb: 'conoscere',
    correctAnswerText: 'Conosco Marco e conosco bene la città di Roma.',
    options: buildKahootOptions('Conosco Marco e conosco bene la città di Roma.', [
      'Conosco parlare italiano molto bene.',
      'Conosco che ore sono adesso.',
      'Conosco cucinare la pizza.',
    ]),
    explanation: {
      rule: '笔记重点标注："conoscere + ppl / place" (用于人或地点，表示认识某人或熟悉某地)；而懂得技能或知道某事实用 sapere (如 so parlare italiano)。',
      verbTranslation: 'conoscere = 认识某人 / 熟悉某地',
      sentenceMeaning: 'Conosco Marco e conosco Roma. (我认识马可，并且我很熟悉罗马。)',
    },
  },
  {
    id: 'ws-21',
    type: 'fill_blank',
    prompt: 'Sul quaderno hai annotato per "prendere = take / get / drink". Nel contesto di un bar, cosa diciamo per "喝杯咖啡"?',
    subPrompt: 'Notebook Page 2 动词 prendere 多义性考查',
    targetVerb: 'prendere',
    correctAnswerText: 'Prendiamo un caffè!',
    options: buildKahootOptions('Prendiamo un caffè!', [
      'Beviamo solo un caffè (non si usa prendere)',
      'Facciamo un caffè al treno',
      'Mettiamo un caffè al tavolo',
    ]),
    explanation: {
      rule: '笔记明确写道：prendere = take / get / drink！在意大利酒吧里，喝咖啡最地道、最普遍的表达就是 "Prendiamo un caffè!" (我们喝杯咖啡吧！)',
      verbTranslation: 'prendere = 拿 / 乘坐 / 喝饮料',
      sentenceMeaning: 'Prendiamo un caffè al bar! (我们在酒吧喝杯咖啡吧！)',
    },
  },
  {
    id: 'ws-22',
    type: 'fill_blank',
    prompt: 'Nel quaderno accanto a "noi dormiamo" hai annotato "(my bro and I)". Completa: "Mio fratello ed io _______ sempre fino a tardi."',
    subPrompt: 'Notebook Page 3 主语代词推导',
    targetVerb: 'dormire',
    pronoun: 'noi',
    correctAnswerText: 'dormiamo',
    options: buildKahootOptions('dormiamo', ['dormono', 'dormite', 'dorme']),
    explanation: {
      rule: '笔记精髓标注：Mio fratello ed io (我哥哥/弟弟和我) = noi (我们)！因此 dormire 变位必须用 noi 的形式：dormiamo。',
      verbTranslation: 'dormire = 睡觉 (to sleep)',
      sentenceMeaning: '我兄弟和我总是睡到很晚。',
    },
  },
  {
    id: 'ws-23',
    type: 'classification',
    prompt: 'Per i verbi in -ire con -isc- (come finire), sul quaderno hai cerchiato "noi finiamo" e "voi finite" con la freccia "-> same". Cosa significa?',
    subPrompt: 'Notebook Page 3 -isc- 变位核心口诀',
    targetVerb: 'finire',
    correctAnswerText: 'noi 和 voi 变位与普通规则动词完全一样，不加 -isc-！',
    options: buildKahootOptions('noi 和 voi 变位与普通规则动词完全一样，不加 -isc-！', [
      '所有六个人称全部都要加 -isc-',
      '只有 io 和 loro 不加 -isc-',
      'noi 和 voi 的词尾变成 -iscete 和 -isciamo',
    ]),
    explanation: {
      rule: '黄金规律！笔记特意把 noi finiamo 和 voi finite 用方框圈出并标注 "-> same"：即 noi 和 voi 人称保持普通规则变化，绝不加 -isc-！(io finisco, tu finisci, lui finisce, noi finiamo, voi finite, loro finiscono)。',
      verbTranslation: 'finire = 结束 / 完成',
      sentenceMeaning: 'noi finiamo, voi finite (保持规则形式)',
    },
  },
  {
    id: 'ws-24',
    type: 'fill_blank',
    prompt: 'Nel margine sinistro del quaderno hai scritto "Capisci? understand?". A quale persona singolare si riferisce la domanda?',
    subPrompt: 'Notebook Page 3 口语高频词 capire',
    targetVerb: 'capire',
    pronoun: 'tu',
    correctAnswerText: 'tu (你: Tu capisci? 你明白了吗？)',
    options: buildKahootOptions('tu (你: Tu capisci? 你明白了吗？)', [
      'io (我)',
      'lui (他)',
      'loro (他们)',
    ]),
    explanation: {
      rule: '笔记页边标注："Capisci? understand?"。来自 -isc- 动词 capire (cap + isc + i = capisci)，专门针对 "tu" 提问："你听明白了吗？/ 你懂了吗？"。',
      verbTranslation: 'capire = 理解 / 明白',
      sentenceMeaning: 'Capisci? = Do you understand? (你听懂了吗？)',
    },
  },
];

/**
 * Generate classification questions:
 * E.g.: "A quale gruppo appartiene il verbo 'preferire'?"
 */
export function generateClassificationQuestions(): Question[] {
  const sampleVerbs = [
    { verb: 'preferire', correct: 'Verbi in -IRE (con -ISC-)', cat: 'ire_isc', expl: 'Prende -isc- al presente (io preferisco, tu preferisci...)' },
    { verb: 'partire', correct: 'Verbi in -IRE (Regolari)', cat: 'ire_regular', expl: 'È regolare (io parto, tu parti, lui parte... senza -isc-)!' },
    { verb: 'dormire', correct: 'Verbi in -IRE (Regolari)', cat: 'ire_regular', expl: 'È regolare: lui dorme, loro dormono.' },
    { verb: 'capire', correct: 'Verbi in -IRE (con -ISC-)', cat: 'ire_isc', expl: 'Prende -isc-: io capisco, tu capisci, lui capisce...' },
    { verb: 'pulire', correct: 'Verbi in -IRE (con -ISC-)', cat: 'ire_isc', expl: 'Prende -isc-: io pulisco, loro puliscono.' },
    { verb: 'aprire', correct: 'Verbi in -IRE (Regolari)', cat: 'ire_regular', expl: 'È regolare: io apro, tu apri, loro aprono.' },
    { verb: 'scrivere', correct: 'Verbi in -ERE', cat: 'ere', expl: 'Finisce in -ere: io scrivo, tu scrivi, lui scrive...' },
    { verb: 'guidare', correct: 'Verbi in -ARE', cat: 'are', expl: 'Finisce in -are: io guido, noi guidiamo...' },
    { verb: 'studiare', correct: 'Verbi in -ARE', cat: 'are', expl: 'Finisce in -are: io studio, tu studi...' },
    { verb: 'chiedere', correct: 'Verbi in -ERE', cat: 'ere', expl: 'Finisce in -ere: io chiedo, tu chiedi, lui chiede...' },
    { verb: 'finire', correct: 'Verbi in -IRE (con -ISC-)', cat: 'ire_isc', expl: 'Prende -isc-: io finisco, loro finiscono.' },
    { verb: 'sentire', correct: 'Verbi in -IRE (Regolari)', cat: 'ire_regular', expl: 'È regolare: io sento, tu senti, lui sente.' },
  ];

  const standardDistractors = [
    'Verbi in -ARE',
    'Verbi in -ERE',
    'Verbi in -IRE (Regolari)',
    'Verbi in -IRE (con -ISC-)',
  ];

  return sampleVerbs.map((item, idx) => ({
    id: `class-${idx}`,
    type: 'classification',
    prompt: `A quale categoria appartiene "${item.verb.toUpperCase()}"?`,
    subPrompt: 'Notebook 分类判断题 (-are, -ere, -ire 规则还是 -isc-?)',
    targetVerb: item.verb,
    correctAnswerText: item.correct,
    options: buildKahootOptions(
      item.correct,
      standardDistractors.filter((d) => d !== item.correct)
    ),
    explanation: {
      rule: item.expl,
      verbTranslation: `${item.verb}`,
      sentenceMeaning: `根据笔记分类：${item.verb} 属于 ${item.correct}。`,
    },
  }));
}

/**
 * Generate conjugation speedrun questions from verb list
 */
export function generateConjugationQuestions(verbs: VerbItem[]): Question[] {
  const pronouns: Array<keyof VerbItem['conjugations']> = ['io', 'tu', 'lui_lei', 'noi', 'voi', 'loro'];
  const pronounNames: Record<keyof VerbItem['conjugations'], string> = {
    io: 'io (我)',
    tu: 'tu (你)',
    lui_lei: 'lui / lei (他/她)',
    noi: 'noi (我们)',
    voi: 'voi (你们)',
    loro: 'loro (他们)',
  };

  const questions: Question[] = [];

  verbs.forEach((v, vIdx) => {
    // Pick 2 key pronouns for each verb to keep questions diverse
    const pKey1 = pronouns[(vIdx * 2) % pronouns.length];
    const pKey2 = pronouns[(vIdx * 2 + 3) % pronouns.length];

    [pKey1, pKey2].forEach((pKey, pSubIdx) => {
      const correctForm = v.conjugations[pKey];
      // Generate intelligent distractors based on other pronouns or common errors
      const distractors: string[] = [];

      // Add forms of other pronouns for this verb
      pronouns.forEach((otherP) => {
        if (otherP !== pKey) {
          distractors.push(v.conjugations[otherP]);
        }
      });

      // Special distractors for -isc- vs regular verbs
      if (v.category === 'ire_isc') {
        if (pKey === 'noi') {
          // Tricky distractor: finisciamo instead of finiamo
          const stem = v.infinitive.slice(0, -3);
          distractors.unshift(`${stem}isciamo`);
        } else if (pKey === 'voi') {
          const stem = v.infinitive.slice(0, -3);
          distractors.unshift(`${stem}iscite`);
        } else {
          // Non-isc distractor like "fino"
          const stem = v.infinitive.slice(0, -3);
          distractors.unshift(`${stem}o`);
        }
      } else if (v.category === 'ire_regular') {
        // Tricky distractor adding -isc-
        if (pKey === 'io') {
          const stem = v.infinitive.slice(0, -3);
          distractors.unshift(`${stem}isco`);
        } else if (pKey === 'lui_lei') {
          const stem = v.infinitive.slice(0, -3);
          distractors.unshift(`${stem}isce`);
        }
      }

      questions.push({
        id: `conj-${v.id}-${pKey}-${pSubIdx}`,
        type: 'conjugation',
        prompt: `Qual è la forma corretta per: ${pronounNames[pKey]} + ${v.infinitive.toUpperCase()}?`,
        subPrompt: `${v.translationZh} (${v.translationEn})`,
        targetVerb: v.infinitive,
        pronoun: pKey,
        correctAnswerText: correctForm,
        options: buildKahootOptions(correctForm, distractors),
        explanation: {
          rule: `${v.infinitive} con ${pKey}: forma corretta è "${correctForm}". Gruppo: ${v.category.replace('_', ' ')}.`,
          conjugationTable: v.conjugations,
          verbTranslation: `${v.infinitive}: ${v.translationZh} (${v.translationEn})`,
        },
      });
    });
  });

  return questions;
}

/**
 * Meaning Recognition Questions (Italian -> Chinese/English)
 */
export function generateMeaningQuestions(verbs: VerbItem[]): Question[] {
  return verbs.slice(0, 15).map((v, idx) => {
    const correctMeaning = `${v.translationZh} (${v.translationEn})`;
    const otherVerbs = verbs.filter((other) => other.id !== v.id);
    const distractors = shuffleArray(otherVerbs)
      .slice(0, 3)
      .map((o) => `${o.translationZh} (${o.translationEn})`);

    return {
      id: `mean-${idx}`,
      type: 'translation',
      prompt: `Cosa significa il verbo "${v.infinitive.toUpperCase()}"?`,
      subPrompt: 'Notebook 词汇词义匹配',
      targetVerb: v.infinitive,
      correctAnswerText: correctMeaning,
      options: buildKahootOptions(correctMeaning, distractors),
      explanation: {
        rule: `Il verbo ${v.infinitive} significa "${v.translationZh}" (${v.translationEn}).`,
        verbTranslation: `${v.infinitive}: ${v.translationZh}`,
      },
    };
  });
}

/**
 * Automatically determine question difficulty if not explicitly set
 */
export function determineQuestionDifficulty(q: Question): 'beginner' | 'intermediate' | 'advanced' {
  if (q.difficulty) return q.difficulty;

  // Passato prossimo or compound / mixed tense is advanced or intermediate
  if (q.tense === 'passato_prossimo' || q.tense === 'misto') {
    return 'advanced';
  }

  // Notebook possessive questions:
  if (q.id.startsWith('pos-')) {
    if (q.prompt.includes('loro') || q.prompt.includes('le sue sorelle') || q.prompt.includes('i suoi fratelli')) {
      return 'advanced';
    }
    if (q.prompt.includes('vostro') || q.prompt.includes('nostro') || q.prompt.includes('suo')) {
      return 'intermediate';
    }
    return 'beginner';
  }

  // Avere expressions & dates:
  if (q.id.startsWith('nb-av-') || q.id.startsWith('nb-date-') || q.id.startsWith('nb-season-')) {
    if (q.prompt.includes('ragione') || q.prompt.includes('torto') || q.prompt.includes('voglia') || q.prompt.includes('bisogno')) {
      return 'advanced';
    }
    if (q.prompt.includes('fretta') || q.prompt.includes('paura') || q.prompt.includes('primo') || q.prompt.includes('compleanno')) {
      return 'intermediate';
    }
    return 'beginner';
  }

  // Worksheet sentences:
  if (q.id.startsWith('ws-')) {
    if (q.prompt.includes('preferire') || q.prompt.includes('partire') || q.subPrompt?.includes('-isc-')) {
      return 'intermediate';
    }
    return 'beginner';
  }

  // Family questions:
  if (q.id.startsWith('fam-')) {
    if (q.prompt.includes('suocer') || q.prompt.includes('cognat') || q.prompt.includes('genero') || q.prompt.includes('nuora')) {
      return 'advanced';
    }
    if (q.prompt.includes('nipote') || q.prompt.includes('zio') || q.prompt.includes('zia') || q.prompt.includes('cugin')) {
      return 'intermediate';
    }
    return 'beginner';
  }

  // Verb conjugation questions:
  if (q.type === 'conjugation') {
    if (q.targetVerb && ['finire', 'capire', 'preferire', 'pulire', 'spedire'].includes(q.targetVerb)) {
      if (q.pronoun === 'noi' || q.pronoun === 'voi' || q.pronoun === 'loro') {
        return 'advanced';
      }
      return 'intermediate';
    }
    if (q.targetVerb && ['conoscere', 'prendere', 'scrivere', 'chiudere', 'leggere', 'spendere', 'rispondere', 'mettere'].includes(q.targetVerb)) {
      if (q.pronoun === 'loro' || q.pronoun === 'voi') {
        return 'advanced';
      }
      return 'intermediate';
    }
    if (q.pronoun === 'io' || q.pronoun === 'tu' || q.pronoun === 'noi') {
      return 'beginner';
    }
    return 'intermediate';
  }

  if (q.type === 'classification') {
    return 'intermediate';
  }

  return 'beginner';
}

/**
 * Filter questions according to user selection and difficulty level
 */
export function getQuizQuestions(
  filter: QuizCategoryFilter,
  count: number,
  difficulty: DifficultyLevel = 'all'
): Question[] {
  let pool: Question[] = [];
  const massive100 = get100FamilyQuestions();
  const allFamilyQuestions = [...FAMILY_WORKSHEET_QUESTIONS, ...massive100];

  if (filter === 'notebook_possessivi') {
    pool = [...NOTEBOOK_POSSESSIVE_QUESTIONS];
  } else if (filter === 'notebook_avere') {
    pool = [
      ...NOTEBOOK_AVERE_QUESTIONS,
      ...ADVANCED_TENSE_QUESTIONS.filter((q) => q.targetVerb === 'avere' || q.prompt.includes('avere')),
    ];
  } else if (filter === 'notebook_mesi_date') {
    pool = [...NOTEBOOK_MESI_DATE_QUESTIONS];
  } else if (filter === 'family') {
    pool = [...allFamilyQuestions];
  } else if (filter === 'notebook_vocab') {
    pool = generateVocabularyQuestions('notebook_vocab');
  } else if (filter === 'vocab_all') {
    pool = generateVocabularyQuestions();
  } else if (filter === 'vocab_cibo') {
    pool = generateVocabularyQuestions('vocab_cibo');
  } else if (filter === 'vocab_casa') {
    pool = generateVocabularyQuestions('vocab_casa');
  } else if (filter === 'vocab_contrari') {
    pool = generateVocabularyQuestions('vocab_contrari');
  } else if (filter === 'vocab_citta') {
    pool = generateVocabularyQuestions('vocab_citta');
  } else if (filter === 'notebook_sentences') {
    pool = [...NOTEBOOK_WORKSHEET_QUESTIONS];
  } else if (filter === 'are') {
    const areVerbs = VERBS_DATA.filter((v) => v.category === 'are');
    pool = [
      ...generateConjugationQuestions(areVerbs),
      ...NOTEBOOK_WORKSHEET_QUESTIONS.filter((q) => q.targetVerb && areVerbs.some((v) => v.infinitive.includes(q.targetVerb!))),
      ...generateMeaningQuestions(areVerbs),
      ...ADVANCED_TENSE_QUESTIONS.filter((q) => q.targetVerb && ['parlare', 'mangiare', 'studiare'].includes(q.targetVerb)),
    ];
  } else if (filter === 'ere') {
    const ereVerbs = VERBS_DATA.filter((v) => v.category === 'ere');
    pool = [
      ...generateConjugationQuestions(ereVerbs),
      ...NOTEBOOK_WORKSHEET_QUESTIONS.filter((q) => q.targetVerb && ereVerbs.some((v) => v.infinitive.includes(q.targetVerb!))),
      ...generateMeaningQuestions(ereVerbs),
      ...ADVANCED_TENSE_QUESTIONS.filter((q) => q.targetVerb && ['scrivere', 'prendere', 'vedere', 'leggere', 'chiudere', 'rispondere', 'mettere'].includes(q.targetVerb)),
    ];
  } else if (filter === 'ire_all') {
    const ireVerbs = VERBS_DATA.filter((v) => v.category.startsWith('ire'));
    pool = [
      ...generateConjugationQuestions(ireVerbs),
      ...generateClassificationQuestions(),
      ...NOTEBOOK_WORKSHEET_QUESTIONS.filter((q) => q.targetVerb && ireVerbs.some((v) => v.infinitive.includes(q.targetVerb!))),
      ...ADVANCED_TENSE_QUESTIONS.filter((q) => q.targetVerb && ['finire', 'dormire', 'aprire'].includes(q.targetVerb)),
    ];
  } else if (filter === 'ire_regular') {
    const ireRegVerbs = VERBS_DATA.filter((v) => v.category === 'ire_regular');
    pool = [
      ...generateConjugationQuestions(ireRegVerbs),
      ...generateClassificationQuestions().filter((q) => q.targetVerb && ireRegVerbs.some((v) => v.infinitive === q.targetVerb)),
    ];
  } else if (filter === 'ire_isc') {
    const ireIscVerbs = VERBS_DATA.filter((v) => v.category === 'ire_isc');
    pool = [
      ...generateConjugationQuestions(ireIscVerbs),
      ...generateClassificationQuestions().filter((q) => q.targetVerb && ireIscVerbs.some((v) => v.infinitive === q.targetVerb)),
    ];
  } else {
    // 'all'
    const allVocabQuestions = generateVocabularyQuestions();
    pool = [
      ...ADVANCED_TENSE_QUESTIONS,
      ...NOTEBOOK_POSSESSIVE_QUESTIONS,
      ...NOTEBOOK_AVERE_QUESTIONS,
      ...NOTEBOOK_MESI_DATE_QUESTIONS,
      ...allFamilyQuestions,
      ...allVocabQuestions,
      ...NOTEBOOK_WORKSHEET_QUESTIONS,
      ...generateClassificationQuestions(),
      ...generateConjugationQuestions(VERBS_DATA),
      ...generateMeaningQuestions(VERBS_DATA),
    ];
  }

  // Filter by difficulty if specified
  let effectivePool = pool;
  if (difficulty !== 'all') {
    const matchingQuestions = pool.filter((q) => determineQuestionDifficulty(q) === difficulty);
    if (matchingQuestions.length >= count) {
      effectivePool = matchingQuestions;
    } else if (matchingQuestions.length > 0) {
      // Prioritize matching difficulty, then backfill
      const otherQuestions = pool.filter((q) => determineQuestionDifficulty(q) !== difficulty);
      effectivePool = [...matchingQuestions, ...shuffleArray(otherQuestions)];
    }
  }

  // Shuffle pool and slice to requested count
  const shuffled = shuffleArray(effectivePool);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
