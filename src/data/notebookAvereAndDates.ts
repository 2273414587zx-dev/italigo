import { Question, KahootOption, VocabItem } from '../types/game';

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
    id: `opt-av-${index}-${Math.random().toString(36).substring(2, 7)}`,
    text: opt.text,
    shape: SHAPES[index],
    color: COLORS[index],
    isCorrect: opt.isCorrect,
  }));
}

/**
 * Vocabulary items for Mesi, Stagioni, and Avere Idioms (for VocabGuideModal & dictionary)
 */
export const NOTEBOOK_EXTRA_VOCABULARY: VocabItem[] = [
  // 12 Months
  {
    id: 'm-1',
    italian: 'gennaio',
    topic: 'mesi',
    translationZh: '一月',
    translationEn: 'January',
    gender: 'm',
    exampleSentence: 'Gennaio è il primo mese dell\'anno.',
    exampleSentenceZh: '一月是一年的第一个月。',
    notes: '手写笔记月份 1。意大利语中月份和星期首字母通常小写。',
  },
  {
    id: 'm-2',
    italian: 'febbraio',
    topic: 'mesi',
    translationZh: '二月',
    translationEn: 'February',
    gender: 'm',
    exampleSentence: 'A febbraio c\'è il famoso Carnevale di Venezia.',
    exampleSentenceZh: '在二月份有著名的威尼斯狂欢节。',
    notes: '手写笔记月份 2。一年中最短的月份。',
  },
  {
    id: 'm-3',
    italian: 'marzo',
    topic: 'mesi',
    translationZh: '三月',
    translationEn: 'March',
    gender: 'm',
    exampleSentence: 'A marzo comincia la primavera.',
    exampleSentenceZh: '三月份春天开始了。',
    notes: '手写笔记月份 3。源自战神马尔斯 (Marte)。',
  },
  {
    id: 'm-4',
    italian: 'aprile',
    topic: 'mesi',
    translationZh: '四月',
    translationEn: 'April',
    gender: 'm',
    exampleSentence: 'Il primo aprile si fa lo scherzo del pesce d\'aprile.',
    exampleSentenceZh: '四月一日人们会开愚人节玩笑（四月之鱼）。',
    notes: '手写笔记月份 4。每月一号说 "il primo aprile"。',
  },
  {
    id: 'm-5',
    italian: 'maggio',
    topic: 'mesi',
    translationZh: '五月',
    translationEn: 'May',
    gender: 'm',
    exampleSentence: 'Il primo maggio è la Festa del Lavoro.',
    exampleSentenceZh: '五月一日是国际劳动节。',
    notes: '手写笔记月份 5。每月第一天用 "il primo maggio"！',
  },
  {
    id: 'm-6',
    italian: 'giugno',
    topic: 'mesi',
    translationZh: '六月',
    translationEn: 'June',
    gender: 'm',
    exampleSentence: 'Il mio compleanno è il 13 giugno.',
    exampleSentenceZh: '我的生日是六月十三日（笔记真实例句）。',
    notes: '手写笔记月份 6。gn 发音如拼音 ni (giu-nno)。',
  },
  {
    id: 'm-7',
    italian: 'luglio',
    topic: 'mesi',
    translationZh: '七月',
    translationEn: 'July',
    gender: 'm',
    exampleSentence: 'Il 4 luglio del 1776 è una data storica.',
    exampleSentenceZh: '1776年7月4日是一个历史性的日子（笔记例句）。',
    notes: '手写笔记月份 7。源自凯撒大帝 (Julius Caesar)。gli 发音 [ʎ]。',
  },
  {
    id: 'm-8',
    italian: 'agosto',
    topic: 'mesi',
    translationZh: '八月',
    translationEn: 'August',
    gender: 'm',
    exampleSentence: 'In agosto molti italiani vanno in vacanza al mare.',
    exampleSentenceZh: '八月份很多意大利人去海边度假 (Ferragosto)。',
    notes: '手写笔记月份 8。源自罗马帝国开国皇帝奥古斯都 (Augustus)。',
  },
  {
    id: 'm-9',
    italian: 'settembre',
    topic: 'mesi',
    translationZh: '九月',
    translationEn: 'September',
    gender: 'm',
    exampleSentence: 'La scuola in Italia inizia a settembre.',
    exampleSentenceZh: '意大利的学校在九月开学。',
    notes: '手写笔记月份 9。注意古罗马历法中原为第7个月（septem = 7）。',
  },
  {
    id: 'm-10',
    italian: 'ottobre',
    topic: 'mesi',
    translationZh: '十月',
    translationEn: 'October',
    gender: 'm',
    exampleSentence: 'Oggi è il 6 ottobre.',
    exampleSentenceZh: '今天是十月六日（笔记真实例句）。',
    notes: '手写笔记月份 10。古罗马原为第8个月（octo = 8）。',
  },
  {
    id: 'm-11',
    italian: 'novembre',
    topic: 'mesi',
    translationZh: '十一月',
    translationEn: 'November',
    gender: 'm',
    exampleSentence: 'A novembre le foglie cadono dagli alberi.',
    exampleSentenceZh: '十一月树叶从树上飘落。',
    notes: '手写笔记月份 11。古罗马原为第9个月（novem = 9）。',
  },
  {
    id: 'm-12',
    italian: 'dicembre',
    topic: 'mesi',
    translationZh: '十二月',
    translationEn: 'December',
    gender: 'm',
    exampleSentence: 'Il 25 dicembre si festeggia il Natale.',
    exampleSentenceZh: '十二月二十五日庆祝圣诞节。',
    notes: '手写笔记月份 12。一年中最后一个月。',
  },

  // 4 Seasons
  {
    id: 'st-1',
    italian: 'la primavera',
    topic: 'mesi',
    translationZh: '春天 / 春季',
    translationEn: 'spring',
    gender: 'f',
    exampleSentence: 'In primavera fioriscono tutti i fiori.',
    exampleSentenceZh: '春天里百花盛开。',
    notes: '手写笔记四季 1。阴性名词，定冠词用 la primavera。',
  },
  {
    id: 'st-2',
    italian: "l'estate",
    topic: 'mesi',
    translationZh: '夏天 / 夏季',
    translationEn: 'summer',
    gender: 'f',
    exampleSentence: 'In estate andiamo in vacanza al mare.',
    exampleSentenceZh: '夏天我们去海边度假。',
    notes: '手写笔记四季 2。阴性名词，定冠词缩合为 l\'estate。',
  },
  {
    id: 'st-3',
    italian: "l'autunno",
    topic: 'mesi',
    translationZh: '秋天 / 秋季',
    translationEn: 'autumn / fall',
    gender: 'm',
    exampleSentence: 'In autunno il tempo diventa più fresco.',
    exampleSentenceZh: '秋天天气变得更加凉爽。',
    notes: '手写笔记四季 3。阳性名词，以元音开头用 l\'autunno。',
  },
  {
    id: 'st-4',
    italian: "l'inverno",
    topic: 'mesi',
    translationZh: '冬天 / 冬季',
    translationEn: 'winter',
    gender: 'm',
    exampleSentence: 'In inverno fa molto freddo e spesso nevica.',
    exampleSentenceZh: '冬天非常寒冷，而且经常下雪。',
    notes: '手写笔记四季 4。阳性名词，以元音开头用 l\'inverno。',
  },

  // AVERE Idioms
  {
    id: 'av-id-1',
    italian: 'avere bisogno di',
    topic: 'avere_idioms',
    translationZh: '需要...',
    translationEn: 'to need',
    exampleSentence: 'Ho bisogno di un caffè per svegliarmi.',
    exampleSentenceZh: '我需要一杯咖啡来提神。',
    notes: '手写笔记固定表达 1：avere bisogno di + 名词/动词原形。',
  },
  {
    id: 'av-id-2',
    italian: 'avere caldo',
    topic: 'avere_idioms',
    translationZh: '觉得热 / 感到热',
    translationEn: 'to be warm / hot',
    opposite: 'avere freddo',
    exampleSentence: 'In estate ho molto caldo.',
    exampleSentenceZh: '在夏天我觉得非常热。',
    notes: '手写笔记固定表达 2：⚠️ 意语必须用 avere caldo（不用 essere caldo）！',
  },
  {
    id: 'av-id-3',
    italian: 'avere freddo',
    topic: 'avere_idioms',
    translationZh: '觉得冷 / 感到冷',
    translationEn: 'to be cold',
    opposite: 'avere caldo',
    exampleSentence: 'Chiudi la finestra, ho freddo!',
    exampleSentenceZh: '关上窗户，我很冷！',
    notes: '手写笔记固定表达 3：⚠️ 意语人觉得冷用 avere freddo。',
  },
  {
    id: 'av-id-4',
    italian: 'avere fretta',
    topic: 'avere_idioms',
    translationZh: '匆忙 / 赶时间 / 着急',
    translationEn: 'to be in a hurry',
    exampleSentence: 'Devo correre alla stazione perché ho fretta.',
    exampleSentenceZh: '我必须跑去火车站，因为我很赶时间。',
    notes: '手写笔记固定表达 4：fretta 是阴性名词，意为匆忙。',
  },
  {
    id: 'av-id-5',
    italian: 'avere paura (di)',
    topic: 'avere_idioms',
    translationZh: '害怕... / 恐惧...',
    translationEn: 'to be afraid (of)',
    exampleSentence: 'Il bambino ha paura del buio.',
    exampleSentenceZh: '小孩子害怕黑暗。',
    notes: '手写笔记固定表达 5：avere paura di qualcosa (害怕某事物)。',
  },
  {
    id: 'av-id-6',
    italian: 'avere ragione',
    topic: 'avere_idioms',
    translationZh: '有道理 / 是对的',
    translationEn: 'to be right / correct',
    opposite: 'avere torto',
    exampleSentence: 'Hai ragione tu, la risposta corretta è la A.',
    exampleSentenceZh: '你有道理/你说得对，正确答案是A。',
    notes: '手写笔记固定表达 6：反义短语 avere torto。',
  },
  {
    id: 'av-id-7',
    italian: 'avere torto',
    topic: 'avere_idioms',
    translationZh: '错了 / 没道理 / 理亏',
    translationEn: 'to be wrong',
    opposite: 'avere ragione',
    exampleSentence: 'Non gridare, sai benissimo di avere torto.',
    exampleSentenceZh: '别嚷嚷了，你心里很清楚是你错了。',
    notes: '手写笔记固定表达 7：反义短语 avere ragione。',
  },
  {
    id: 'av-id-8',
    italian: 'avere sete',
    topic: 'avere_idioms',
    translationZh: '口渴 / 想喝水',
    translationEn: 'to be thirsty',
    exampleSentence: 'Dopo la corsa ho molta sete, vorrei dell\'acqua.',
    exampleSentenceZh: '跑步之后我非常口渴，想要喝点水。',
    notes: '手写笔记固定表达 8：注意表示口渴用 avere sete。',
  },
  {
    id: 'av-id-9',
    italian: 'avere fame',
    topic: 'avere_idioms',
    translationZh: '饥饿 / 肚子饿',
    translationEn: 'to be hungry',
    exampleSentence: 'A mezzogiorno ho sempre molta fame.',
    exampleSentenceZh: '中午我总是非常饿。',
    notes: '手写笔记固定表达 9：注意表示肚子饿用 avere fame。',
  },
  {
    id: 'av-id-10',
    italian: 'avere sonno',
    topic: 'avere_idioms',
    translationZh: '困倦 / 想睡觉',
    translationEn: 'to be sleepy',
    exampleSentence: 'È tardi, ho sonno e vado a letto.',
    exampleSentenceZh: '太晚了，我好困，要上床睡了。',
    notes: '手写笔记固定表达 10：sonno 意为睡意。',
  },
  {
    id: 'av-id-11',
    italian: 'avere voglia di',
    topic: 'avere_idioms',
    translationZh: '渴望做某事 / 想做...',
    translationEn: 'to feel like / to want to',
    exampleSentence: 'Stasera ho voglia di mangiare una pizza margherita.',
    exampleSentenceZh: '今晚我很想吃一份玛格丽特披萨。',
    notes: '手写笔记固定表达 11：avere voglia di + 动词原形。',
  },
  {
    id: 'nb-baci',
    italian: 'i baci',
    topic: 'notebook',
    translationZh: '亲吻 / 吻 (复数)',
    translationEn: 'kisses',
    gender: 'm',
    plural: 'i baci (单数: il bacio)',
    exampleSentence: 'Ti mando tanti baci!',
    exampleSentenceZh: '我送给你许多个亲吻！（信末常用问候语）',
    notes: '手写笔记页首标注：baci -> kisses。单数是 il bacio。',
  },
  {
    id: 'nb-piacere',
    italian: 'piacere',
    topic: 'notebook',
    translationZh: '喜欢 / 取悦 (很高兴认识你)',
    translationEn: 'to like / pleasure',
    exampleSentence: 'Mi piace molto studiare la lingua italiana.',
    exampleSentenceZh: '我非常喜欢学习意大利语。',
    notes: '手写笔记页首标注：piacere => like。日常表达：Mi piace (我喜欢), Piacere! (初次见面很高兴认识你)。',
  },
];

