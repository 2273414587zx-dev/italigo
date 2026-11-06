import React, { useState } from 'react';
import { Volume2, Search, ArrowRight, Play, Sparkles, Utensils, Home, Zap, Compass, Briefcase, Languages, Calendar, Flame } from 'lucide-react';
import { VOCABULARY_DATABASE } from '../data/vocabularyData';
import { VocabItem, VocabTopic, QuizCategoryFilter } from '../types/game';
import { sound } from '../utils/audio';

interface VocabGuideModalProps {
  onBackToLobby: () => void;
  onStartVocabQuiz: (category: QuizCategoryFilter) => void;
}

export const VocabGuideModal: React.FC<VocabGuideModalProps> = ({
  onBackToLobby,
  onStartVocabQuiz,
}) => {
  const [activeTopic, setActiveTopic] = useState<VocabTopic | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const speak = (text: string) => {
    sound.speakItalian(text);
  };

  const topics: Array<{ id: VocabTopic | 'all'; label: string; icon: React.ReactNode; quizCat: QuizCategoryFilter }> = [
    { id: 'all', label: '全部词汇 (120+)', icon: <Languages className="w-4 h-4 text-amber-400" />, quizCat: 'vocab_all' },
    { id: 'avere_idioms', label: '🔥 AVERE 短语', icon: <Flame className="w-4 h-4 text-rose-400" />, quizCat: 'notebook_avere' },
    { id: 'mesi', label: '📅 月份与四季', icon: <Calendar className="w-4 h-4 text-sky-400" />, quizCat: 'notebook_mesi_date' },
    { id: 'notebook', label: '📝 手写新词 (16词)', icon: <Sparkles className="w-4 h-4 text-amber-400" />, quizCat: 'notebook_vocab' },
    { id: 'cibo', label: '🍕 食物与饮食', icon: <Utensils className="w-4 h-4 text-orange-400" />, quizCat: 'vocab_cibo' },
    { id: 'casa', label: '🏠 居家日常物品', icon: <Home className="w-4 h-4 text-blue-400" />, quizCat: 'vocab_casa' },
    { id: 'contrari', label: '⚡ 基础反义词对', icon: <Zap className="w-4 h-4 text-yellow-400" />, quizCat: 'vocab_contrari' },
    { id: 'citta', label: '🌆 城市与出行', icon: <Compass className="w-4 h-4 text-emerald-400" />, quizCat: 'vocab_citta' },
    { id: 'professioni', label: '💼 职业与称谓', icon: <Briefcase className="w-4 h-4 text-purple-400" />, quizCat: 'vocab_citta' },
  ];

  const filteredItems = VOCABULARY_DATABASE.filter((item) => {
    const matchesTopic = activeTopic === 'all' || item.topic === activeTopic;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      item.italian.toLowerCase().includes(term) ||
      item.translationZh.toLowerCase().includes(term) ||
      item.translationEn.toLowerCase().includes(term) ||
      (item.exampleSentence && item.exampleSentence.toLowerCase().includes(term));
    return matchesTopic && matchesSearch;
  });

  const currentQuizCat: QuizCategoryFilter =
    activeTopic === 'avere_idioms'
      ? 'notebook_avere'
      : activeTopic === 'mesi'
      ? 'notebook_mesi_date'
      : activeTopic === 'notebook'
      ? 'notebook_vocab'
      : activeTopic === 'cibo'
      ? 'vocab_cibo'
      : activeTopic === 'casa'
      ? 'vocab_casa'
      : activeTopic === 'contrari'
      ? 'vocab_contrari'
      : activeTopic === 'citta' || activeTopic === 'professioni'
      ? 'vocab_citta'
      : 'vocab_all';

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 py-6 px-4 sm:px-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-[#24174d] via-[#1a123d] to-[#100a29] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Vocabolario Italiano · 词汇大扩充</span>
            </span>
            <span className="text-xs text-slate-400">零死角建立 A1-A2 核心生活词库</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-display font-black text-white">
            意大利语高频生活词汇与做题宝典
          </h1>
          <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            结合做题场景，掌握食物饮食、居家日用、必考反义词、城市出行与职业名词。自带真人级意语发音、例句语境与做题避坑解析。
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button
            onClick={() => {
              sound.playClick();
              onStartVocabQuiz(currentQuizCat);
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-display font-black text-sm shadow-lg shadow-orange-950/60 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>开启词汇刷题挑战</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onBackToLobby();
            }}
            className="px-4 py-3 rounded-2xl bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-800 text-slate-300 text-sm font-bold cursor-pointer"
          >
            返回主页
          </button>
        </div>
      </div>

      {/* Controls: Topic Filter + Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#151033] border border-indigo-900/50 p-4 rounded-2xl">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {topics.map((t) => {
            const isSelected = activeTopic === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  sound.playClick();
                  setActiveTopic(t.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-indigo-950 shadow-md shadow-amber-950'
                    : 'bg-indigo-950/60 text-slate-300 hover:text-white hover:bg-indigo-900/60 border border-indigo-800/40'
                }`}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="搜索单词 (如: formaggio / 奶酪)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-indigo-950/80 border border-indigo-800/60 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Vocabulary Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col justify-between bg-gradient-to-b from-[#1c1445] to-[#130d30] border border-indigo-900/60 hover:border-amber-500/50 rounded-2xl p-4 shadow-lg transition-all"
          >
            <div>
              {/* Header with Italian word + audio */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display font-black text-lg text-white group-hover:text-amber-400 transition-colors">
                      {item.italian}
                    </span>
                    {item.topic === 'notebook' && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                        手写笔记
                      </span>
                    )}
                    {item.gender && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-900/60 text-slate-300 border border-indigo-700/40">
                        {item.gender === 'm' ? '阳性 m.' : item.gender === 'f' ? '阴性 f.' : '复数 pl.'}
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-bold text-amber-300 mt-0.5">
                    {item.translationZh}{' '}
                    <span className="text-xs text-slate-400 font-normal">({item.translationEn})</span>
                  </div>
                </div>

                <button
                  onClick={() => speak(item.italian)}
                  title="朗读意语"
                  className="p-2 rounded-xl bg-indigo-900/60 hover:bg-amber-500 hover:text-indigo-950 text-amber-400 transition-all cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Plural or Opposite Tag */}
              <div className="flex flex-wrap items-center gap-2 mt-2.5">
                {item.plural && (
                  <span className="text-[11px] text-slate-300 bg-slate-900/60 border border-slate-700/50 px-2 py-0.5 rounded-lg">
                    复数: <strong className="text-indigo-200">{item.plural}</strong>
                  </span>
                )}
                {item.opposite && (
                  <button
                    onClick={() => speak(item.opposite!)}
                    className="text-[11px] text-rose-300 bg-rose-950/40 border border-rose-800/40 px-2 py-0.5 rounded-lg flex items-center gap-1 hover:border-rose-400 transition-all cursor-pointer"
                  >
                    <span>反义词:</span>
                    <strong className="underline">{item.opposite}</strong>
                    <Volume2 className="w-3 h-3 text-rose-400" />
                  </button>
                )}
              </div>

              {/* Example Sentence */}
              {item.exampleSentence && (
                <div className="mt-3 p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-900/40 flex flex-col gap-1">
                  <div className="flex items-start justify-between gap-1.5">
                    <span className="text-xs text-slate-200 font-medium leading-relaxed italic">
                      "{item.exampleSentence}"
                    </span>
                    <button
                      onClick={() => speak(item.exampleSentence)}
                      title="朗读例句"
                      className="shrink-0 text-slate-400 hover:text-amber-300 cursor-pointer p-0.5"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-400">{item.exampleSentenceZh}</span>
                </div>
              )}
            </div>

            {/* Notes / Tips */}
            {item.notes && (
              <div className="mt-3 pt-2.5 border-t border-indigo-900/40 text-[11px] text-slate-400 leading-relaxed">
                💡 <span className="text-slate-300">{item.notes}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          未找到与 "{searchTerm}" 相关的词汇，试着换个词搜搜看吧！
        </div>
      )}
    </div>
  );
};
