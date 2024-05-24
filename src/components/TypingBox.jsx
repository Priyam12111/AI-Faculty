import { useAITeacher } from "@/hooks/useAITeacher";
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
export const TypingBox = () => {
  const askAI = useAITeacher((state) => state.askAI);
  const [question, setQuestion] = useState("");
  const ask = () => {
    askAI(question);
  };

  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert(
        "Your browser does not support voice recognition. Please use a supported browser like Chrome."
      );
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      document.querySelector("#QuestionInput").value = transcript;
      askAI(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };
  const [isListening, setIsListening] = useState(false);

  return (
    <div className="z-10 max-w-[600px] flex space-y-6 flex-col bg-gradient-to-tr from-slate-300/30 via-gray-400/30 to-slate-600-400/30 p-4 backdrop-blur-md rounded-xl border-slate-100/30 border">
      <div>
        <h2 className="text-white font-bold text-xl">Please ask a question</h2>
        <p className="text-white/65">
          Type a sentence you want to say and the AI will provide the best
          explanation of that topic
        </p>
      </div>
      <div className="flex justify-center items-center">
        <span className="relative flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
        </span>
      </div>
      <div className="gap-3 flex">
        <input
          id="QuestionInput"
          className="focus:outline focus:outline-white/80 flex-grow bg-slate-800/60 p-2 px-4 rounded-full text-white placeholder:text-white/50 shadow-inner shadow-slate-900/60"
          placeholder="Tell your thoughts priyam!"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              ask();
            }
          }}
        />
        <button
          className="bg-slate-100/20 p-2 px-6 rounded-full text-white"
          onClick={ask}
        >
          Ask
        </button>
        <button
          className={`${isListening ? "bg-red-500" : "bg-blue-500"} hover:${
            isListening ? "bg-red-700" : "bg-blue-700"
          } text-white font-bold py-2 px-6 rounded-full shadow-lg flex items-center`}
          onClick={handleVoiceInput}
        >
          <i className="fas fa-microphone mr-2"></i>
          {isListening ? "Listening..." : "Voice Input"}
        </button>
      </div>
    </div>
  );
};
