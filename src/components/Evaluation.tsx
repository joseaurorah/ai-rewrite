"use client"

import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useEffect, useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface EvaluationProps {
    activeStyle: string,
    activeLanguage: string,
}

function Evaluation({ activeStyle, activeLanguage }: EvaluationProps) {


    const [userInput, setUserInput] = useState("")
    const [userOutput, setUserOutput] = useState("")
    const [isOutputEditable, setIsOutputEditable] = useState(false)
    const [isLoading, setisLoading] = useState(false)

    // Make sure to include these imports:
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
        // Handle the case where apiKey is undefined
        return <div>Error: API key is missing.</div>;
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    async function paraphrase(input: string, tone: string, language: string) {
        setisLoading(true)
        const prompt = `You are a professional content writer. Your task is to rewrite the following text: ${input} according to a ${tone} tone. The output will be in ${language} language. Do not add emojis in the output unless explicitly said by the user. Your output length should approximately be equal to the input length of the user`

        console.log(prompt);
        

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        setUserOutput(text)

        setisLoading(false)
    }

    function copyText(text: string) {
        navigator.clipboard.writeText(text)
    }

    // Add a helper function to count words
    function countWords(text: string) {
        return text.trim().split(/\s+/).filter(Boolean).length;
    }


    return (
        <>
            <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 pb-10">
                <div className="max-w-7xl w-full bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden mx-auto">
                    {/* Left Column */}
                    <div className="flex-1 flex flex-col px-2 py-4">
                        <Textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder='Write something to paraphrase...' className='rounded-xl border min-h-[250px] md:h-[55vh] max-h-screen bg-white focus-visible:ring-accent_one text-base font-light resize-none overflow-auto' />
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button onClick={async () => {
                                                if (navigator.clipboard) {
                                                    const text = await navigator.clipboard.readText();
                                                    setUserInput(text);
                                                }
                                            }} className='px-3 py-2 bg-green-50 hover:bg-green-100 rounded-full'>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="#16a34a" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 0C11.2347 0 10.6293 0.125708 10.1567 0.359214C9.9845 0.44429 9.82065 0.544674 9.68861 0.62717L9.59036 0.688808C9.49144 0.751003 9.4082 0.803334 9.32081 0.853848C9.09464 0.984584 9.00895 0.998492 9.00053 0.999859C8.99983 0.999973 9.00019 0.999859 9.00053 0.999859C7.89596 0.999859 7 1.89543 7 3H6C4.34315 3 3 4.34315 3 6V20C3 21.6569 4.34315 23 6 23H18C19.6569 23 21 21.6569 21 20V6C21 4.34315 19.6569 3 18 3H17C17 1.89543 16.1046 1 15 1C15.0003 1 15.0007 1.00011 15 1C14.9916 0.998633 14.9054 0.984584 14.6792 0.853848C14.5918 0.80333 14.5086 0.751004 14.4096 0.688804L14.3114 0.62717C14.1793 0.544674 14.0155 0.44429 13.8433 0.359214C13.3707 0.125708 12.7653 0 12 0ZM16.7324 5C16.3866 5.5978 15.7403 6 15 6H9C8.25972 6 7.61337 5.5978 7.26756 5H6C5.44772 5 5 5.44772 5 6V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V6C19 5.44772 18.5523 5 18 5H16.7324ZM11.0426 2.15229C11.1626 2.09301 11.4425 2 12 2C12.5575 2 12.8374 2.09301 12.9574 2.15229C13.0328 2.18953 13.1236 2.24334 13.2516 2.32333L13.3261 2.37008C13.43 2.43542 13.5553 2.51428 13.6783 2.58539C13.9712 2.75469 14.4433 3 15 3V4H9V3C9.55666 3 10.0288 2.75469 10.3217 2.58539C10.4447 2.51428 10.57 2.43543 10.6739 2.37008L10.7484 2.32333C10.8764 2.24334 10.9672 2.18953 11.0426 2.15229Z" />
                                                </svg>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side='top'>
                                            <p>Paste</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button onClick={() => copyText(userInput)} className='px-3 py-2 bg-green-50 hover:bg-green-100 rounded-full'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#16a34a" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                                </svg>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side='top'>
                                            <p>Copy input</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <span className={`text-sm ${countWords(userInput) > 1000 ? "text-red-600" : "text-accent_one"} font-semibold`}>{countWords(userInput)}/1000 Words</span>
                            </div>
                            <Button disabled={isLoading || userInput.length < 20 || userInput.length >= 2000} className='px-6 py-2 rounded-full text-lg bg-green-600 hover:bg-green-700 text-white shadow transition-colors duration-200' onClick={() => paraphrase(userInput, activeStyle, activeLanguage)}>
                                {isLoading ? "Paraphrasing..." : "Paraphrase"}
                            </Button>
                        </div>
                    </div>
                    {/* Divider */}
                    <div className="hidden md:block w-px bg-gray-200"></div>
                    <div className="block md:hidden h-px w-full bg-gray-200"></div>
                    {/* Right Column */}
                    <div className="flex-1 flex flex-col px-2 py-4">
                        <Textarea readOnly={!isOutputEditable} onChange={(e) => setUserOutput(e.target.value)} value={userOutput} placeholder='Your output will be here' className={`rounded-xl border min-h-[250px] md:h-[55vh] max-h-screen bg-white text-base font-light resize-none overflow-auto ${!isOutputEditable ? "ring-0 focus-visible:ring-0" : " ring-2 ring-accent_one focus-visible:ring-accent_one"}`} />
                        <div className="flex items-center justify-between mt-2">
                            <span className={`text-sm text-accent_one font-semibold`}>{countWords(userOutput)} words</span>
                            <div className="flex items-center gap-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button onClick={() => copyText(userOutput)} className='px-3 py-2 bg-green-50 hover:bg-green-100 rounded-full'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#16a34a" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                                </svg>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side='top'>
                                            <p>Copy output</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button onClick={() => setIsOutputEditable(prev => !prev)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#64748b" className={`w-5 h-5 ${isOutputEditable ? "animate-pulse" : ""} `}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side='top'>
                                            <p>Edit output</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Evaluation