/**
 * Dedicated Handcrafted Questions for Verb AVERE
 */
export const NOTEBOOK_AVERE_QUESTIONS: Question[] = [
  // 1. Silent H rule
  {
    id: 'av-q-h-silent',
    type: 'conjugation',
    prompt: 'Nella lingua italiana, come si pronuncia la lettera "H" nelle forme di avere (ho, hai, ha, hanno)?',
    subPrompt: '🔊 笔记置顶发音规则 · La lettera "H"',
    correctAnswerText: 'La "H" è SEMPRE muta (永远不发音，如 "ho" 读 [o])',
    options: buildKahootOptions('La "H" è SEMPRE muta (永远不发音，如 "ho" 读 [o])', [
      'Si pronuncia aspirata come in inglese (h 呼气出声)',
      'Si pronuncia dura come la "c" [k]',
      'Si pronuncia solo quando è all\'inizio di parola',
    ]),
    explanation: {
      rule: '笔记明确注明：h 不发音！在意大利语中 "H" 是哑音字母（la lettera muta）。ho 读作 [o]，hai 读作 [ai]，ha 读作 [a]，hanno 读作 [àn-no]。',
      verbTranslation: 'avere: 有 / 拥有',
      sentenceMeaning: '发音规律：ho [o], hai [ai], ha [a], hanno [anno]',
    },
  },

  // 2. Conjugation: io
  {
    id: 'av-q-conj-io',
    type: 'conjugation',
    prompt: 'Io (avere) _______ un libro interessante.',
    subPrompt: 'Notebook to have · io 人称变位',
    targetVerb: 'avere',
    pronoun: 'io',
    correctAnswerText: 'ho',
    options: buildKahootOptions('ho', ['hai', 'ha', 'abbiamo']),
    explanation: {
      rule: 'Con il pronome "io", il verbo avere si coniuga in "ho" (con la h muta).',
      verbTranslation: 'io ho = 我有',
      sentenceMeaning: 'Io ho un libro interessante. (我有一本有趣的书。)',
    },
  },

  // 3. Conjugation: tu
  {
    id: 'av-q-conj-tu',
    type: 'conjugation',
    prompt: 'Tu (avere) _______ una macchina nuova?',
    subPrompt: 'Notebook to have · tu 人称变位',
    targetVerb: 'avere',
    pronoun: 'tu',
    correctAnswerText: 'hai',
    options: buildKahootOptions('hai', ['ho', 'ha', 'avete']),
    explanation: {
      rule: 'Con il pronome "tu", il verbo avere si coniuga in "hai".',
      verbTranslation: 'tu hai = 你有',
      sentenceMeaning: 'Tu hai una macchina nuova? (你有一辆新车吗？)',
    },
  },

  // 4. Conjugation: lui/lei
  {
    id: 'av-q-conj-lui',
    type: 'conjugation',
    prompt: 'Marco (avere) _______ un cane molto carino.',
    subPrompt: 'Notebook to have · lui/lei 人称变位',
    targetVerb: 'avere',
    pronoun: 'lui_lei',
    correctAnswerText: 'ha',
    options: buildKahootOptions('ha', ['ho', 'hai', 'hanno']),
    explanation: {
      rule: 'Con "lui / lei / Marco", il verbo avere si coniuga in "ha".',
      verbTranslation: 'lui ha = 他有',
      sentenceMeaning: 'Marco ha un cane molto carino. (马可有一只非常可爱的狗。)',
    },
  },

  // 5. Conjugation: noi
  {
    id: 'av-q-conj-noi',
    type: 'conjugation',
    prompt: 'Noi (avere) _______ una grande casa in città.',
    subPrompt: 'Notebook to have · noi 人称变位',
    targetVerb: 'avere',
    pronoun: 'noi',
    correctAnswerText: 'abbiamo',
    options: buildKahootOptions('abbiamo', ['avete', 'hanno', 'abbia']),
    explanation: {
      rule: 'Con "noi", il verbo avere fa "abbiamo" (con doppia b: bb!).',
      verbTranslation: 'noi abbiamo = 我们有',
      sentenceMeaning: 'Noi abbiamo una grande casa. (我们在城里有一套大房子。)',
    },
  },

  // 6. Conjugation: voi
  {
    id: 'av-q-conj-voi',
    type: 'conjugation',
    prompt: 'Voi (avere) _______ tempo per un caffè?',
    subPrompt: 'Notebook to have · voi 人称变位',
    targetVerb: 'avere',
    pronoun: 'voi',
    correctAnswerText: 'avete',
    options: buildKahootOptions('avete', ['abbiamo', 'hanno', 'avetei']),
    explanation: {
      rule: 'Con il pronome "voi", il verbo avere si coniuga in "avete".',
      verbTranslation: 'voi avete = 你们有',
      sentenceMeaning: 'Voi avete tempo? (你们有时间吗？)',
    },
  },

  // 7. Conjugation: loro
  {
    id: 'av-q-conj-loro',
    type: 'conjugation',
    prompt: 'I miei amici (avere) _______ molta fretta.',
    subPrompt: 'Notebook to have · loro 人称变位',
    targetVerb: 'avere',
    pronoun: 'loro',
    correctAnswerText: 'hanno',
    options: buildKahootOptions('hanno', ['ha', 'abbiamo', 'avete']),
    explanation: {
      rule: 'Con "loro / i miei amici", il verbo avere fa "hanno" (con la h muta e doppia n: nn!).',
      verbTranslation: 'loro hanno = 他们有',
      sentenceMeaning: 'I miei amici hanno molta fretta. (我的朋友们非常赶时间。)',
    },
  },

  // 8. Asking age
  {
    id: 'av-q-age-ask',
    type: 'fill_blank',
    prompt: 'Come si chiede l\'età a una persona in italiano? (笔记真实问答)',
    subPrompt: '🎂 问年龄固定句型',
    correctAnswerText: 'Quanti anni hai?',
    options: buildKahootOptions('Quanti anni hai?', [
      'Come sei vecchio?',
      'Che anni sei?',
      'Quanto tempo hai?',
    ]),
    explanation: {
      rule: '笔记例句："Quanti anni hai?" (你几岁？直译：你有多少年岁？)。注意意语问年龄用 avere，不用 essere！',
      verbTranslation: 'Quanti anni hai?',
      sentenceMeaning: 'Quanti anni hai? (你几岁了？)',
    },
  },

  // 9. Answering age (19 years old from notebook)
  {
    id: 'av-q-age-reply',
    type: 'fill_blank',
    prompt: 'Completa la risposta dal quaderno: "Io _______ diciannove anni."',
    subPrompt: '🎂 笔记回答年龄真题',
    correctAnswerText: 'ho',
    options: buildKahootOptions('ho', ['sono', 'ha', 'faccio']),
    explanation: {
      rule: '笔记真实例句："Io ho diciannove anni." (我19岁)。意语表达年龄必须用动词 avere (io ho ... anni)，千万不要用 sono！',
      verbTranslation: 'avere ... anni = 多少岁',
      sentenceMeaning: 'Io ho diciannove anni. (我今年19岁。)',
    },
  },

  // 10. Idiom: avere bisogno di
  {
    id: 'av-q-id-bisogno',
    type: 'vocabulary',
    prompt: 'Nel quaderno hai scritto "avere _______ di = need": che parola manca?',
    subPrompt: '💡 AVERE 固定短语填空',
    correctAnswerText: 'bisogno',
    options: buildKahootOptions('bisogno', ['voglia', 'ragione', 'fretta']),
    explanation: {
      rule: 'avere bisogno di = 需要 (to need)。例句：Ho bisogno di studiare italiano.',
      verbTranslation: 'avere bisogno di = 需要',
      sentenceMeaning: 'Ho bisogno di aiuto. (我需要帮助。)',
    },
  },

  // 11. Idiom: avere caldo vs freddo
  {
    id: 'av-q-id-caldo-freddo',
    type: 'vocabulary',
    prompt: 'In estate in Italia fa caldissimo: io non dico "sono caldo", ma dico: "_______".',
    subPrompt: '🌡️ 生理感觉 · 冷与热表达',
    correctAnswerText: 'ho caldo',
    options: buildKahootOptions('ho caldo', ['sono caldo', 'faccio caldo', 'sto caldo']),
    explanation: {
      rule: '意大利语中人感到冷热要用 avere：ho caldo (我觉得热), ho freddo (我觉得冷)。"Sono caldo" 是严重语病！',
      verbTranslation: 'avere caldo / avere freddo',
      sentenceMeaning: 'Ho caldo, accendiamo l\'aria condizionata. (我很热，开空调吧。)',
    },
  },

  // 12. Idiom: avere fretta
  {
    id: 'av-q-id-fretta',
    type: 'vocabulary',
    prompt: 'Cosa significa la frase del quaderno "avere fretta"?',
    subPrompt: '🏃 AVERE 固定短语释义',
    correctAnswerText: '赶时间 / 匆忙 (to be in a hurry)',
    options: buildKahootOptions('赶时间 / 匆忙 (to be in a hurry)', [
      '感到口渴 (to be thirsty)',
      '害怕某事物 (to be afraid)',
      '感觉很冷 (to be cold)',
    ]),
    explanation: {
      rule: 'avere fretta = 赶时间 / 匆忙 (to be in a hurry)。例句：Devo scappare, ho molta fretta!',
      verbTranslation: 'avere fretta = 赶时间',
      sentenceMeaning: 'Ho fretta! (我赶时间！)',
    },
  },

  // 13. Idiom: avere ragione vs torto
  {
    id: 'av-q-id-ragione-torto',
    type: 'vocabulary',
    prompt: 'Qual è il contrario di "avere ragione" (有道理 / 是对的)?',
    subPrompt: '⚡ 笔记短语反义词考查',
    correctAnswerText: 'avere torto (错了 / 没道理)',
    options: buildKahootOptions('avere torto (错了 / 没道理)', [
      'avere paura (害怕)',
      'avere fame (饥饿)',
      'avere sonno (困倦)',
    ]),
    explanation: {
      rule: '笔记中的反义短语对：avere ragione (有理/正确) ↔ avere torto (无理/犯错)。',
      verbTranslation: 'avere ragione ↔ avere torto',
      sentenceMeaning: 'Hai ragione tu, io ho torto. (你是对的，我错了。)',
    },
  },

  // 14. Idiom: avere fame / sete / sonno
  {
    id: 'av-q-id-fame-sete-sonno',
    type: 'vocabulary',
    prompt: 'È mezzanotte e non riesco a tenere gli occhi aperti. Io dico: "_______"!',
    subPrompt: '😴 生理生理需求表达',
    correctAnswerText: 'Ho sonno (我很困 / 想睡了)',
    options: buildKahootOptions('Ho sonno (我很困 / 想睡了)', [
      'Ho fame (我肚子饿)',
      'Ho sete (我口渴)',
      'Ho paura (我害怕)',
    ]),
    explanation: {
      rule: 'avere sonno = 困倦 / 想睡；avere fame = 肚子饿；avere sete = 口渴。',
      verbTranslation: 'avere sonno = 困倦',
      sentenceMeaning: 'Ho sonno, buonanotte! (我困了，晚安！)',
    },
  },

  // 15. Idiom: avere voglia di
  {
    id: 'av-q-id-voglia',
    type: 'vocabulary',
    prompt: 'Nel quaderno hai annotato "voglia (di + v.) = to feel like". Come si dice "我很想吃冰淇淋"?',
    subPrompt: '🍨 笔记语法应用',
    correctAnswerText: 'Ho voglia di mangiare un gelato.',
    options: buildKahootOptions('Ho voglia di mangiare un gelato.', [
      'Sono voglia mangiare un gelato.',
      'Faccio voglia di gelato.',
      'Ho bisogno di gelato mangiare.',
    ]),
    explanation: {
      rule: 'avere voglia di + 动词原形 = 渴望/想要做某事 (to feel like doing something)。',
      verbTranslation: 'avere voglia di = 渴望/想做某事',
      sentenceMeaning: 'Ho voglia di viaggiare. (我很想去旅行。)',
    },
  },
];

