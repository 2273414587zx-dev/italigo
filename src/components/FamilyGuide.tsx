import React from 'react';
import { Volume2, Users, Heart, Sparkles, BookOpen, ArrowRight, Play } from 'lucide-react';
import { FAMILY_VOCABULARY } from '../data/familyQuestions';
import { sound } from '../utils/audio';

interface FamilyGuideProps {
  onBackToLobby: () => void;
  onStartFamilyQuiz: () => void;
}

export const FamilyGuide: React.FC<FamilyGuideProps> = ({
  onBackToLobby,
  onStartFamilyQuiz,
}) => {
  const speak = (text: string) => {
    sound.speakItalian(text);
  };

  const keyPairs = [
    { it: 'padre / papà & madre / mamma', zh: '父亲与母亲 -> 合称 i genitori (父母)', expl: '注意: genitori 是 parents，parenti 是全体亲戚！' },
    { it: 'figlio & figlia', zh: '儿子与女儿 -> 复数 i figli (子女/孩子们)', expl: 'Mio fratello ed io siamo i figli dei nostri genitori.' },
    { it: 'fratello & sorella', zh: '兄弟与姐妹', expl: 'La figlia di mio papà è mia sorella.' },
    { it: 'nonno & nonna', zh: '爷爷/外公与奶奶/外婆 -> 合称 i nonni (祖父母)', expl: 'La mamma di mio padre è mia nonna.' },
    { it: 'zio & zia', zh: '叔伯舅舅与姑姑阿姨 -> 复数 gli zii / le zie', expl: 'Il fratello di mia madre è mio zio.' },
    { it: 'cugino & cugina', zh: '堂表兄弟与堂表姐妹 -> 复数 i cugini', expl: 'Il figlio di mio zio è mio cugino.' },
    { it: 'nipote (m/f)', zh: '孙子/孙女 或 侄子/外甥/侄女', expl: '🌟 意语特殊考点：nipote 既表示祖父母眼中的孙辈，也表示叔叔阿姨眼中的侄甥辈！' },
    { it: 'marito & moglie', zh: '丈夫与妻子', expl: 'La moglie di mio padre è mia mamma.' },
    { it: 'suocero & suocera', zh: '公公/岳父 与 婆婆/岳母', expl: 'La madre di mia moglie è mia suocera; il padre di mio marito è mio suocero.' },
    { it: 'nuora & genero', zh: '儿媳妇 与 女婿', expl: 'La moglie di mio figlio è mia nuora; il marito di mia figlia è mio genero.' },
    { it: 'cognato & cognata', zh: '大舅子/小舅子/姐夫/妹夫 与 大姑子/小姑子/嫂子/弟媳', expl: 'Il fratello di mia moglie è mio cognato.' },
    { it: 'sposato / divorziato / separato', zh: '已婚 / 离异 / 分居状态', expl: 'Mia mamma non è sposata più: è divorziata.' },
    { it: 'vedovo & vedova', zh: '丧偶的 (鳏夫 / 寡妇)', expl: 'Il marito di mia zia è morto: mia zia è vedova.' },
    { it: 'vivo & morto / morta', zh: '健在 / 去世已故', expl: 'Mia nonna è morta, però mio nonno è ancora vivo.' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 py-6 px-4 sm:px-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-[#2a1a47] via-[#1c133b] to-[#120d29] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>La Famiglia · 亲属关系词汇</span>
            </span>
            <span className="text-xs text-slate-400">对应习题真题全解析</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-display font-black text-white">
            意大利语家庭成员与亲属关系 (Parentela)
          </h1>
          <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            全面掌握家庭称谓与亲属推导逻辑（如 “Il fratello di mia madre è mio zio”），辨析易混淆的
            <span className="text-amber-400 font-bold"> genitori vs parenti</span> 与双重含义的
            <span className="text-emerald-400 font-bold"> nipote</span>。
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              onBackToLobby();
            }}
            className="px-4 py-2.5 text-xs font-bold rounded-xl bg-indigo-950 hover:bg-indigo-900 border border-indigo-800 text-white cursor-pointer"
          >
            返回大厅
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onStartFamilyQuiz();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-indigo-950 cursor-pointer shadow-lg shadow-amber-950/60 font-display"
          >
            <Play className="w-4 h-4 fill-indigo-950" />
            <span>开始亲属关系挑战！</span>
          </button>
        </div>
      </div>

      {/* Core Exam High-Yield Formula Cards */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-display font-black text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>习题核心推导公式与高频考点</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {keyPairs.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#171138] border border-indigo-900/50 hover:border-amber-400/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display font-extrabold text-base text-amber-300">
                    {item.it}
                  </span>
                  <button
                    onClick={() => speak(item.it)}
                    title="Ascolta la pronuncia"
                    className="p-1 rounded-lg text-slate-400 hover:text-amber-400 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-sm font-semibold text-emerald-400 mt-1">
                  {item.zh}
                </div>
              </div>

              <div className="mt-3 p-2.5 rounded-xl bg-indigo-950/60 border border-indigo-900/40 text-xs text-slate-300">
                💡 {item.expl}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Vocabulary List */}
      <div className="bg-[#18133b] border border-indigo-900/60 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-black text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <span>亲属词汇全览 ({FAMILY_VOCABULARY.length} 词)</span>
          </h2>
          <span className="text-xs text-slate-400">点击小喇叭试听发音</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FAMILY_VOCABULARY.map((v) => (
            <div
              key={v.id}
              onClick={() => speak(v.italian)}
              className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-900/40 hover:bg-indigo-900/40 hover:border-amber-400/40 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display font-extrabold text-base text-white group-hover:text-amber-300 transition-colors">
                    {v.italian}
                  </span>
                  <Volume2 className="w-4 h-4 text-slate-500 group-hover:text-amber-300 transition-colors shrink-0" />
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  复数: {v.plural}
                </div>
                <div className="text-sm font-semibold text-emerald-400 mt-1">
                  {v.chinese}
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-indigo-900/30 text-[11px] text-slate-400 italic">
                “{v.example}”
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
