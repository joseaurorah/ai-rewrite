"use client"

import { useState } from "react";
import Evaluation from "@/components/Evaluation";
import Header from "@/components/Header";
import LanguageTabs from "@/components/LanguageTabs";

const modes = [
  {
    language: "english (us)",
    tones: ["standard", "natural", "formal", "academic", "informal", "funny"]
  },
  {
    language: "english (uk)",
    tones: ["standard", "natural", "formal", "academic", "informal", "funny"]
  },
  {
    language: "spanish",
    tones:  ["standard", "natural", "formal", "academic", "informal", "funny"]
  },
  {
    language: "french",
    tones: ["standard", "natural", "formal", "academic", "informal", "funny"]
  }
];



export default function Home() {
  const [activeStyle, setActiveStyle] = useState<string>(modes[0]?.tones[0]);
  const [activeLanguage, setActiveLanguage] = useState<string>(modes[0]?.language);
  return (
    <>
      <Header />
      <LanguageTabs activeStyle={activeStyle} setActiveStyle={setActiveStyle} activeLanguage={activeLanguage} setActiveLanguage={setActiveLanguage} modes={modes} />
      <Evaluation activeStyle={activeStyle} activeLanguage={activeLanguage}/>
    </>
  );
}