/**
 * Dedicated Handcrafted Questions for Mesi, Stagioni, and Date
 */
export const NOTEBOOK_MESI_DATE_QUESTIONS: Question[] = [
  // 1. Ordinal for day 1
  {
    id: 'dt-q-first-day',
    type: 'fill_blank',
    prompt: '每月 1 号在意大利语中必须怎么说？(例如 5月1日，笔记红框重点标注)',
    subPrompt: '📅 笔记 1 号专属表达法则',
    correctAnswerText: 'il primo (如: il primo maggio)',
    options: buildKahootOptions('il primo (如: il primo maggio)', [
      'il uno (错误用法)',
      'un maggio (缺少定冠词)',
      'l\'uno (错误用法)',
    ]),
    explanation: {
      rule: '笔记明确写道：“每月1号用 il primo，2号以后用基数词”！5月1日必须说 "il primo maggio"，绝不能说 "il uno"！',
      verbTranslation: 'il primo = 第一天',
      sentenceMeaning: 'Il primo maggio è la festa dei lavoratori.',
    },
  },

  // 2. Cardinal for day 2 onwards
  {
    id: 'dt-q-cardinal-days',
    type: 'fill_blank',
    prompt: '根据笔记：除 1 号用 il primo 之外，2 号及以后的日期怎么说？',
    subPrompt: '📅 笔记日期规律',
    correctAnswerText: 'il + 普通数字 (如: il 2, il 13)',
    options: buildKahootOptions('il + 普通数字 (如: il 2, il 13)', [
      '序数词 (il secondo, il terzo)',
      '不加冠词 (只说数字)',
      '复数冠词 (i 2, i 13)',
    ]),
    explanation: {
      rule: '从2号开始，直接用定冠词 il 加上普通基数数字：il 2 giugno, il 13 giugno, il 25 dicembre。',
      verbTranslation: 'la data = 日期',
      sentenceMeaning: 'Il 13 giugno è il mio compleanno.',
    },
  },

  // 3. Asking birthday
  {
    id: 'dt-q-ask-birthday',
    type: 'fill_blank',
    prompt: '意大利语怎么问“你的生日是什么时候？” (笔记真实问答句)',
    subPrompt: '🎂 问生日固定句型',
    correctAnswerText: 'Quando è il tuo compleanno?',
    options: buildKahootOptions('Quando è il tuo compleanno?', [
      'Qual è il tuo giorno nato?',
      'Che data sei nata?',
      'Come è il tuo compleanno?',
    ]),
    explanation: {
      rule: '笔记例句："Quando è il tuo compleanno?" (你的生日在什么时候？)。',
      verbTranslation: 'il compleanno: 生日',
      sentenceMeaning: 'Quando è il tuo compleanno? - Il mio compleanno è il 13 giugno.',
    },
  },

  // 4. Answering birthday from notebook
  {
    id: 'dt-q-reply-birthday',
    type: 'fill_blank',
    prompt: '完成笔记中的回答：“我的生日是6月13日”：Il mio compleanno è _______',
    subPrompt: '🎂 笔记回答生日真题',
    correctAnswerText: 'il 13 giugno',
    options: buildKahootOptions('il 13 giugno', ['in 13 giugno', 'a 13 giugno', 'il tredicesimo']),
    explanation: {
      rule: '笔记答案："Il mio compleanno è il 13 giugno."。说具体某天用定冠词 il + 数字 + 月份。',
      verbTranslation: 'giugno: 六月',
      sentenceMeaning: 'Il mio compleanno è il 13 giugno.',
    },
  },

  // 5. Asking today\'s date
  {
    id: 'dt-q-ask-date',
    type: 'fill_blank',
    prompt: '笔记中“问今天几号”的固定问句是：_______ la data oggi?',
    subPrompt: '📅 问今天的日期',
    correctAnswerText: 'Qual è',
    options: buildKahootOptions('Qual è', ['Che è', 'Come è', 'Quando è']),
    explanation: {
      rule: '笔记真题："Qual è la data oggi?" (今天几号/今天是几号？)。注意 "Qual è" 不加省撇。',
      verbTranslation: 'Qual è la data oggi?',
      sentenceMeaning: 'Qual è la data oggi? - Il 6 ottobre.',
    },
  },

  // 6. Answering today\'s date from notebook
  {
    id: 'dt-q-reply-date',
    type: 'fill_blank',
    prompt: '回答今天日期“10月6日”，笔记里的标准意大利语是：',
    subPrompt: '📅 笔记回答日期真题',
    correctAnswerText: 'Il 6 ottobre',
    options: buildKahootOptions('Il 6 ottobre', ['A 6 ottobre', 'In 6 ottobre', 'Il sesto ottobre']),
    explanation: {
      rule: '笔记回答：Il 6 ottobre (10月6日)。日期前用定冠词 "il"。',
      verbTranslation: 'ottobre: 十月',
      sentenceMeaning: 'Oggi è il 6 ottobre.',
    },
  },

  // 7. Month order: 7th month
  {
    id: 'dt-q-month-luglio',
    type: 'vocabulary',
    prompt: '一年中的第 7 个月（七月，源自凯撒大帝 Julius Caesar）是？',
    subPrompt: '🏛️ 笔记月份典故',
    correctAnswerText: 'luglio (七月)',
    options: buildKahootOptions('luglio (七月)', ['giugno (六月)', 'agosto (八月)', 'maggio (五月)']),
    explanation: {
      rule: '笔记在第7个月注明："7 Julius Caesar" = luglio (七月)！',
      verbTranslation: 'luglio = 七月',
      sentenceMeaning: 'Il 4 luglio del 1776.',
    },
  },

  // 8. Month order: 8th month
  {
    id: 'dt-q-month-agosto',
    type: 'vocabulary',
    prompt: '一年中的第 8 个月（八月，源自罗马皇帝 Augustus）是？',
    subPrompt: '🏛️ 笔记月份典故',
    correctAnswerText: 'agosto (八月)',
    options: buildKahootOptions('agosto (八月)', ['luglio (七月)', 'settembre (九月)', 'ottobre (十月)']),
    explanation: {
      rule: '笔记在第8个月注明："8 Augustus (罗马帝国皇帝)" = agosto (八月)！',
      verbTranslation: 'agosto = 八月',
      sentenceMeaning: 'In agosto si festeggia Ferragosto.',
    },
  },

  // 9. Season: Spring
  {
    id: 'dt-q-season-primavera',
    type: 'vocabulary',
    prompt: '笔记四季词汇中，表示“春天 / 春季 (Spring)”的是哪个词？',
    subPrompt: '🌸 笔记四季识别',
    correctAnswerText: 'la primavera',
    options: buildKahootOptions('la primavera', ['l\'estate', 'l\'autunno', 'l\'inverno']),
    explanation: {
      rule: '笔记记录：la primavera = 春天 (Spring)。以 -a 结尾的阴性名词，定冠词用 la。',
      verbTranslation: 'la primavera: 春天',
      sentenceMeaning: 'In primavera fioriscono i fiori.',
    },
  },

  // 10. Season: Summer
  {
    id: 'dt-q-season-estate',
    type: 'vocabulary',
    prompt: '笔记四季词汇中，表示“夏天 / 夏季 (Summer)”的是哪个词？',
    subPrompt: '☀️ 笔记四季识别',
    correctAnswerText: 'l\'estate',
    options: buildKahootOptions('l\'estate', ['la primavera', 'l\'inverno', 'l\'autunno']),
    explanation: {
      rule: '笔记记录：l\'estate = 夏天 (Summer)。阴性名词，因元音开头定冠词缩写为 l\'estate。',
      verbTranslation: 'l\'estate: 夏天',
      sentenceMeaning: 'In estate andiamo al mare.',
    },
  },

  // 11. Season: Winter
  {
    id: 'dt-q-season-inverno',
    type: 'vocabulary',
    prompt: '笔记四季词汇中，表示“冬天 / 冬季 (Winter)”的是哪个词？',
    subPrompt: '❄️ 笔记四季识别',
    correctAnswerText: 'l\'inverno',
    options: buildKahootOptions('l\'inverno', ['l\'estate', 'la primavera', 'l\'autunno']),
    explanation: {
      rule: '笔记记录：l\'inverno = 冬天 (Winter)。阳性名词，以元音开头缩写为 l\'inverno。',
      verbTranslation: 'l\'inverno: 冬天',
      sentenceMeaning: 'In inverno fa molto freddo.',
    },
  },

  // 12. Season: Autumn
  {
    id: 'dt-q-season-autunno',
    type: 'vocabulary',
    prompt: '笔记四季词汇中，表示“秋天 / 秋季 (Autumn)”的是哪个词？',
    subPrompt: '🍂 笔记四季识别',
    correctAnswerText: 'l\'autunno',
    options: buildKahootOptions('l\'autunno', ['la primavera', 'l\'estate', 'l\'inverno']),
    explanation: {
      rule: '笔记记录：l\'autunno = 秋天 (Autumn/Fall)。阳性名词，以元音开头缩写为 l\'autunno。',
      verbTranslation: 'l\'autunno: 秋天',
      sentenceMeaning: 'In autunno cadono le foglie.',
    },
  },

  // 13. Complete Date writing formula
  {
    id: 'dt-q-formula-date',
    type: 'fill_blank',
    prompt: '根据笔记“日期写法公式”，意大利语日期的正确书写顺序是？',
    subPrompt: '📝 笔记日期书写公式',
    correctAnswerText: '先写“日”，再写“月” (如: il 4 luglio)',
    options: buildKahootOptions('先写“日”，再写“月” (如: il 4 luglio)', [
      '先写“月”，再写“日” (如: il luglio 4)',
      '先写“年”，再写“日” (如: del 1776 il 4)',
      '只写数字，不写月份',
    ]),
    explanation: {
      rule: '笔记公式：“il + 日 + 月 (+ del + 年)”。必须先写几号，再写几月！例如：il 4 luglio (del 1776) 或 il 9/10/2026。',
      verbTranslation: 'la data: 日期格式',
      sentenceMeaning: 'il 4 luglio del 1776',
    },
  },
];
