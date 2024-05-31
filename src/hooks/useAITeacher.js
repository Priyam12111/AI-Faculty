const { create } = require("zustand");
export const teachers = ["Nanami", "Naoki"];
function calculateReadingTime(input, wordsPerMinute = 200) {
  const sentence = String(input).trim();
  const words = sentence.split(/\s+/);
  const wordCount = words.length;
  const readingTime = wordCount / wordsPerMinute;
  return Math.ceil(readingTime);
}
export const useAITeacher = create((set, get) => ({
  messages: [],
  currentMessage: null,
  teacher: teachers[0],

  setTeacher: (teacher) => {
    set(() => ({
      teacher,
      messages: get().messages.map((message) => {
        return message;
      }),
    }));
  },
  classroom: "default",
  setClassroom: (classroom) => {
    set(() => ({
      classroom,
    }));
  },
  loading: false,
  furigana: true,
  setFurigana: (furigana) => {
    set(() => ({
      furigana,
    }));
  },
  english: true,
  setEnglish: (english) => {
    set(() => ({
      english,
    }));
  },
  speech: "formal",
  setSpeech: (speech) => {
    set(() => ({
      speech,
    }));
  },
  askAI: async (question) => {
    if (!question) {
      return;
    }
    const message = {
      question,
      id: get().messages.length,
    };
    set(() => ({
      loading: true,
    }));

    const speech = get().speech;

    // Ask AI
    for (let i = 0; i < 1; i++) {
      setTimeout(async () => {
        // Delay execution by 20 seconds
        if (i > 0) {
          question = "Continue 2 more lines";
        }
        const res = await fetch(
          `/api/ai?question=${question}&speech=${speech}`
        );
        const data = await res.json();
        message.answer = data;
        message.speech = speech;

        set(() => ({
          currentMessage: message,
        }));

        set((state) => ({
          messages: [...state.messages, message],
          loading: false,
        }));
        await get().playmessage(message.answer.content);

        let timeTaken = calculateReadingTime(message);
        console.log(
          `It will take approximately ${timeTaken} minutes to read the sentence.`
        );
        setTimeout(() => {
          set(() => ({
            currentMessage: null,
          }));
        }, timeTaken); // 10000 milliseconds = 10 seconds
      }, 20000 * i); // Multiply the delay by the iteration index
    }
  },
  playmessage: async (message) => {
    if ("speechSynthesis" in window) {
      const text = message;
      const utterance = new SpeechSynthesisUtterance(text);

      const voices = window.speechSynthesis.getVoices();
      let preferredVoice = voices.find(
        (voice) => voice.voiceURI === "Google UK English Female"
      );

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      } else {
        preferredVoice = voices.find(
          (voice) => voice.voiceURI === "Google UK English Female"
        );
        utterance.voice = preferredVoice;

        console.warn("No suitable voice found.");
      }

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  },
}));
