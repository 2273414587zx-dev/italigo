import React, { useState } from 'react';
import { Search, Volume2, Play, Sparkles, Filter } from 'lucide-react';
import { VerbCategory, VerbItem } from '../types/game';
import { VERBS_DATA, CATEGORY_LABELS, PRONOUN_LABELS } from '../data/verbs';
import { sound } from '../utils/audio';

interface VerbExplorerProps {
  onStartCategoryQuiz: (cat: VerbCategory) => void;
  onBackToLobby: () => void;
}

export const VerbExplorer: React.FC<VerbExplorerProps> = ({
  onStartCategoryQuiz,
  onBackToLobby,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<VerbCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedVerbId, setExpandedVerbId] = useState<string | null>(null);

  const categories: Array<{ id: VerbCategory | 'all'; label: string; count: number; color: string }> = [
    { id: 'all', label: 'Tutti (全部词汇)', count: VERBS_DATA.length, color: 'border-slate-600' },
    { id: 'are', label: 'Verbi in -ARE', count: VERBS_DATA.filter((v) => v.category === 'are').length, color: 'border-red-500' },
    { id: 'ere', label: 'Verbi in -ERE', count: VERBS_DATA.filter((v) => v.category === 'ere').length, color: 'border-blue-500' },
    { id: 'ire_regular', label: '-IRE Regolari', count: VERBS_DATA.filter((v) => v.category === 'ire_regular').length, color: 'border-emerald-500' },
    { id: 'ire_isc', label: '-IRE (-ISC-)', count: VERBS_DATA.filter((v) => v.category === 'ire_isc').length, color: 'border-amber-500' },
  ];

  const filteredVerbs = VERBS_DATA.filter((v) => {
    const matchesCategory = selectedCategory === 'all' || v.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      v.infinitive.toLowerCase().includes(query) ||
      v.translationZh.toLowerCase().includes(query) ||
      v.translationEn.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  const speak = (text: string) => {
    sound.speakItalian(text);
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 py-6 px-4 sm:px-6 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#18133b] border border-indigo-900/60 rounded-3xl p-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
              Dizionario del Quaderno
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
              {VERBS_DATA.length} 动词全收录
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            完整收录你手写笔记中的所有动词，配有完整六人称现在时变位、例句要点与真人发音。
          </p>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onBackToLobby();
          }}
          className="px-4 py-2 text-xs font-bold rounded-xl bg-violet-600 hover:bg-violet-500 text-white cursor-pointer shrink-0"
        >
          Torna all&apos;Arena (返回答题)
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-indigo-900 text-white border-amber-400 shadow-sm'
                    : 'bg-[#151033] text-slate-400 hover:text-white border-indigo-950 hover:border-indigo-800'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cerca verbo (如: preferire, studiare)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#151033] border border-indigo-900/60 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </div>

      {/* Verbs List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVerbs.map((verb) => {
          const isExpanded = expandedVerbId === verb.id;
          const catMeta = CATEGORY_LABELS[verb.category];

          return (
            <div
              key={verb.id}
              className={`flex flex-col bg-[#17123a] border rounded-2xl p-4 sm:p-5 transition-all shadow-md ${
                isExpanded ? 'border-amber-400/80 ring-1 ring-amber-400/30' : 'border-indigo-900/50 hover:border-indigo-700/80'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-extrabold text-xl text-white">
                      {verb.infinitive}
                    </span>
                    <button
                      onClick={() => speak(verb.infinitive)}
                      title="Ascolta la pronuncia"
                      className="p-1 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm font-semibold text-emerald-400 mt-0.5">
                    {verb.translationZh}
                  </div>
                  <div className="text-xs text-slate-400">
                    {verb.translationEn}
                  </div>
                </div>

                {/* Category Pill Tag */}
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase shrink-0 border"
                  style={{
                    backgroundColor: `${catMeta.color}15`,
                    borderColor: `${catMeta.color}40`,
                    color: catMeta.color,
                  }}
                >
                  {catMeta.badge}
                </span>
              </div>

              {/* Special Note if any */}
              {verb.notes && (
                <div className="mt-3 text-[11px] text-amber-200/90 bg-amber-950/40 border border-amber-500/20 px-2.5 py-1.5 rounded-lg leading-relaxed">
                  💡 {verb.notes}
                </div>
              )}

              {/* Conjugation preview toggle */}
              <div className="mt-4 pt-3 border-t border-indigo-900/40">
                <button
                  onClick={() => {
                    sound.playClick();
                    setExpandedVerbId(isExpanded ? null : verb.id);
                  }}
                  className="w-full flex items-center justify-between text-xs font-semibold text-indigo-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span>{isExpanded ? 'Nascondi Coniugazione ▲' : 'Vedi Coniugazione Completa (六人称) ▼'}</span>
                  <span className="font-mono text-[10px] text-slate-500">io, tu, lui...</span>
                </button>

                {isExpanded && (
                  <div className="mt-3 grid grid-cols-2 gap-1.5 text-xs animate-in fade-in duration-200">
                    {(Object.keys(verb.conjugations) as Array<keyof VerbItem['conjugations']>).map((pKey) => {
                      const conjugated = verb.conjugations[pKey];
                      return (
                        <div
                          key={pKey}
                          onClick={() => speak(conjugated)}
                          title="Clicca per ascoltare"
                          className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-indigo-950/70 border border-indigo-800/40 hover:bg-indigo-900/60 transition-colors cursor-pointer group"
                        >
                          <span className="text-slate-400 text-[11px] font-medium">{PRONOUN_LABELS[pKey]?.it}</span>
                          <span className="font-display font-bold text-amber-300 group-hover:text-white transition-colors">
                            {conjugated}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredVerbs.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          Nessun verbo trovato per &quot;{searchQuery}&quot;. Prova con un&apos;altra parola!
        </div>
      )}
    </div>
  );
};
