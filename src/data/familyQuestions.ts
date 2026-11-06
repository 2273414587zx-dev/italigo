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
    id: `fam-opt-${index}-${Math.random().toString(36).substring(2, 7)}`,
    text: opt.text,
    shape: SHAPES[index],
    color: COLORS[index],
    isCorrect: opt.isCorrect,
  }));
}

/**
 * Family Relationships (Parentela) Questions from Worksheet image_fda04a1b.png
 */
export const FAMILY_WORKSHEET_QUESTIONS: Question[] = [
  // 1. Il fratello di mia madre
  {
    id: 'fam-1',
    type: 'family_relation',
    prompt: 'Il fratello di mia madre è mio _____.',
    subPrompt: '亲属关系真题 1 (The brother of my mother is my...)',
    correctAnswerText: 'zio',
    options: buildKahootOptions('zio', ['cugino', 'nonno', 'nipote']),
    explanation: {
      rule: 'In italiano, il fratello della madre o del padre è lo "zio" (舅舅 / 叔叔 / 伯父). Femminile: zia (阿姨/姑姑).',
      verbTranslation: 'zio = 舅舅 / 叔叔 (uncle)',
      sentenceMeaning: '我母亲的兄弟是我的舅舅（zio）。',
    },
  },

  // 2. La mamma di mio padre
  {
    id: 'fam-2',
    type: 'family_relation',
    prompt: 'La mamma di mio padre è mia _____.',
    subPrompt: '亲属关系真题 2 (The mother of my father is my...)',
    correctAnswerText: 'nonna',
    options: buildKahootOptions('nonna', ['zia', 'sorella', 'mamma']),
    explanation: {
      rule: 'La madre del padre o della madre è la "nonna" (奶奶 / 外婆 / 祖母). Maschile: nonno (爷爷/外公). Plurale: i nonni (祖父母们).',
      verbTranslation: 'nonna = 奶奶 / 外婆 (grandmother)',
      sentenceMeaning: '我父亲的妈妈是我的奶奶（nonna）。',
    },
  },

  // 3. Il padre e la madre di me ed i miei fratelli
  {
    id: 'fam-3',
    type: 'family_relation',
    prompt: 'Il padre e la madre di me ed i miei fratelli sono i nostri _____.',
    subPrompt: '亲属关系真题 3 (The father and mother of my siblings and me...)',
    correctAnswerText: 'genitori',
    options: buildKahootOptions('genitori', ['nonni', 'parenti', 'zii']),
    explanation: {
      rule: 'In italiano "il padre e la madre" insieme si chiamano "i genitori" (父母，注意不是 relatives 而是 parents). "I parenti" significa 亲戚 (relatives).',
      verbTranslation: 'genitori = 父母 (parents)',
      sentenceMeaning: '我和我兄弟姐妹的父亲和母亲是我们的父母（genitori）。',
    },
  },

  // 4. I figli di mia sorella
  {
    id: 'fam-4',
    type: 'family_relation',
    prompt: 'I figli di mia sorella sono i miei _____.',
    subPrompt: '亲属关系真题 4 (The children of my sister are my...)',
    correctAnswerText: 'nipoti',
    options: buildKahootOptions('nipoti', ['figli', 'cugini', 'fratelli']),
    explanation: {
      rule: 'Attenzione! In italiano "nipote/nipoti" indica sia 孙子/孙女 (grandchild)，也表示 侄子/外甥 (nephew/niece). I figli di una sorella sono i "nipoti"!',
      verbTranslation: 'nipoti = 侄子们 / 外甥们 (nephews/nieces/grandchildren)',
      sentenceMeaning: '我姐妹的孩子们是我的外甥/侄子们（nipoti）。',
    },
  },

  // 5. La figlia di mio papà
  {
    id: 'fam-5',
    type: 'family_relation',
    prompt: 'La figlia di mio papà è mia _____.',
    subPrompt: '亲属关系真题 5 (The daughter of my dad is my...)',
    correctAnswerText: 'sorella',
    options: buildKahootOptions('sorella', ['cugina', 'zia', 'mamma']),
    explanation: {
      rule: 'La figlia di proprio padre o madre è la "sorella" (姐妹). Maschile: fratello (兄弟).',
      verbTranslation: 'sorella = 姐妹 (sister)',
      sentenceMeaning: '我爸爸的女儿是我的姐妹（sorella）。',
    },
  },

  // 6. La _____ di mio padre è mia mamma
  {
    id: 'fam-6',
    type: 'family_relation',
    prompt: 'La _____ di mio padre è mia mamma.',
    subPrompt: '亲属关系真题 6 (The ... of my father is my mom)',
    correctAnswerText: 'moglie',
    options: buildKahootOptions('moglie', ['sorella', 'madre', 'figlia']),
    explanation: {
      rule: 'La compagna sposata del padre è la sua "moglie" (妻子). Maschile: marito (丈夫). Quindi: "La moglie di mio padre è mia mamma".',
      verbTranslation: 'moglie = 妻子 (wife)',
      sentenceMeaning: '我父亲的妻子（moglie）是我妈妈。',
    },
  },

  // 7. Mio fratello ed io siamo i _____ dei nostri genitori
  {
    id: 'fam-7',
    type: 'family_relation',
    prompt: 'Mio fratello ed io siamo i _____ dei nostri genitori.',
    subPrompt: '亲属关系真题 7 (My brother and I are the ... of our parents)',
    correctAnswerText: 'figli',
    options: buildKahootOptions('figli', ['nipoti', 'cugini', 'fratelli']),
    explanation: {
      rule: 'Rispetto ai genitori, noi siamo i loro "figli" (子女 / 儿子们). Singolare: figlio (儿子), figlia (女儿).',
      verbTranslation: 'figli = 孩子们 / 子女 (sons/children)',
      sentenceMeaning: '我兄弟和我，是我们父母的儿子/孩子（figli）。',
    },
  },

  // 8. I miei cugini, i miei fratelli ed io siamo i nipoti dei nostri _____
  {
    id: 'fam-8',
    type: 'family_relation',
    prompt: 'I miei cugini, i miei fratelli ed io siamo i nipoti dei nostri _____.',
    subPrompt: '亲属关系真题 8 (My cousins, siblings and I are grandchildren of our...)',
    correctAnswerText: 'nonni',
    options: buildKahootOptions('nonni', ['genitori', 'zii', 'parenti']),
    explanation: {
      rule: 'Noi siamo i "nipoti" dei nostri "nonni" (祖父母 / 外祖父母). Ricorda: il nipote rispetta sia il nonno (孙辈) sia lo zio (侄甥辈).',
      verbTranslation: 'nonni = 祖父母 / 外公外婆 (grandparents)',
      sentenceMeaning: '我的堂表亲、我的兄弟姐妹和我，是我们祖父母（nonni）的孙子孙女们。',
    },
  },

  // 9. I miei zii ed i loro figli sono i miei _____
  {
    id: 'fam-9',
    type: 'family_relation',
    prompt: 'I miei zii ed i loro figli sono i miei _____.',
    subPrompt: '亲属关系真题 9 (My aunts/uncles and their kids are my...)',
    correctAnswerText: 'parenti',
    options: buildKahootOptions('parenti', ['fratelli', 'genitori', 'figli']),
    explanation: {
      rule: 'In italiano "i parenti" sono tutte le persone della famiglia allargata (亲戚，relatives). Gli zii e i cugini sono i nostri parenti.',
      verbTranslation: 'parenti = 亲戚 (relatives)',
      sentenceMeaning: '我的叔伯姨舅和他们的孩子们是我的亲戚（parenti）。',
    },
  },

  // 10. Mia mamma non è sposata più. Lei è _____
  {
    id: 'fam-10',
    type: 'family_relation',
    prompt: 'Mia mamma non è sposata più. Lei è _____.',
    subPrompt: '亲属状态真题 10 (My mom is not married anymore. She is...)',
    correctAnswerText: 'divorziata',
    options: buildKahootOptions('divorziata', ['sposata', 'vedova', 'single']),
    explanation: {
      rule: 'Quando una persona non è più sposata perché ha sciolto legalmente il matrimonio, è "divorziata" (离婚的) o "separata" (分居的). Se il marito fosse morto sarebbe "vedova" (寡妇).',
      verbTranslation: 'divorziata = 离异的 / 离婚的 (divorced)',
      sentenceMeaning: '我妈妈不再结婚了。她是离异的（divorziata）。',
    },
  },

  // 11. Mia nonna è _____, però mio nonno è ancora vivo
  {
    id: 'fam-11',
    type: 'family_relation',
    prompt: 'Mia nonna è _____, però mio nonno è ancora vivo.',
    subPrompt: '亲属状态真题 11 (My grandma is ..., but my grandpa is still alive)',
    correctAnswerText: 'morta',
    options: buildKahootOptions('morta', ['viva', 'sposata', 'anziana']),
    explanation: {
      rule: 'L\'opposto di "vivo" (活着的) è "morto" (femminile: morta, 去世的/已故的). "Mia nonna è morta, però mio nonno è ancora vivo."',
      verbTranslation: 'morta = 去世的 / 已故的 (deceased/dead)',
      sentenceMeaning: '我的奶奶已经去世了（morta），但我爷爷依然健在（ancora vivo）。',
    },
  },

  // 12. Il figlio di mio zio è mio _____
  {
    id: 'fam-12',
    type: 'family_relation',
    prompt: 'Il figlio di mio zio è mio _____.',
    subPrompt: '亲属拓展题 12 (The son of my uncle is my...)',
    correctAnswerText: 'cugino',
    options: buildKahootOptions('cugino', ['fratello', 'nipote', 'figlio']),
    explanation: {
      rule: 'I figli degli zii sono i nostri "cugini" (cugino = 堂/表兄弟, cugina = 堂/表姐妹).',
      verbTranslation: 'cugino = 堂兄弟 / 表兄弟 (cousin)',
      sentenceMeaning: '我叔叔/舅舅的儿子是我的堂表兄弟（cugino）。',
    },
  },

  // 13. La sorella di mio padre è mia _____
  {
    id: 'fam-13',
    type: 'family_relation',
    prompt: 'La sorella di mio padre è mia _____.',
    subPrompt: '亲属拓展题 13 (The sister of my father is my...)',
    correctAnswerText: 'zia',
    options: buildKahootOptions('zia', ['nonna', 'sorella', 'mamma']),
    explanation: {
      rule: 'La sorella del padre o della madre è la "zia" (姑姑 / 姨妈 / 婶婶). Maschile: zio.',
      verbTranslation: 'zia = 姑姑 / 阿姨 (aunt)',
      sentenceMeaning: '我父亲的姐妹是我的姑姑（zia）。',
    },
  },

  // 14. Il padre di mia madre è mio _____
  {
    id: 'fam-14',
    type: 'family_relation',
    prompt: 'Il padre di mia madre è mio _____.',
    subPrompt: '亲属拓展题 14 (The father of my mother is my...)',
    correctAnswerText: 'nonno',
    options: buildKahootOptions('nonno', ['zio', 'papà', 'fratello']),
    explanation: {
      rule: 'Il padre della madre o del padre è il "nonno" (爷爷 / 外公).',
      verbTranslation: 'nonno = 爷爷 / 外公 (grandfather)',
      sentenceMeaning: '我母亲的父亲是我的外公（nonno）。',
    },
  },

  // 15. Mio padre è il _____ di mia madre
  {
    id: 'fam-15',
    type: 'family_relation',
    prompt: 'Mio padre è il _____ di mia madre.',
    subPrompt: '亲属拓展题 15 (My father is the ... of my mother)',
    correctAnswerText: 'marito',
    options: buildKahootOptions('marito', ['fratello', 'figlio', 'nonno']),
    explanation: {
      rule: 'L\'uomo sposato con la madre è il suo "marito" (丈夫). Femminile: moglie (妻子).',
      verbTranslation: 'marito = 丈夫 (husband)',
      sentenceMeaning: '我的父亲是我母亲的丈夫（marito）。',
    },
  },

  // 16. La figlia di mia figlia è mia _____
  {
    id: 'fam-16',
    type: 'family_relation',
    prompt: 'La figlia di mia figlia è mia _____.',
    subPrompt: '亲属拓展题 16 (The daughter of my daughter is my...)',
    correctAnswerText: 'nipote',
    options: buildKahootOptions('nipote', ['figlia', 'sorella', 'cugina']),
    explanation: {
      rule: 'In italiano i figli dei propri figli si chiamano "nipoti" (孙子 / 孙女 / 外孙 / 外孙女).',
      verbTranslation: 'nipote = 孙女 / 外孙女 (granddaughter)',
      sentenceMeaning: '我女儿的女儿是我的外孙女（nipote）。',
    },
  },

  // 17. La figlia di mio zio è mia _____
  {
    id: 'fam-17',
    type: 'family_relation',
    prompt: 'La figlia di mio zio è mia _____.',
    subPrompt: '亲属拓展题 17 (The daughter of my uncle is my...)',
    correctAnswerText: 'cugina',
    options: buildKahootOptions('cugina', ['sorella', 'zia', 'nipote']),
    explanation: {
      rule: 'La figlia degli zii è la "cugina" (堂/表姐妹). Maschile: cugino (堂/表兄弟).',
      verbTranslation: 'cugina = 堂姐妹 / 表姐妹 (female cousin)',
      sentenceMeaning: '我叔叔/舅舅的女儿是我的堂表姐妹（cugina）。',
    },
  },

  // 18. Il figlio di mio fratello è mio _____
  {
    id: 'fam-18',
    type: 'family_relation',
    prompt: 'Il figlio di mio fratello è mio _____.',
    subPrompt: '亲属拓展题 18 (The son of my brother is my...)',
    correctAnswerText: 'nipote',
    options: buildKahootOptions('nipote', ['figlio', 'cugino', 'fratello']),
    explanation: {
      rule: 'I figli dei fratelli e delle sorelle sono i "nipoti" (侄子 / 侄女 / 外甥). "Il figlio di mio fratello è mio nipote."',
      verbTranslation: 'nipote = 侄子 (nephew)',
      sentenceMeaning: '我兄弟的儿子是我的侄子（nipote）。',
    },
  },

  // 19. La madre di mia madre è mia _____
  {
    id: 'fam-19',
    type: 'family_relation',
    prompt: 'La madre di mia madre è mia _____.',
    subPrompt: '亲属拓展题 19 (The mother of my mother is my...)',
    correctAnswerText: 'nonna',
    options: buildKahootOptions('nonna', ['zia', 'mamma', 'cugina']),
    explanation: {
      rule: 'La madre della propria madre è la "nonna" (外婆 / 姥姥).',
      verbTranslation: 'nonna = 外婆 / 姥姥 (maternal grandmother)',
      sentenceMeaning: '我母亲的母亲是我的外婆（nonna）。',
    },
  },

  // 20. Il padre di mio padre è mio _____
  {
    id: 'fam-20',
    type: 'family_relation',
    prompt: 'Il padre di mio padre è mio _____.',
    subPrompt: '亲属拓展题 20 (The father of my father is my...)',
    correctAnswerText: 'nonno',
    options: buildKahootOptions('nonno', ['zio', 'papà', 'cugino']),
    explanation: {
      rule: 'Il padre del proprio padre è il "nonno" (爷爷 / 祖父).',
      verbTranslation: 'nonno = 爷爷 / 祖父 (paternal grandfather)',
      sentenceMeaning: '我父亲的父亲是我的爷爷（nonno）。',
    },
  },

  // 21. Il figlio di mio papà e di mia mamma è mio _____
  {
    id: 'fam-21',
    type: 'family_relation',
    prompt: 'Il figlio di mio papà e di mia mamma è mio _____.',
    subPrompt: '亲属拓展题 21 (The son of my dad and mom is my...)',
    correctAnswerText: 'fratello',
    options: buildKahootOptions('fratello', ['cugino', 'figlio', 'nipote']),
    explanation: {
      rule: 'Il figlio maschio dei propri genitori è il proprio "fratello" (兄弟). Femminile: sorella.',
      verbTranslation: 'fratello = 兄弟 (brother)',
      sentenceMeaning: '我爸爸妈妈的儿子是我的兄弟（fratello）。',
    },
  },

  // 22. La moglie di mio nonno è mia _____
  {
    id: 'fam-22',
    type: 'family_relation',
    prompt: 'La moglie di mio nonno è mia _____.',
    subPrompt: '亲属拓展题 22 (The wife of my grandfather is my...)',
    correctAnswerText: 'nonna',
    options: buildKahootOptions('nonna', ['zia', 'madre', 'sorella']),
    explanation: {
      rule: 'La moglie del proprio nonno è la propria "nonna" (奶奶 / 外婆).',
      verbTranslation: 'nonna = 奶奶 / 外婆 (grandmother)',
      sentenceMeaning: '我爷爷的妻子是我的奶奶（nonna）。',
    },
  },

  // 23. Il marito di mia nonna è mio _____
  {
    id: 'fam-23',
    type: 'family_relation',
    prompt: 'Il marito di mia nonna è mio _____.',
    subPrompt: '亲属拓展题 23 (The husband of my grandmother is my...)',
    correctAnswerText: 'nonno',
    options: buildKahootOptions('nonno', ['zio', 'padre', 'cugino']),
    explanation: {
      rule: 'Il marito della propria nonna è il proprio "nonno" (爷爷 / 外公).',
      verbTranslation: 'nonno = 爷爷 / 外公 (grandfather)',
      sentenceMeaning: '我奶奶的丈夫是我的爷爷（nonno）。',
    },
  },

  // 24. I genitori di mio padre sono i miei _____
  {
    id: 'fam-24',
    type: 'family_relation',
    prompt: 'I genitori di mio padre sono i miei _____.',
    subPrompt: '亲属拓展题 24 (The parents of my father are my...)',
    correctAnswerText: 'nonni',
    options: buildKahootOptions('nonni', ['zii', 'parenti', 'genitori']),
    explanation: {
      rule: 'I genitori del padre o della madre sono "i nonni" (祖父母们 / 外祖父母们).',
      verbTranslation: 'nonni = 祖父母 (grandparents)',
      sentenceMeaning: '我父亲的父母是我的祖父母（nonni）。',
    },
  },

  // 25. Il marito di mia zia è mio _____
  {
    id: 'fam-25',
    type: 'family_relation',
    prompt: 'Il marito di mia zia è mio _____.',
    subPrompt: '亲属拓展题 25 (The husband of my aunt is my...)',
    correctAnswerText: 'zio',
    options: buildKahootOptions('zio', ['cugino', 'nonno', 'padre']),
    explanation: {
      rule: 'In italiano il marito della zia si chiama anch\'esso "zio" (姑父 / 姨父 / 叔叔).',
      verbTranslation: 'zio = 姑父 / 姨父 / 叔父 (uncle)',
      sentenceMeaning: '我姑姑/阿姨的丈夫也是我的叔叔/姑父（zio）。',
    },
  },

  // 26. La moglie di mio zio è mia _____
  {
    id: 'fam-26',
    type: 'family_relation',
    prompt: 'La moglie di mio zio è mia _____.',
    subPrompt: '亲属拓展题 26 (The wife of my uncle is my...)',
    correctAnswerText: 'zia',
    options: buildKahootOptions('zia', ['nonna', 'cugina', 'sorella']),
    explanation: {
      rule: 'La moglie dello zio si chiama "zia" (舅妈 / 婶婶 / 伯母).',
      verbTranslation: 'zia = 舅妈 / 婶母 / 伯母 (aunt)',
      sentenceMeaning: '我叔叔/舅舅的妻子是我的舅妈/婶婶（zia）。',
    },
  },

  // 27. La madre di mia moglie è mia _____
  {
    id: 'fam-27',
    type: 'family_relation',
    prompt: 'La madre di mia moglie è mia _____.',
    subPrompt: '姻亲拓展题 27 (The mother of my wife is my...)',
    correctAnswerText: 'suocera',
    options: buildKahootOptions('suocera', ['nuora', 'cognata', 'zia']),
    explanation: {
      rule: 'La madre del coniuge (moglie o marito) è la "suocera" (岳母 / 婆婆). Maschile: suocero (岳父 / 公公).',
      verbTranslation: 'suocera = 岳母 / 婆婆 (mother-in-law)',
      sentenceMeaning: '我妻子的母亲是我的岳母（suocera）。',
    },
  },

  // 28. Il padre di mio marito è mio _____
  {
    id: 'fam-28',
    type: 'family_relation',
    prompt: 'Il padre di mio marito è mio _____.',
    subPrompt: '姻亲拓展题 28 (The father of my husband is my...)',
    correctAnswerText: 'suocero',
    options: buildKahootOptions('suocero', ['genero', 'cognato', 'zio']),
    explanation: {
      rule: 'Il padre del coniuge è il "suocero" (公公 / 岳父).',
      verbTranslation: 'suocero = 公公 / 岳父 (father-in-law)',
      sentenceMeaning: '我丈夫的父亲是我的公公（suocero）。',
    },
  },

  // 29. La moglie di mio figlio è mia _____
  {
    id: 'fam-29',
    type: 'family_relation',
    prompt: 'La moglie di mio figlio è mia _____.',
    subPrompt: '姻亲拓展题 29 (The wife of my son is my...)',
    correctAnswerText: 'nuora',
    options: buildKahootOptions('nuora', ['suocera', 'cognata', 'figlia']),
    explanation: {
      rule: 'La moglie del proprio figlio è la "nuora" (儿媳妇).',
      verbTranslation: 'nuora = 儿媳妇 (daughter-in-law)',
      sentenceMeaning: '我儿子的妻子是我的儿媳妇（nuora）。',
    },
  },

  // 30. Il marito di mia figlia è mio _____
  {
    id: 'fam-30',
    type: 'family_relation',
    prompt: 'Il marito di mia figlia è mio _____.',
    subPrompt: '姻亲拓展题 30 (The husband of my daughter is my...)',
    correctAnswerText: 'genero',
    options: buildKahootOptions('genero', ['suocero', 'cognato', 'figlio']),
    explanation: {
      rule: 'Il marito della propria figlia è il "genero" (女婿).',
      verbTranslation: 'genero = 女婿 (son-in-law)',
      sentenceMeaning: '我女儿的丈夫是我的女婿（genero）。',
    },
  },

  // 31. Il fratello di mia moglie è mio _____
  {
    id: 'fam-31',
    type: 'family_relation',
    prompt: 'Il fratello di mia moglie è mio _____.',
    subPrompt: '姻亲拓展题 31 (The brother of my wife is my...)',
    correctAnswerText: 'cognato',
    options: buildKahootOptions('cognato', ['cugino', 'fratello', 'suocero']),
    explanation: {
      rule: 'Il fratello del coniuge (o il marito della sorella) è il "cognato" (大舅子 / 小舅子 / 姐夫 / 妹夫 / 内兄内弟).',
      verbTranslation: 'cognato = 内兄 / 内弟 / 姐夫 / 妹夫 (brother-in-law)',
      sentenceMeaning: '我妻子的兄弟是我的大舅子/小舅子（cognato）。',
    },
  },

  // 32. La sorella di mio marito è mia _____
  {
    id: 'fam-32',
    type: 'family_relation',
    prompt: 'La sorella di mio marito è mia _____.',
    subPrompt: '姻亲拓展题 32 (The sister of my husband is my...)',
    correctAnswerText: 'cognata',
    options: buildKahootOptions('cognata', ['cugina', 'suocera', 'sorella']),
    explanation: {
      rule: 'La sorella del coniuge (o la moglie del fratello) è la "cognata" (大姑子 / 小姑子 / 嫂子 / 弟媳 / 姨子).',
      verbTranslation: 'cognata = 大姑子 / 小姑子 / 嫂子 / 弟媳 (sister-in-law)',
      sentenceMeaning: '我丈夫的姐妹是我的大姑子/小姑子（cognata）。',
    },
  },

  // 33. Il marito di mia zia è morto. Mia zia è _____
  {
    id: 'fam-33',
    type: 'family_relation',
    prompt: 'Il marito di mia zia è morto. Mia zia è _____.',
    subPrompt: '婚姻状态拓展题 33 (My aunt\'s husband passed away. She is...)',
    correctAnswerText: 'vedova',
    options: buildKahootOptions('vedova', ['divorziata', 'sposata', 'single']),
    explanation: {
      rule: 'Una donna il cui marito è deceduto è "vedova" (寡妇 / 丧偶的). Per un uomo la cui moglie è deceduta si usa "vedovo".',
      verbTranslation: 'vedova = 丧偶的 / 寡妇 (widow)',
      sentenceMeaning: '我姑姑的丈夫去世了。我姑姑现在是丧偶的（vedova）。',
    },
  },

  // 34. La moglie di mio nonno è morta. Mio nonno è _____
  {
    id: 'fam-34',
    type: 'family_relation',
    prompt: 'La moglie di mio nonno è morta. Mio nonno è _____.',
    subPrompt: '婚姻状态拓展题 34 (My grandpa\'s wife passed away. He is...)',
    correctAnswerText: 'vedovo',
    options: buildKahootOptions('vedovo', ['divorziato', 'sposato', 'morto']),
    explanation: {
      rule: 'Un uomo la cui moglie è morta è "vedovo" (鳏夫 / 丧偶的).',
      verbTranslation: 'vedovo = 鳏夫 / 丧偶的 (widower)',
      sentenceMeaning: '我爷爷的妻子去世了。我爷爷现在是丧偶的（vedovo）。',
    },
  },

  // 35. I figli dei miei zii sono i miei _____
  {
    id: 'fam-35',
    type: 'family_relation',
    prompt: 'I figli dei miei zii sono i miei _____.',
    subPrompt: '亲属复数拓展题 35 (The children of my aunts and uncles are my...)',
    correctAnswerText: 'cugini',
    options: buildKahootOptions('cugini', ['fratelli', 'nipoti', 'genitori']),
    explanation: {
      rule: 'Tutti i figli degli zii sono i nostri "cugini" (堂/表兄弟姐妹们).',
      verbTranslation: 'cugini = 堂/表兄弟姐妹们 (cousins)',
      sentenceMeaning: '我叔伯舅姨的孩子们是我的堂表兄弟姐妹们（cugini）。',
    },
  },

  // 36. Mia sorella ed io siamo le _____ dei nostri genitori
  {
    id: 'fam-36',
    type: 'family_relation',
    prompt: 'Mia sorella ed io siamo le _____ dei nostri genitori.',
    subPrompt: '亲属阴性复数拓展题 36 (My sister and I are the ... of our parents)',
    correctAnswerText: 'figlie',
    options: buildKahootOptions('figlie', ['sorelle', 'nipoti', 'cugine']),
    explanation: {
      rule: 'Due o più femmine rispetto ai propri genitori sono "le figlie" (女儿们). Maschile: i figli (儿子们 / 孩子总称).',
      verbTranslation: 'figlie = 女儿们 (daughters)',
      sentenceMeaning: '我姐妹和我，是我们父母的女儿们（figlie）。',
    },
  },
];

