/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, LayoutGrid, List, Moon, Sun, ChevronDown, ChevronUp } from 'lucide-react';
import { COURSE_DATA, CourseNode } from './data/courseData';

export default function App() {
  const [view, setView] = useState<'mindmap' | 'list'>('mindmap');
  const [isDark, setIsDark] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300 flex flex-col overflow-hidden relative">
      {/* Header */}
      <header className="p-8 pb-4 z-30">
        <div className="flex justify-between items-start">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-wide"
          >
            【AI 實戰營】從零打造 24/7 虛擬數位員工
          </motion.h1>
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        
        <motion.button 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 w-12 h-12 border-2 border-slate-300 dark:border-slate-600 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm"
        >
          <Plus className="w-6 h-6" />
        </motion.button>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {view === 'mindmap' ? (
            <motion.div 
              key="mindmap"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="relative w-full max-w-5xl aspect-square md:aspect-[4/3]"
            >
              {/* SVG Connections */}
              <svg className="absolute inset-0 w-full h-full text-slate-300 dark:text-slate-700 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                {COURSE_DATA.map(node => (
                  <motion.line 
                    key={`line-${node.id}`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeWidth="0.3" 
                    x1={node.line.x1} 
                    x2={node.line.x2} 
                    y1={node.line.y1} 
                    y2={node.line.y2} 
                  />
                ))}
              </svg>

              {/* Central Node */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-36 md:h-36 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white dark:border-slate-900 z-20 text-white text-center p-4 font-bold text-lg md:text-xl leading-snug"
              >
                AI<br/>實戰營
              </motion.div>

              {/* Branching Nodes */}
              {COURSE_DATA.map((node, index) => (
                <motion.div 
                  key={node.id}
                  layout
                  initial={{ opacity: 0, x: -20, y: -20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  style={{ top: node.position.top, left: node.position.left }}
                  onClick={() => toggleExpand(node.id)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-4 md:px-6 md:py-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 z-10 w-48 md:w-72 hover:shadow-2xl transition-all cursor-pointer group ${expandedId === node.id ? 'ring-2 ring-blue-500' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-1 md:mb-2 text-sm md:text-base group-hover:underline decoration-2 underline-offset-4">
                      {node.title}
                    </h3>
                    {expandedId === node.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">
                    {node.description}
                  </p>
                  
                  <AnimatePresence>
                    {expandedId === node.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-slate-100 dark:border-slate-700 pt-2 mt-2 space-y-2"
                      >
                        {node.subTopics.map((topic, i) => (
                          <div key={i} className="text-[10px] md:text-xs text-slate-600 dark:text-slate-300 leading-tight border-l-2 border-blue-500 pl-2">
                            {topic}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="list"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-2xl space-y-4 overflow-y-auto max-h-[70vh] px-4"
            >
              {COURSE_DATA.map((node, index) => (
                <motion.div 
                  key={node.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => toggleExpand(node.id)}
                  className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 group hover:border-blue-500 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl shrink-0">
                      {node.id}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                          {node.title.split('. ')[1]}
                        </h3>
                        {expandedId === node.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                      <p className="text-slate-500 dark:text-slate-400">
                        {node.description}
                      </p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedId === node.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-slate-100 dark:border-slate-700 pt-4 mt-4 space-y-3"
                      >
                        {node.subTopics.map((topic, i) => (
                          <div key={i} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 text-sm">
                            {topic}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Action Buttons */}
      <div className="absolute bottom-8 right-8 flex gap-3 md:gap-4 z-40">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setView('mindmap')}
          className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
            view === 'mindmap' 
              ? 'bg-blue-600 text-white ring-4 ring-blue-500/20' 
              : 'bg-white dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'
          }`}
          title="心智圖檢視"
        >
          <LayoutGrid className="w-6 h-6 md:w-7 md:h-7" />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setView('list')}
          className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
            view === 'list' 
              ? 'bg-blue-600 text-white ring-4 ring-blue-500/20' 
              : 'bg-white dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'
          }`}
          title="列表檢視"
        >
          <List className="w-6 h-6 md:w-7 md:h-7" />
        </motion.button>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
