"use client"

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Ensure you have this dependency installed
import { Button } from './ui/button';

interface Mode {
    language: string;
    tones: string[];
}


interface LanguageTabsProps {
    modes: Mode[];
    activeStyle: string,
    setActiveStyle: React.Dispatch<React.SetStateAction<string>>,
    activeLanguage: string,
    setActiveLanguage: React.Dispatch<React.SetStateAction<string>>,
}

const LanguageTabs = ({ modes, activeStyle, setActiveStyle, activeLanguage, setActiveLanguage }: LanguageTabsProps) => {
    
    return (
        <div className="w-full bg-white">
            <div className="max-w-7xl w-full mx-auto pt-8 pb-0"> {/* Consistent width with columns and header */}
                {/* Language Tabs as horizontal tab bar */}
                <div className="flex border-b border-gray-200 mb-2 overflow-x-auto whitespace-nowrap -mx-2 px-2">
                    {modes.map((item, idx) => (
                        <button
                            key={item.language}
                            className={`px-6 py-2 transition font-semibold text-base
                                ${activeLanguage === item.language
                                    ? "bg-white text-green-700 font-bold border-t-2 border-x-2 border-green-600 z-10"
                                    : "bg-gray-100 text-gray-700"}
                                ${idx === 0 ? "rounded-tl-md" : ""}
                                ${idx === modes.length - 1 ? "rounded-tr-md" : ""}
                            `}
                            onClick={() => setActiveLanguage(item.language)}
                        >
                            {item.language.charAt(0).toUpperCase() + item.language.slice(1).replace(/\b(us|uk)\b/gi, (m) => m.toUpperCase())}
                        </button>
                    ))}
                </div>
                {/* Modes section */}
                {modes.map((item, index) => (
                    activeLanguage === item.language && (
                        <div key={`${index}-${item.language}-tabs-content`} className='flex m-0 items-center gap-3 mb-0 overflow-x-auto whitespace-nowrap'>
                            <span className='text-md font-bold flex-shrink-0'>Modes:</span>
                            <ul className='flex gap-x-3 gap-y-1 flex-nowrap'>
                                {item.tones.map((lang, i) => (
                                    <li key={`${index}-${lang}-tabs-tones`} className="flex-shrink-0">
                                        <Button className={` text-md py-0 px-3 capitalize font-normal rounded-none bg-transparent text-black hover:text-black hover:bg-transparent ${lang == activeStyle ? "text-accent_one border-b-2 border-accent_one" : ""}`} onClick={() => setActiveStyle(lang)}>
                                            {lang}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default LanguageTabs;
