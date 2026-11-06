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
    id: `opt-poss-${index}-${Math.random().toString(36).substring(2, 7)}`,
    text: opt.text,
    shape: SHAPES[index],
    color: COLORS[index],
    isCorrect: opt.isCorrect,
  }));
}

/**
 * Handcrafted Questions on "Gli aggettivi possessivi" based on Notebook
 */
export const NOTEBOOK_POSSESSIVE_QUESTIONS: Question[] = [
  // 1. Core Rule: Article in front
  {
    id: 'pos-q-rule-article',
    type: 'classification',
    prompt: '笔记最上方核心法则：“前面要有冠词”！意大利语说“我的家”是：',
    subPrompt: '👑 笔记核心规则 1',
    correctAnswerText: 'la mia casa (必须带定冠词 la)',
    options: buildKahootOptions('la mia casa (必须带定冠词 la)', [
      'mia casa (缺少冠词)',
      'il mia casa (冠词性数错误)',
      'le mia casa (复数冠词错误)',
    ]),
    explanation: {
      rule: '笔记置顶法则：“前面要有冠词”！意大利语物主形容词通常必须加上定冠词：la mia casa (我的家)。英语说 "my house"，意语则是 "la mia casa"！',
      verbTranslation: 'la mia casa = 我的家',
      sentenceMeaning: 'La mia casa è molto accogliente. (我的家很温馨。)',
    },
  },

  // 2. Core Rule: Gender/Number follows the possessed noun
  {
    id: 'pos-q-rule-gender-match',
    type: 'classification',
    prompt: '笔记下方重点标注：“跟着名词变”！物主形容词的性数取决于什么？',
    subPrompt: '👑 笔记核心规则 2',
    correctAnswerText: '取决于被修饰的名词（所拥有的事物）',
    options: buildKahootOptions('取决于被修饰的名词（所拥有的事物）', [
      '取决于拥有者是男是女',
      '永远固定用阳性',
      '取决于动词的形式',
    ]),
    explanation: {
      rule: '笔记用大字标注：“跟着名词变”！即使物主是女生，但如果东西是阳性单数（如 libro），也必须用 il suo libro；如果东西是阴性复数（如 sorelle），用 le sue sorelle！',
      verbTranslation: '跟着名词的性数变化',
      sentenceMeaning: 'il libro di Maria -> il suo libro (跟着 libro 变)',
    },
  },

  // 3. Notebook Example 1: il libro di Maria
  {
    id: 'pos-q-libro-maria',
    type: 'fill_blank',
    prompt: '笔记真题转换：il libro di Maria (玛丽亚的书) 应该说成：',
    subPrompt: '📖 笔记真实例句转换 1',
    correctAnswerText: 'il suo libro',
    options: buildKahootOptions('il suo libro', ['la sua libro', 'i suoi libro', 'la sua libra']),
    explanation: {
      rule: '笔记例句："il libro di Maria -> il suo libro"。虽然 Maria 是女性，但 libro 是阳性单数，所以必须用阳性单数物主：il suo libro！',
      verbTranslation: 'il suo libro = 她的书',
      sentenceMeaning: 'Questo è il suo libro. (这是她的书。)',
    },
  },

  // 4. Notebook Example 2: le sorelle di Giulia
  {
    id: 'pos-q-sorelle-giulia',
    type: 'fill_blank',
    prompt: '笔记真题转换：le sorelle di Giulia (朱莉娅的姐妹们) 应该说成：',
    subPrompt: '👭 笔记真实例句转换 2',
    correctAnswerText: 'le sue sorelle',
    options: buildKahootOptions('le sue sorelle', ['i suoi sorelle', 'la sua sorelle', 'il suo sorelle']),
    explanation: {
      rule: '笔记例句："le sorelle di Giulia -> le sue sorelle"。因为 sorelle 是阴性复数名词，所以物主形容词用阴性复数：le sue sorelle！',
      verbTranslation: 'le sue sorelle = 她的姐妹们',
      sentenceMeaning: 'Le sue sorelle studiano a Roma. (她的姐妹们在罗马学习。)',
    },
  },

  // 5. Notebook Example 3: la famiglia di noi
  {
    id: 'pos-q-famiglia-noi',
    type: 'fill_blank',
    prompt: '笔记真题转换：la famiglia di noi (我们的家庭) 应该说成：',
    subPrompt: '👨‍👩‍👧‍👦 笔记真实例句转换 3',
    correctAnswerText: 'la nostra famiglia',
    options: buildKahootOptions('la nostra famiglia', ['il nostro famiglia', 'i nostri famiglia', 'le nostre famiglia']),
    explanation: {
      rule: '笔记例句："la famiglia di noi -> la nostra famiglia"。famiglia 是阴性单数名词，对应的“我们的”是 la nostra：la nostra famiglia！',
      verbTranslation: 'la nostra famiglia = 我们的家庭',
      sentenceMeaning: 'Amo la nostra famiglia. (我爱我们的家庭。)',
    },
  },

  // 6. Notebook Example 4: i nostri fratelli
  {
    id: 'pos-q-nostri-fratelli',
    type: 'fill_blank',
    prompt: '笔记例句：“我们的兄弟们 (our bros)”在意大利语中怎么说？',
    subPrompt: '👬 笔记真实短语填空',
    correctAnswerText: 'i nostri fratelli',
    options: buildKahootOptions('i nostri fratelli', ['le nostre fratelli', 'il nostro fratelli', 'i mio fratelli']),
    explanation: {
      rule: '笔记第三行："i nostri fratelli = our bros"。fratelli 是阳性复数，所以用 i nostri！',
      verbTranslation: 'i nostri fratelli = 我们的兄弟们',
      sentenceMeaning: 'I nostri fratelli giocano a calcio. (我们的兄弟们在踢足球。)',
    },
  },

  // 7. Notebook Example 5: le sue classi
  {
    id: 'pos-q-sue-classi',
    type: 'fill_blank',
    prompt: '笔记例句：“她的班级/课 (her classes)”在意大利语中怎么说？',
    subPrompt: '🏫 笔记真实短语填空',
    correctAnswerText: 'le sue classi',
    options: buildKahootOptions('le sue classi', ['i suoi classi', 'la sua classi', 'il suo classi']),
    explanation: {
      rule: '笔记第四行："le sue classi = her classes"。classe (单数阴性) -> classi (复数阴性)，所以用 le sue！',
      verbTranslation: 'le sue classi = 她的课程/班级',
      sentenceMeaning: 'Le sue classi sono molto interessanti. (她的课非常有趣。)',
    },
  },

  // 8. Loro Rule: Invariable "不变"
  {
    id: 'pos-q-loro-invariable',
    type: 'classification',
    prompt: '笔记用虚线特意框出并标注“不变”的是哪个词？',
    subPrompt: '⚡ 笔记难点核心：loro 不变',
    correctAnswerText: 'loro (词身永远不变，只变定冠词 il/i/la/le)',
    options: buildKahootOptions('loro (词身永远不变，只变定冠词 il/i/la/le)', [
      'nostro (nostro 不变)',
      'vostro (vostro 不变)',
      'suo (suo 不变)',
    ]),
    explanation: {
      rule: '笔记重点标注：loro 下方写着大字“不变”！loro 的词形不论男女单复都绝对不加 -i, -a, -e！男单 il loro, 男复 i loro, 女单 la loro, 女复 le loro！',
      verbTranslation: 'loro = 不变',
      sentenceMeaning: 'il loro cane, la loro casa, i loro libri, le loro sorelle (loro从不变形)',
    },
  },

  // 9. Loro in practice: masculine singular vs plural
  {
    id: 'pos-q-loro-plural-libri',
    type: 'fill_blank',
    prompt: '“他们的书本 (their books)”用哪个？注意 loro 不变！',
    subPrompt: '📚 loro 实际应用',
    correctAnswerText: 'i loro libri',
    options: buildKahootOptions('i loro libri', ['i lori libri (不存在lori)', 'le loro libri', 'il loro libri']),
    explanation: {
      rule: 'libri 是阳性复数，定冠词用 i，loro 保持不变：i loro libri！千万不要自作聪明写成 "lori"！',
      verbTranslation: 'i loro libri = 他们的书',
      sentenceMeaning: 'Questi sono i loro libri.',
    },
  },

  // 10. Mio / Miei / Mia / Mie
  {
    id: 'pos-q-mio-plural-masc',
    type: 'fill_blank',
    prompt: '根据笔记表格，男单是 "il mio" (my)，那“男复” (我的男朋友们/朋友们) 怎么说？',
    subPrompt: '📋 笔记表格第1行第一人称单数',
    correctAnswerText: 'i miei amici',
    options: buildKahootOptions('i miei amici', ['i mii amici', 'i mio amici', 'le mie amici']),
    explanation: {
      rule: '笔记表格第1行第一列：男 il mio，男复 i miei！例如：i miei amici (我的朋友们)，i miei genitori (我的父母)。',
      verbTranslation: 'i miei = 我的 (阳性复数)',
      sentenceMeaning: 'I miei amici sono simpatici.',
    },
  },

  // 11. Mio / Mia / Mie
  {
    id: 'pos-q-mia-plural-fem',
    type: 'fill_blank',
    prompt: '根据笔记表格，女单是 "la mia" (我的)，那“女复” (我的女钥匙们/笔们) 是：',
    subPrompt: '📋 笔记表格第1行',
    correctAnswerText: 'le mie penne',
    options: buildKahootOptions('le mie penne', ['la mia penne', 'i miei penne', 'le mia penne']),
    explanation: {
      rule: '笔记表格第1行：女 la mia -> 女复 le mie！例如：le mie chiavi (我的钥匙们)，le mie penne (我的笔们)。',
      verbTranslation: 'le mie = 我的 (阴性复数)',
      sentenceMeaning: 'Dove sono le mie penne?',
    },
  },

  // 12. Tuo / Tuoi / Tua / Tue
  {
    id: 'pos-q-tuo-table',
    type: 'fill_blank',
    prompt: '根据笔记表格第二行 (your)："il tuo" 对应的阳性复数是：',
    subPrompt: '📋 笔记表格第2行第二人称单数',
    correctAnswerText: 'i tuoi (如: i tuoi libri)',
    options: buildKahootOptions('i tuoi (如: i tuoi libri)', ['i tui', 'i tuoi amici', 'le tue']),
    explanation: {
      rule: '笔记表格第2行：il tuo (男单) - i tuoi (男复) - la tua (女单) - le tue (女复)！',
      verbTranslation: 'i tuoi = 你的 (阳性复数)',
      sentenceMeaning: 'Come stanno i tuoi genitori? (你的父母身体好吗？)',
    },
  },

  // 13. Suo / Suoi / Sua / Sue
  {
    id: 'pos-q-suo-table',
    type: 'fill_blank',
    prompt: '根据笔记表格第三行 (his/her/its)："il suo" 对应的阳性复数是：',
    subPrompt: '📋 笔记表格第3行第三人称单数',
    correctAnswerText: 'i suoi (如: i suoi fratelli)',
    options: buildKahootOptions('i suoi (如: i suoi fratelli)', ['i sui', 'i suo', 'le sue']),
    explanation: {
      rule: '笔记表格第3行：il suo (男单) - i suoi (男复) - la sua (女单) - le sue (女复)！',
      verbTranslation: 'i suoi = 他的/她的 (阳性复数)',
      sentenceMeaning: 'Marco cerca i suoi occhiali. (马可在找他的眼镜。)',
    },
  },

  // 14. Nostro / Nostri / Nostra / Nostre
  {
    id: 'pos-q-nostro-table',
    type: 'fill_blank',
    prompt: '根据笔记表格第四行 (our)："il nostro" 对应的阴性复数是：',
    subPrompt: '📋 笔记表格第4行第一人称复数',
    correctAnswerText: 'le nostre (如: le nostre case)',
    options: buildKahootOptions('le nostre (如: le nostre case)', ['i nostri', 'la nostra', 'le nostri']),
    explanation: {
      rule: '笔记表格第4行：il nostro (男单) - i nostri (男复) - la nostra (女单) - le nostre (女复)！',
      verbTranslation: 'le nostre = 我们的 (阴性复数)',
      sentenceMeaning: 'Le nostre città sono storiche. (我们的城市历史悠久。)',
    },
  },

  // 15. Vostro / Vostri / Vostra / Vostre
  {
    id: 'pos-q-vostro-table',
    type: 'fill_blank',
    prompt: '根据笔记表格第五行 (your pl.)：“你们的汽车 (car 是阴性 la macchina)”怎么说？',
    subPrompt: '📋 笔记表格第5行第二人称复数',
    correctAnswerText: 'la vostra macchina',
    options: buildKahootOptions('la vostra macchina', ['il vostro macchina', 'le vostre macchina', 'i vostri macchina']),
    explanation: {
      rule: '笔记表格第5行：macchina 是阴性单数，所以用 la vostra：la vostra macchina！',
      verbTranslation: 'la vostra macchina = 你们的汽车',
      sentenceMeaning: 'Dov\'è la vostra macchina? (你们的汽车停在哪儿？)',
    },
  },

  // 16. Context challenge: cane di Marco
  {
    id: 'pos-q-cane-marco',
    type: 'fill_blank',
    prompt: '“il cane di Marco” (马可的狗) 换成物主形容词是：',
    subPrompt: '🐶 笔记规则应用题',
    correctAnswerText: 'il suo cane',
    options: buildKahootOptions('il suo cane', ['la sua cane', 'i suoi cane', 'il loro cane']),
    explanation: {
      rule: 'cane 是阳性单数名词，第三人称单数 (Marco) 对应的阳性单数物主是 il suo：il suo cane！',
      verbTranslation: 'il suo cane = 他的狗',
      sentenceMeaning: 'Il suo cane è molto affettuoso. (他的狗非常通人性。)',
    },
  },

  // 17. Context challenge: borsa di Maria
  {
    id: 'pos-q-borsa-maria',
    type: 'fill_blank',
    prompt: '“la borsa di Maria” (玛丽亚的手提包) 换成物主形容词是：',
    subPrompt: '👜 笔记规则应用题',
    correctAnswerText: 'la sua borsa',
    options: buildKahootOptions('la sua borsa', ['il suo borsa', 'le sue borsa', 'i suoi borsa']),
    explanation: {
      rule: 'borsa 是阴性单数名词，对应的物主形容词必须用阴性单数：la sua borsa！',
      verbTranslation: 'la sua borsa = 她的包',
      sentenceMeaning: 'Maria prende la sua borsa ed esce. (玛丽亚拿起她的手提包出门了。)',
    },
  },

  // 18. Context challenge: città di loro
  {
    id: 'pos-q-citta-loro',
    type: 'fill_blank',
    prompt: '“la città di loro” (他们的城市) 换成物主形容词是：',
    subPrompt: '🌆 loro 不变规则挑战',
    correctAnswerText: 'la loro città',
    options: buildKahootOptions('la loro città', ['la lora città (lora不存在)', 'il loro città', 'le loro città']),
    explanation: {
      rule: 'città 是阴性单数，冠词用 la，而 loro 词身永远不变！所以是 la loro città！千万不能根据阴性改成 "lora"！',
      verbTranslation: 'la loro città = 他们的城市',
      sentenceMeaning: 'La loro città è molto bella. (他们的城市非常美丽。)',
    },
  },
];