export interface FamilyVocabularyItem {
  id: string;
  italian: string;
  plural: string;
  gender: 'maschile' | 'femminile';
  chinese: string;
  english: string;
  example: string;
}

export const FAMILY_VOCABULARY: FamilyVocabularyItem[] = [
  { id: 'padre', italian: 'il padre (papà)', plural: 'i padri', gender: 'maschile', chinese: '父亲 / 爸爸', english: 'father / dad', example: 'Mio padre guida bene.' },
  { id: 'madre', italian: 'la madre (mamma)', plural: 'le madri', gender: 'femminile', chinese: '母亲 / 妈妈', english: 'mother / mom', example: 'Mia madre parla italiano.' },
  { id: 'genitori', italian: 'i genitori', plural: 'i genitori', gender: 'maschile', chinese: '父母 / 双亲', english: 'parents', example: 'I miei genitori abitano a Roma.' },
  { id: 'figlio', italian: 'il figlio', plural: 'i figli', gender: 'maschile', chinese: '儿子', english: 'son', example: 'Lui ha un figlio di cinque anni.' },
  { id: 'figlia', italian: 'la figlia', plural: 'le figlie', gender: 'femminile', chinese: '女儿', english: 'daughter', example: 'La figlia studia all\'università.' },
  { id: 'fratello', italian: 'il fratello', plural: 'i fratelli', gender: 'maschile', chinese: '兄弟 / 哥哥 / 弟弟', english: 'brother', example: 'Il fratello di mia madre è mio zio.' },
  { id: 'sorella', italian: 'la sorella', plural: 'le sorelle', gender: 'femminile', chinese: '姐妹 / 姐姐 / 妹妹', english: 'sister', example: 'La figlia di mio papà è mia sorella.' },
  { id: 'nonno', italian: 'il nonno', plural: 'i nonni', gender: 'maschile', chinese: '爷爷 / 外公', english: 'grandfather', example: 'Mio nonno è ancora vivo.' },
  { id: 'nonna', italian: 'la nonna', plural: 'le nonne', gender: 'femminile', chinese: '奶奶 / 外婆', english: 'grandmother', example: 'La mamma di mio padre è mia nonna.' },
  { id: 'zio', italian: 'lo zio', plural: 'gli zii', gender: 'maschile', chinese: '叔叔 / 伯父 / 舅舅', english: 'uncle', example: 'Lo zio viaggia spesso.' },
  { id: 'zia', italian: 'la zia', plural: 'le zie', gender: 'femminile', chinese: '姑姑 / 姨妈 / 婶婶', english: 'aunt', example: 'La zia prepara la cena.' },
  { id: 'cugino', italian: 'il cugino', plural: 'i cugini', gender: 'maschile', chinese: '堂/表兄弟', english: 'cousin (m)', example: 'Il figlio di mio zio è mio cugino.' },
  { id: 'cugina', italian: 'la cugina', plural: 'le cugine', gender: 'femminile', chinese: '堂/表姐妹', english: 'cousin (f)', example: 'Mia cugina parte per Milano.' },
  { id: 'nipote_m', italian: 'il nipote', plural: 'i nipoti', gender: 'maschile', chinese: '孙子 / 侄子 / 外甥', english: 'grandson / nephew', example: 'I figli di mia sorella sono i miei nipoti.' },
  { id: 'nipote_f', italian: 'la nipote', plural: 'le nipoti', gender: 'femminile', chinese: '孙女 / 侄女 / 外甥女', english: 'granddaughter / niece', example: 'La nipote è molto simpatica.' },
  { id: 'marito', italian: 'il marito', plural: 'i mariti', gender: 'maschile', chinese: '丈夫', english: 'husband', example: 'Mio padre è il marito di mia madre.' },
  { id: 'moglie', italian: 'la moglie', plural: 'le mogli', gender: 'femminile', chinese: '妻子', english: 'wife', example: 'La moglie di mio padre è mia mamma.' },
  { id: 'parenti', italian: 'i parenti', plural: 'i parenti', gender: 'maschile', chinese: '亲戚们 (不单指父母)', english: 'relatives', example: 'I miei zii ed i loro figli sono i miei parenti.' },
  { id: 'suocero', italian: 'il suocero', plural: 'i suoceri', gender: 'maschile', chinese: '岳父 / 公公', english: 'father-in-law', example: 'Il padre di mio marito è mio suocero.' },
  { id: 'suocera', italian: 'la suocera', plural: 'le suocere', gender: 'femminile', chinese: '岳母 / 婆婆', english: 'mother-in-law', example: 'La madre di mia moglie è mia suocera.' },
  { id: 'nuora', italian: 'la nuora', plural: 'le nuore', gender: 'femminile', chinese: '儿媳妇', english: 'daughter-in-law', example: 'La moglie di mio figlio è mia nuora.' },
  { id: 'genero', italian: 'il genero', plural: 'i generi', gender: 'maschile', chinese: '女婿', english: 'son-in-law', example: 'Il marito di mia figlia è mio genero.' },
  { id: 'cognato', italian: 'il cognato', plural: 'i cognati', gender: 'maschile', chinese: '大舅子 / 小舅子 / 姐夫 / 妹夫', english: 'brother-in-law', example: 'Il fratello di mia moglie è mio cognato.' },
  { id: 'cognata', italian: 'la cognata', plural: 'le cognate', gender: 'femminile', chinese: '大姑子 / 小姑子 / 嫂子 / 弟媳', english: 'sister-in-law', example: 'La sorella di mio marito è mia cognata.' },
  { id: 'vedovo', italian: 'vedovo / vedova', plural: 'vedovi / vedove', gender: 'maschile', chinese: '丧偶的 / 鳏夫 / 寡妇', english: 'widower / widow', example: 'Il marito di mia zia è morto. Mia zia è vedova.' },
  { id: 'sposato', italian: 'sposato / sposata', plural: 'sposati / sposate', gender: 'maschile', chinese: '已婚的', english: 'married', example: 'Loro sono sposati da dieci anni.' },
  { id: 'divorziato', italian: 'divorziato / divorziata', plural: 'divorziati', gender: 'maschile', chinese: '离婚的 / 离异的', english: 'divorced', example: 'Mia mamma non è sposata più: è divorziata.' },
  { id: 'morto', italian: 'morto / morta', plural: 'morti / morte', gender: 'maschile', chinese: '去世的 / 已故的', english: 'dead / deceased', example: 'Mia nonna è morta, però mio nonno è ancora vivo.' },
  { id: 'vivo', italian: 'vivo / viva', plural: 'vivi / vive', gender: 'maschile', chinese: '健在的 / 活着的', english: 'alive', example: 'Mio nonno è ancora vivo.' },
];
