import { useAITeacher } from "@/hooks/useAITeacher";
import { useEffect, useRef } from "react";

export const MessagesList = () => {
  const messages = useAITeacher((state) => state.messages);
  const playmessage = useAITeacher((state) => state.playmessage);
  const { currentMessage } = useAITeacher();
  const english = useAITeacher((state) => state.english);
  const teacherName = useAITeacher((state) => state.teacher);
  const classroom = useAITeacher((state) => state.classroom);

  const container = useRef();

  useEffect(() => {
    container.current.scrollTo({
      top: container.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length]);

  const renderEnglish = (englishText) => (
    <>
      {english && (
        <p className="text-4xl inline-block px-2 rounded-sm font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-300/90 to-white/90">
          {englishText}
        </p>
      )}
    </>
  );

  return (
    <div
      className={`${
        classroom === "default"
          ? "w-[1288px] h-[676px]"
          : "w-[2528px] h-[856px]"
      } p-8 overflow-y-auto flex flex-col space-y-8 bg-transparent opacity-80`}
      ref={container}
    >
      {messages.length === 0 && (
        <div className="h-full w-full grid place-content-center text-center">
          <h2 className="text-8xl font-bold text-red-600 italic">
            Welcome to the class!
          </h2>
          <h2 className="text-6xl font-semibold text-blue-600 mt-4">
            I'm {teacherName === "Nanami" ? "Nandani Tomar" : "Manoj Kumar"}
          </h2>
        </div>
      )}
      {messages.map((message, i) => (
        <div key={i}>
          <div className="flex">
            <div className="flex-grow">
              <div className="flex items-center gap-3">
                <span
                  className={`text-white/90 text-2xl font-bold uppercase px-3 py-1 rounded-full  ${
                    message.speech === "formal"
                      ? "bg-indigo-600"
                      : "bg-teal-600"
                  }`}
                >
                  {message.speech}
                </span>
              </div>
            </div>
            <button
              className="text-white/65"
              onClick={() => playmessage(message)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                />
              </svg>
            </button>
          </div>
          <div className="p-5 mt-5  bg-gradient-to-br from-pink-200/20 to-pink-500/20 rounded-xl">
            <span className="pr-4 italic bg-clip-text text-transparent bg-gradient-to-b from-white/90 to-white/70 text-3xl font-bold uppercase inline-block">
              Question:{message.question}
            </span>
          </div>
          <div className="p-5  bg-clip-text text-transparent bg-gradient-to-b from-white/90 to-white/70 text-3xl font-bold uppercase inline-block">
            Answer: {message.answer.content}
          </div>
        </div>
      ))}
    </div>
  );
};
