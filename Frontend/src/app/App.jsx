import React, { useState } from 'react';
import Header from './components/Header';
import ChatInput from './components/ChatInput';
import JudgePanel from './components/JudgePanel';
import SolutionCard from './components/SolutionCard';

const MOCK_DATA = {
  problem: "What is the meaning of life?",
  solution_1: "The question *\"What is the meaning of life?\"* is one of the deepest and most debated topics in philosophy, religion, science, and personal reflection. There is no single, universally accepted answer, but here are some of the most influential perspectives:\n\n### **1. Philosophical Perspectives**\n- **Existentialism (Sartre, Camus, Nietzsche):**\n  Life has no inherent meaning—it’s up to each individual to create their own purpose through choices, actions, and passions. Suffering and absurdity (the conflict between our search for meaning and a silent universe) are part of the human condition, but we must embrace freedom and responsibility.\n  - *Albert Camus:* \"The struggle itself toward the heights is enough to fill a man's heart.\"\n  - *Friedrich Nietzsche:* \"He who has a *why* to live can bear almost any *how*.\"\n\n- **Absurdism (Camus):**\n  Life may be meaningless in a cosmic sense, but we can rebel against the absurd by living passionately anyway.\n\n- **Stoicism (Marcus Aurelius, Epictetus):**\n  Meaning comes from living virtuously, accepting what we can’t control, and focusing on reason, resilience, and contributing to the common good.\n\n- **Utilitarianism (Bentham, Mill):**\n  The meaning of life is to maximize happiness and reduce suffering for the greatest number of beings.\n\n### **2. Religious & Spiritual Views**\n- **Christianity/Judaism/Islam:**\n  Life’s purpose is to serve, love, and worship God, follow divine will, and prepare for an afterlife (heaven, salvation, or union with the divine).\n  - *Bible (Ecclesiastes 12:13):* \"Fear God and keep His commandments, for this is the whole duty of man.\"\n\n- **Buddhism/Hinduism:**\n  Meaning comes from enlightenment (breaking free from suffering and the cycle of rebirth) through wisdom, compassion, and detachment.\n  - *Buddha:* \"The purpose of life is to end suffering.\"\n\n- **Taoism:**\n  Harmony with the *Tao* (the natural flow of the universe) brings meaning through simplicity, balance, and non-action (*wu wei*).\n\n### **3. Scientific Perspectives**\n- **Biological Evolution:**\n  From a purely scientific view, life’s \"purpose\" is survival and reproduction to pass on genes. However, humans uniquely seek deeper meaning beyond biology.\n\n- **Cosmic Perspective (Carl Sagan, Neil deGrasse Tyson):**\n  We are the universe’s way of understanding itself. Meaning may emerge from curiosity, exploration, and connection.\n\n- **Transhumanism/Futurism:**\n  Meaning could evolve with technology—extending life, merging with AI, or colonizing space to ensure humanity’s future.\n\n### **4. Personal & Subjective Meaning**\nMany people find meaning in:\n- **Love & Relationships** (family, friendship, romance)\n- **Creativity & Art** (expression, beauty, innovation)\n- **Knowledge & Growth** (learning, self-improvement, philosophy)\n- **Contribution & Legacy** (helping others, leaving a mark)\n- **Experiences & Joy** (travel, hobbies, simple pleasures)\n\n### **5. Nihilism vs. Optimism**\n- **Nihilism:** Life has no objective meaning, period. Some find this liberating; others, despairing.\n- **Optimistic Nihilism (Kurzgesagt):** Even if nothing matters, *you* matter to yourself and others—so make the most of it.\n\n### **A Practical Approach**\nIf you're searching for meaning, try:\n1. **Exploring** different philosophies, religions, and sciences.\n2. **Experimenting** with passions, careers, and relationships.\n3. **Helping others**—many find purpose in service.\n4. **Accepting uncertainty**—meaning can evolve over time.\n\n### **Final Thought**\nPerhaps the meaning of life isn’t a fixed answer but a *question* that drives us to live deeply, love fiercely, and leave the world better than we found it.\n\nWhat resonates with *you*? Your personal answer may be the most important one.",
  solution_2: "The question \"What is the meaning of life?\" has been pondered by philosophers, theologians, scientists, and individuals throughout history, and there is no single, universally agreed-upon answer. The meaning of life can be highly subjective and depends on one's cultural, spiritual, philosophical, or personal perspective. Here are a few ways people approach this question:\n\n1. **Existentialism**: Some argue that life has no inherent meaning, and it is up to each individual to create their own purpose and find meaning in their experiences, relationships, and actions.\n\n2. **Religious and Spiritual Perspectives**: Many religions and spiritual traditions propose that the meaning of life is tied to a higher power, divine plan, or ultimate purpose, such as serving God, achieving enlightenment, or attaining salvation.\n\n3. **Humanism**: Humanists often believe that the meaning of life lies in contributing to the well-being of others, pursuing knowledge, and fostering personal growth and happiness.\n\n4. **Scientific Perspective**: From a scientific standpoint, life can be seen as the result of natural processes, and its \"meaning\" might be found in the continuation of the species, the exploration of the universe, or the pursuit of knowledge and understanding.\n\n5. **Personal Fulfillment**: For many, the meaning of life is found in personal achievements, relationships, love, creativity, or making a positive impact on the world.\n\nUltimately, the meaning of life is a deeply personal question that each individual must explore and answer for themselves. It often evolves over time as one gains new experiences, insights, and perspectives.",
  judge: {
    solution_1_score: 10,
    solution_2_score: 7,
    solution_1_reason: "Solution 1 is exceptionally comprehensive and well-structured. It categorizes perspectives into philosophical, religious, scientific, and personal domains while providing specific examples of schools of thought (Stoicism, Utilitarianism, Absurdism) and key figures (Camus, Nietzsche, etc.). It also includes specific quotes and a 'Practical Approach' section that adds actionable value. The formatting makes it very easy to navigate.",
    solution_2_reason: "Solution 2 is a solid, accurate summary of the topic, but it lacks the depth and specificity found in Solution 1. It provides a good overview of the main perspectives but misses out on the nuances of specific philosophies and the inclusion of influential quotes or diverse scientific viewpoints like transhumanism."
  }
};

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = (message) => {
    setLoading(true);
    setTimeout(() => {
      setData({ ...MOCK_DATA, problem: message });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-white">
      <Header />
      
      <main className="flex-1 flex flex-col">
        <ChatInput onSendMessage={handleSendMessage} />

        {loading && (
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <p className="text-on-surface-variant font-mono text-sm tracking-widest animate-pulse">ANALYZING BATTLE STRATA...</p>
            </div>
          </div>
        )}

        {!loading && data && (
          <div className="pb-20">
            <JudgePanel judgeData={data.judge} />
            
            <div className="max-w-[1400px] mx-auto w-full px-8 grid lg:grid-cols-2 gap-12 items-stretch">
              <SolutionCard solutionId={1} title="Solution 1" content={data.solution_1} />
              <SolutionCard solutionId={2} title="Solution 2" content={data.solution_2} />
            </div>
          </div>
        )}

        {!loading && !data && (
          <div className="flex-1 flex flex-col items-center justify-center opacity-30">
            <div className="w-24 h-24 border border-white/10 rounded-full flex items-center justify-center mb-4">
               <span className="text-4xl">⚔️</span>
            </div>
            <p className="text-xl font-medium">Ready for Battle</p>
            <p className="text-sm text-on-surface-variant">Enter a prompt above to start the arena</p>
          </div>
        )}
      </main>

      <footer className="py-8 border-t border-white/5 text-center text-xs text-on-surface-variant/40 font-mono">
        © 2026 AI BATTLE ARENA // KINETIC STRATUM DESIGN SYSTEM
      </footer>
    </div>
  );
}

export default App;
