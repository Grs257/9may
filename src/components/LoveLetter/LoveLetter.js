import React, { useState, useEffect, useRef } from "react";
import "./LoveLetter.css";
import audioFile1 from "./1.mp3";
import audioFile2 from "./2.mp3";
import audioFile3 from "./3.mp3";
import background1 from "./BH1.jpg";
import background2 from "./BH2.jpg";
import background3 from "./BH3.jpg";
import bg from "./BG.jpg";

const backgrounds = [background1, background2, background3];
const emojis = ["❤️", "😍", "💖", "😘"];

const envelopeData = [
  {
    id: 1,
    audio: audioFile1,
    background: bg,
    animationClass: "animation1",
    content: (
      <div>
        <p>Happy Birthday, Bhama 💖,</p>
        <p>May this year bring you loads of happiness and joy.</p>
        <p>Love, Your Forever.</p>
      </div>
    ),
  },
  {
    id: 2,
    audio: audioFile2,
    background: bg,
    animationClass: "animation2",
    content: (
      <div>
        <p>Dearest Bhama,</p>
        <p>Wishing you all the success in the world in your new endeavors.</p>
        <p>Stay blessed, Your Buddy.</p>
      </div>
    ),
  },
  {
    id: 3,
    audio: audioFile3,
    background: bg,
    animationClass: "animation3",
    content: (
      <div>
        <p>Hello Bhama!</p>
        <p>Let's make this birthday the beginning of an adventurous year.</p>
        <p>Yours adventurously, The Explorer.</p>
      </div>
    ),
  },
];

const Envelope = ({ data, onToggle, isOpen }) => {
  const audioRef = useRef(new Audio(data.audio));

  useEffect(() => {
    const audio = audioRef.current;
    return () => audio && audio.pause();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (isOpen) {
      audio.play().catch((error) => console.error("Failed to play:", error));
    } else {
      audio.pause();
    }
  }, [isOpen]);

  return (
    <div
      className={`envelope ${data.animationClass} ${isOpen ? "open" : ""}`}
      style={{ backgroundImage: `url(${data.background})` }}
      onClick={() => onToggle(data.id)}
    >
      <div className="flap"></div>
      <div className="body"></div>
      <div className={`letter ${isOpen ? "fullSize" : ""}`}>{data.content}</div>
    </div>
  );
};

const LoveLetter = () => {
  const [openEnvelopeId, setOpenEnvelopeId] = useState(null);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [emojiList, setEmojiList] = useState([]);

  useEffect(() => {
    const backgroundChangeInterval = setInterval(() => {
      setBackgroundIndex((current) => (current + 1) % backgrounds.length);
    }, 10000); // Change background every 10 seconds

    const emojiInterval = setInterval(() => {
      const newEmoji = {
        id: Math.random(),
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        style: {
          top: `${Math.random() * 100}vh`,
          left: `${Math.random() * 100}vw`,
          animation: "popIn 5s ease-in forwards",
        },
      };
      setEmojiList((current) => [...current, newEmoji]);
      setTimeout(() => {
        setEmojiList((current) => current.filter((e) => e.id !== newEmoji.id));
      }, 5000);
    }, 500);

    return () => {
      clearInterval(backgroundChangeInterval);
      clearInterval(emojiInterval);
    };
  }, []);

  return (
    <div
      className="container"
      style={{ backgroundImage: `url(${backgrounds[backgroundIndex]})` }}
    >
      {envelopeData.map((data) => (
        <Envelope
          key={data.id}
          data={data}
          isOpen={openEnvelopeId === data.id}
          onToggle={(id) =>
            setOpenEnvelopeId(openEnvelopeId === id ? null : id)
          }
        />
      ))}
      {emojiList.map((emoji) => (
        <span key={emoji.id} className="emoji" style={emoji.style}>
          {emoji.emoji}
        </span>
      ))}
    </div>
  );
};

export default LoveLetter;
