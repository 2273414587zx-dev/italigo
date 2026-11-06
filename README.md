# Italigo · Kahoot! Italiano

一个把意大利语动词变位复习做成 **Kahoot! 风格**的互动答题网页应用：四色图形答题卡、倒计时速度计分、连击加成、Web Audio 音效、意大利语语音朗读（TTS），题库覆盖 -are / -ere / -ire（含 -isc-）变位、亲属关系、核心词汇与手写笔记真题。

> 原始版本在 Google AI Studio 中生成，此仓库为完整源码导出，可直接本地运行或用任意静态托管部署。

## 功能一览

- **Kahoot! 式答题体验**：▲ 红三角、◆ 蓝菱形、● 黄圆、◼ 绿方块，支持键盘 1–4 秒选，Enter / 空格进入下一题
- **计时与计分**：15 / 20 / 30 秒或禅模式，答题越快得分越高，连续答对触发 Streak 连击加成
- **音效系统**：Web Audio API 合成的倒计时滴答、答对和弦、答错蜂鸣、连击与冠军号角，另有背景音乐
- **意大利语发音**：浏览器语音合成（SpeechSynthesis）朗读题目与词汇
- **题库**：动词三大变位（-are / -ere / -ire、-isc-）、物主形容词、AVERE 固定搭配、月份与日期、亲属关系（含 130+ 题题库）、核心词汇与反义词、手写笔记真题
- **颁奖台**：完赛胜率复盘、错题重练、每日连胜打卡（localStorage 记录连续天数）

## 技术栈

- React 19 + TypeScript
- Vite 8（`@vitejs/plugin-react`）
- Tailwind CSS 4（`@tailwindcss/vite`）
- lucide-react 图标、canvas-confetti 礼花、motion 动效

## 本地运行

```bash
npm install
npm run dev      # http://localhost:3000
```

生产构建：

```bash
npm run build    # 产物输出到 dist/
npm run preview
```

## 目录结构

```
index.html
vite.config.ts
tsconfig.json
src/
  main.tsx                 应用入口
  App.tsx                  主状态机（lobby / playing / feedback / podium ...）
  index.css                Tailwind 入口与全局样式
  types/game.ts            题型与状态类型定义
  utils/audio.ts           Web Audio 音效与 TTS
  utils/streak.ts          每日连胜本地存储逻辑
  data/
    verbs.ts               三大变位动词库
    questions.ts           题库聚合与出题逻辑
    advancedTenseQuestions.ts  复合时态（近过去时等）题库
    familyQuestions.ts     亲属关系题库
    massiveFamilyBank.ts   亲属关系扩展题库
    vocabularyData.ts      核心词汇题库
    notebookAvereAndDates.ts   AVERE 与月份日期真题
    notebookPossessives.ts    物主形容词真题
  components/
    Navbar.tsx             顶部导航与计分显示
    KahootLobby.tsx        大厅：选题库、难度、时长
    KahootQuestionCard.tsx 答题卡（四色选项 + 倒计时）
    KahootFeedbackModal.tsx 答对/答错反馈
    KahootPodium.tsx       颁奖台与复盘
    VerbExplorerModal.tsx  动词词典
    GrammarRuleGuide.tsx   变位规则与口诀
    FamilyGuide.tsx        亲属关系秘籍
    VocabGuideModal.tsx    核心词汇宝典
    DailyStreakModal.tsx   每日打卡日历
```

## 说明

- 发音依赖浏览器语音合成，Chrome / Edge / Safari 体验最佳；部分系统未安装意大利语语音包时发音可能不准确。
- 打卡与连胜数据保存在浏览器 localStorage，不会上传到服务器。
