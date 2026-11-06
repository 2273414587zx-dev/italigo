import React from 'react';
import { Volume2, Sparkles, BookOpen, Check, AlertTriangle } from 'lucide-react';
import { sound } from '../utils/audio';

interface GrammarRuleGuideProps {
  onBackToLobby: () => void;
  onStartQuiz: () => void;
}

export const GrammarRuleGuide: React.FC<GrammarRuleGuideProps> = ({
  onBackToLobby,
  onStartQuiz,
}) => {
  const speak = (text: string) => {
    sound.speakItalian(text);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 py-6 px-4 sm:px-6 animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-[#20184a] to-[#161038] border border-indigo-900/60 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold">
              Guida Grammaticale
            </span>
            <span className="text-xs text-slate-400">基于你的手写笔记本整理</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-display font-black text-white">
            -ARE · -ERE · -IRE 现在时变位完全指南
          </h1>
          <p className="text-sm text-slate-300 mt-2 max-w-2xl">
            掌握意大利语动词词尾规律，搞定普通规则动词与特殊的 <span className="text-amber-400 font-bold">-isc-</span> 插入变位！
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              onBackToLobby();
            }}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white cursor-pointer"
          >
            Torna al Quiz (返回)
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onStartQuiz();
            }}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-400 text-indigo-950 cursor-pointer font-display"
          >
            Inizia Quiz! (开始测验)
          </button>
        </div>
      </div>

      {/* 3 Conjugations Master Comparison Table */}
      <div className="bg-[#18133b] border border-indigo-900/60 rounded-3xl p-6 sm:p-8 shadow-xl">
        <h2 className="text-xl font-display font-black text-white mb-2 flex items-center gap-2">
          <span>1. 三大规则动词词尾对照表 (Le Tre Coniugazioni Regolari)</span>
        </h2>
        <p className="text-xs text-slate-400 mb-5">
          去掉不定式词尾（-are / -ere / -ire），保留词根，加上各人称对应词尾：
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[560px]">
            <thead>
              <tr className="border-b border-indigo-900/60 text-xs uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">人称 Pronome</th>
                <th className="py-3 px-4 text-rose-400">1° -ARE (parlare)</th>
                <th className="py-3 px-4 text-blue-400">2° -ERE (vedere)</th>
                <th className="py-3 px-4 text-emerald-400">3° -IRE Reg. (dormire)</th>
                <th className="py-3 px-4 text-amber-400">3° -IRE (-isc-) (finire)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-900/30 font-medium">
              {[
                { p: 'io (我)', are: 'parl-o', ere: 'ved-o', ire: 'dorm-o', isc: 'fin-isc-o' },
                { p: 'tu (你)', are: 'parl-i', ere: 'ved-i', ire: 'dorm-i', isc: 'fin-isc-i' },
                { p: 'lui/lei (他/她)', are: 'parl-a', ere: 'ved-e', ire: 'dorm-e', isc: 'fin-isc-e' },
                { p: 'noi (我们)', are: 'parl-iamo', ere: 'ved-iamo', ire: 'dorm-iamo', isc: 'fin-iamo (无isc!)' },
                { p: 'voi (你们)', are: 'parl-ate', ere: 'ved-ete', ire: 'dorm-ite', isc: 'fin-ite (无isc!)' },
                { p: 'loro (他们)', are: 'parl-ano', ere: 'ved-ono', ire: 'dorm-ono', isc: 'fin-isc-ono' },
              ].map((row) => (
                <tr key={row.p} className="hover:bg-indigo-950/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-300">{row.p}</td>
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">{row.are}</td>
                  <td className="py-3 px-4 font-mono font-bold text-blue-300">{row.ere}</td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-300">{row.ire}</td>
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">{row.isc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* The Crucial -IRE Rule Breakdown (from user notebook page 3 & 5) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Regular -IRE */}
        <div className="bg-[#18133b] border border-emerald-900/50 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-extrabold text-lg text-emerald-400">
                -IRE 普通规则动词 (Regolari)
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold">
                无 -isc-
              </span>
            </div>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              直接在词根后加上：<span className="font-mono text-emerald-300 font-bold">-o, -i, -e, -iamo, -ite, -ono</span>。
            </p>

            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">
              你笔记中的7个常见词：
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { it: 'aprire', zh: '打开', eg: 'apre / aprono' },
                { it: 'dormire', zh: '睡觉', eg: 'dorme / dormono' },
                { it: 'offrire', zh: '提供/请客', eg: 'offre / offrono' },
                { it: 'partire', zh: '出发/离开', eg: 'parte / partono' },
                { it: 'seguire', zh: '跟随', eg: 'segue / seguono' },
                { it: 'sentire', zh: '听见/感觉', eg: 'sente / sentono' },
                { it: 'servire', zh: '服务/上菜', eg: 'serve / servono' },
              ].map((item) => (
                <div
                  key={item.it}
                  onClick={() => speak(item.it)}
                  className="flex items-center justify-between p-2 rounded-xl bg-indigo-950/60 border border-indigo-900/40 hover:bg-emerald-950/40 cursor-pointer group"
                >
                  <div>
                    <span className="font-bold text-emerald-300 group-hover:text-white block">
                      {item.it}
                    </span>
                    <span className="text-[11px] text-slate-400">{item.zh}</span>
                  </div>
                  <Volume2 className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-300" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-[11px] text-emerald-200">
            ⚠️ 易错提醒：笔记例题中 “Giulia parte la sua casa tardi” 中 partire 绝不能写成 “partisce”，因为 partire 是普通规则动词！
          </div>
        </div>

        {/* -ISC- Verbs */}
        <div className="bg-[#18133b] border border-amber-900/50 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-extrabold text-lg text-amber-400">
                -IRE 特殊动词 (Con -ISC-)
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-800 text-amber-300 font-bold">
                有 -isc- 插入
              </span>
            </div>
            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              在单数人称（io, tu, lui/lei）及第三人称复数（loro）的词根与词尾之间插入{' '}
              <span className="font-mono text-amber-300 font-bold">-isc-</span>。
            </p>

            <div className="p-2.5 rounded-xl bg-amber-950/50 border border-amber-500/30 text-amber-200 text-xs mb-4">
              📌 <strong>笔记关键核心口诀：</strong>
              <div className="mt-1">
                <strong>noi 与 voi 绝对不加 -isc-！</strong>
                <br />
                noi fin<strong>iamo</strong> (非 finisciamo), voi fin<strong>ite</strong> (非 finiscite)！
              </div>
            </div>

            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">
              你笔记中的5个必考词：
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { it: 'finire', zh: '结束/完成', forms: 'finisco, finisci, finisce...' },
                { it: 'capire', zh: '理解/明白', forms: 'capisco, capisci, capisce...' },
                { it: 'preferire', zh: '更喜欢/偏好', forms: 'preferisco, preferisci...' },
                { it: 'pulire', zh: '清洁/打扫', forms: 'pulisco, pulisci, pulisce...' },
                { it: 'spedire', zh: '邮寄/发货', forms: 'spedisco, spedisci, spedisce...' },
              ].map((item) => (
                <div
                  key={item.it}
                  onClick={() => speak(item.it)}
                  className="p-2 rounded-xl bg-indigo-950/60 border border-indigo-900/40 hover:bg-amber-950/40 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300 group-hover:text-white">
                      {item.it}
                    </span>
                    <span className="text-[11px] text-slate-400">{item.zh}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono block mt-0.5 truncate">
                    {item.forms}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-indigo-950/50 border border-indigo-800/40 text-[11px] text-slate-300">
            🗣️ 发音小秘诀：finisce、capisce 中的 &quot;sc&quot; 读作类似汉语 &quot;希&quot; (shee)；finisco、capisco 中的 &quot;sc&quot; 读作 &quot;斯科&quot; (sko)。
          </div>
        </div>

        {/* Section 4: Irregular Core Verb AVERE (from new notebook page) */}
        <div className="rounded-3xl bg-[#17113a] border border-rose-500/30 p-6 sm:p-7 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-rose-500" />
                <h2 className="text-xl font-display font-black text-white">
                  🔥 不规则核心动词: AVERE (to have)
                </h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
                笔记重点
              </span>
            </div>

            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/40 text-xs text-rose-200 mb-4">
              ⚠️ <strong>发音黄金口诀：字母 &quot;H&quot; 永远不发音！</strong> ho 读 [o]，hai 读 [ai]，ha 读 [a]，hanno 读 [anno]。
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4 text-xs">
              {[
                { pr: 'io', form: 'ho', zh: '我有' },
                { pr: 'tu', form: 'hai', zh: '你有' },
                { pr: 'lui / lei', form: 'ha', zh: '他/她有' },
                { pr: 'noi', form: 'abbiamo', zh: '我们有' },
                { pr: 'voi', form: 'avete', zh: '你们有' },
                { pr: 'loro', form: 'hanno', zh: '他们有' },
              ].map((item) => (
                <div
                  key={item.pr}
                  onClick={() => speak(item.form)}
                  className="p-2.5 rounded-xl bg-indigo-950/60 border border-indigo-900/40 hover:border-rose-400 cursor-pointer flex items-center justify-between group"
                >
                  <span className="text-slate-400">{item.pr}</span>
                  <span className="font-bold text-rose-300 group-hover:text-white font-mono text-sm">{item.form}</span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-indigo-950/50 border border-indigo-800/40 text-xs text-slate-300 leading-relaxed flex flex-col gap-1.5">
              <div>🎂 <strong>问答年龄：</strong> &quot;Quanti anni hai?&quot; — &quot;Io ho diciannove (19) anni.&quot; (不用 essere！)</div>
              <div>💡 <strong>常见固定搭配：</strong> avere caldo/freddo (冷热), avere fame/sete (饿渴), avere fretta (赶时间), avere paura (害怕), avere ragione/torto (对错), avere bisogno di (需要), avere voglia di (渴望)。</div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: Gli Aggettivi Possessivi (物主形容词全套对照表与三大法则) */}
      <div className="bg-[#18133b] border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-purple-500" />
            <h2 className="text-xl sm:text-2xl font-display font-black text-white">
              👑 5. 物主形容词全套对照表 (Gli Aggettivi Possessivi)
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold w-fit">
            手写笔记重点突破
          </span>
        </div>

        {/* 3 Golden Rules from the Notebook */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-800/40 text-xs">
            <div className="font-bold text-purple-300 mb-1 flex items-center gap-1.5">
              <span>📌 黄金法则 1</span>
              <span className="text-white">前面要有定冠词</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              意大利语物主形容词前<strong>必须加定冠词</strong> (il / la / i / le)：<br />
              <span className="text-purple-200 font-mono">la mia casa</span> (我的家), <span className="text-purple-200 font-mono">i nostri fratelli</span> (我们的兄弟)。
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-pink-950/40 border border-pink-800/40 text-xs">
            <div className="font-bold text-pink-300 mb-1 flex items-center gap-1.5">
              <span>🎯 黄金法则 2</span>
              <span className="text-white">跟着名词变</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              性数<strong>完全由后面的东西决定</strong>，不受说话人性别影响：<br />
              Maria的书 = <span className="text-pink-200 font-mono">il suo libro</span> (书是阳性，所以用 il suo)；<br />
              Giulia的姐妹们 = <span className="text-pink-200 font-mono">le sue sorelle</span>。
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-800/40 text-xs">
            <div className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
              <span>⚠️ 黄金法则 3</span>
              <span className="text-white">loro 永远不变</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              &quot;他们的&quot; 词形<strong>永远是 loro</strong>，没有 lori 或 lora：<br />
              <span className="text-amber-200 font-mono">il loro, i loro, la loro, le loro</span>！<br />
              只变冠词，loro 坚决不变！
            </p>
          </div>
        </div>

        {/* 4-column Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[620px]">
            <thead>
              <tr className="border-b border-purple-900/60 text-xs uppercase tracking-wider text-slate-400">
                <th className="py-3 px-3">人称 (Possessore)</th>
                <th className="py-3 px-3 text-blue-400">男单 (Maschile Sing.)</th>
                <th className="py-3 px-3 text-cyan-400">男复 (Maschile Plur.)</th>
                <th className="py-3 px-3 text-pink-400">女单 (Femminile Sing.)</th>
                <th className="py-3 px-3 text-rose-400">女复 (Femminile Plur.)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/30 text-xs font-medium">
              {[
                { pr: 'io (我的)', ms: 'il mio', mp: 'i miei', fs: 'la mia', fp: 'le mie' },
                { pr: 'tu (你的)', ms: 'il tuo', mp: 'i tuoi', fs: 'la tua', fp: 'le tue' },
                { pr: 'lui / lei (他/她的)', ms: 'il suo', mp: 'i suoi', fs: 'la sua', fp: 'le sue' },
                { pr: 'noi (我们的)', ms: 'il nostro', mp: 'i nostri', fs: 'la nostra', fp: 'le nostre' },
                { pr: 'voi (你们的)', ms: 'il vostro', mp: 'i vostri', fs: 'la vostra', fp: 'le vostre' },
                { pr: 'loro (他们的)', ms: 'il loro', mp: 'i loro', fs: 'la loro', fp: 'le loro', tag: '不变' },
              ].map((row) => (
                <tr key={row.pr} className="hover:bg-purple-950/40 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-300">
                    {row.pr}
                    {row.tag && (
                      <span className="ml-2 px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] border border-amber-500/40">
                        {row.tag}
                      </span>
                    )}
                  </td>
                  <td
                    onClick={() => speak(row.ms)}
                    className="py-3 px-3 font-mono font-bold text-blue-300 hover:text-white cursor-pointer"
                  >
                    {row.ms} 🔊
                  </td>
                  <td
                    onClick={() => speak(row.mp)}
                    className="py-3 px-3 font-mono font-bold text-cyan-300 hover:text-white cursor-pointer"
                  >
                    {row.mp} 🔊
                  </td>
                  <td
                    onClick={() => speak(row.fs)}
                    className="py-3 px-3 font-mono font-bold text-pink-300 hover:text-white cursor-pointer"
                  >
                    {row.fs} 🔊
                  </td>
                  <td
                    onClick={() => speak(row.fp)}
                    className="py-3 px-3 font-mono font-bold text-rose-300 hover:text-white cursor-pointer"
                  >
                    {row.fp} 🔊
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-3.5 rounded-2xl bg-indigo-950/60 border border-indigo-800/40 flex items-center justify-between">
          <p className="text-xs text-slate-300">
            💡 点击表格中任意物主短语即可试听纯正意大利语真人发音（TTS），加深记忆！
          </p>
          <button
            onClick={() => {
              sound.playClick();
              onStartQuiz();
            }}
            className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer shrink-0 font-display shadow-md"
          >
            去测验这18题 ➔
          </button>
        </div>
      </div>
    </div>
  );
};
