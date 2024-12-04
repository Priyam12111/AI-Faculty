const { create } = require("zustand");
import { saveAs } from "file-saver";
export const teachers = ["Nanami", "Naoki"];
export const useAITeacher = create((set, get) => ({
  messages: [],
  currentMessage: null,
  teacher: teachers[0],
  setTeacher: (teacher) => {
    set(() => ({
      teacher,
      messages: get().messages.map((message) => {
        message.audioPlayer = null; // New teacher, new Voice
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
    const res = await fetch(`/api/ai?question=${question}&speech=${speech}`);
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
    get().playMessage(message);
  },
  playMessage: async (message) => {
    try {
      set(() => ({
        currentMessage: message,
      }));

      if (!message.audioPlayer) {
        set(() => ({
          loading: true,
        }));
      }

      // Fetch the audio from the Flask API
      const response = await fetch(
        `https://priyam144.pythonanywhere.com/generate-speech?msg=${message.answer.ans[0]}&lang=en`
      );
      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        const audio = new Audio(audioUrl);
        audio.play();

        // Update loading state
        set(() => ({
          loading: false,
        }));
      } else {
        throw new Error("Failed to fetch audio");
      }
    } catch (error) {
      console.error("Error in playMessage:", error);
      set(() => ({
        loading: false,
      }));
    }
  },

  stopMessage: (message) => {
    set(() => ({
      currentMessage: null,
    }));
  },
}));
