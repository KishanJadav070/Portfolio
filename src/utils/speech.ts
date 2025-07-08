// src/utils/speech.ts
let lastSpoken = "";
let timeout: ReturnType<typeof setTimeout>;

export const speak = (text: string) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    if (text === lastSpoken) return;
    lastSpoken = text;

    const synth = window.speechSynthesis;
    if (!synth) return;

    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 2;
    utter.volume = 1;

    synth.cancel();
    synth.speak(utter);
  }, 150);
};
