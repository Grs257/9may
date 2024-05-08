import React, { useState, useEffect, useRef } from "react";
import "./LoveLetter.css";
import audioFile1 from "./1.mp3";
import audioFile2 from "./song3.mp3";
import audioFile3 from "./song2.mp3";
import background1 from "./BH1.jpg";
import background2 from "./BH2.jpg";
import background3 from "./BH3.jpg";
import bg from "./BG.jpg";
import bg2 from "./BG2.jpg";
import bg3 from "./BG3.jpg";

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
        <p>
          Nenu naa childhood lo edhaina unte bagundedhi ani anukune vishyam ento
          telsa adhi nee childhood birthdays appudaithey nee cute cute face
          chusthu😁,
        </p>
        <p>
          Happy Birthday to you ani cheppi happy ayye vadni kadha ani
          alochistha.
        </p>
        <p>
          Ponile mana pelli nundi prathi birthday full joy ga celebrate
          cheskundham
        </p>
        <p>
          <strong color="Red">Love you baby😘😘😘</strong>
          <br />
          with love, nee childhood miss aina pilladni ❤️
        </p>
      </div>
    ),
  },
  {
    id: 2,
    audio: audioFile2,
    background: bg2,
    animationClass: "animation2",
    content: (
      <div>
        <p>
          Mana Vayasulo unnappudu mana cheyyavalsina konni badhyatalu mana medha
          untai ala ani manaki okari medha prema inkokari taggipothundhi ani
          kadhu chupinchukune time undadhu anthe
        </p>
        <p>
          Mana pillalu, mana parents,mana works,mana idealogy share
          cheskovadam,chinna godavalu aa taravata bujjaginchukovadam ila anni ee
          phase lone untai so chala patentience avasaram naku unnantha patience
          lekapoina parledhu nuv kuda handle cheyyagalav ani nammuthunna 😉😅😂
        </p>
        <p>
          <strong color="Red">Love you Pellam😘😘😘</strong>
          <br />
          Itlu, Prema tho nee mogudu ❤️
        </p>
      </div>
    ),
  },
  {
    id: 3,
    audio: audioFile3,
    background: bg3,
    animationClass: "animation3",
    content: (
      <div>
        <p>
          Ee phase lo full time untundhi ika mana istam anuko prathi roju mana
          nacchina time ki lechi ala oka morning walk,sayanthram oka evening
          walk prathi vishyam lo manaki prapancham tho pani lekunda nuvvu nenu
          anthe, challani sayantralalo chakkaga comfort unna chairs pakka
          pakkana veskuni manam appati varaku gadipina moments ni share
          cheskuntu blush avthu cherish aavdham ematav bokkipallu pellama🤣
        </p>
        <p>
          Manam musali ayyaka nee palla settu dachesi ata pattistha 🤣 nuv
          cheppindhi naku vinapadadhu em antunnave tingari ani vekkiristhu aa
          sayantralu netho gadipestha 😘😘😘
        </p>
        <p>
          <strong color="Red">Love you bokkipallu musali😘😘😘</strong>
          <br />
          Itlu, Prema tho nee sound engineer musalodu ❤️
        </p>
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
