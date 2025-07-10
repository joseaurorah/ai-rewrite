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


    return (
        <>
            <div className="pb-10">
                <div className="container">
                    <div className="flex justify-between gap-5 md:flex-row flex-col">
                        <div className="flex-1 relative">
                            <Textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder='Write something to paraphrase...' className='pr-14 rounded-md border min-h-[300px] md:h-[55vh] max-h-screen bg-muted focus-visible:ring-accent_one' />
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button onClick={() => copyText(userInput)} className='absolute right-3 top-3 px-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                            </svg>

                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side='right'>
                                        <p>Copy input</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <span className={`text-sm ${userInput.length < 2000 ? "text-accent_one" : "text-red-600"} font-semibold`}>{userInput.length} characters</span>
                        </div>
                        <Button disabled={isLoading || userInput.length < 20 || userInput.length >= 2000} className='md:hidden flex justify-center mt-5 w-fit mx-auto  -translate-x-0 md:-order-none md:-translate-x-1/2 px-6 rounded-full text-lg' onClick={() => paraphrase(userInput, activeStyle, activeLanguage)}>Paraphrase</Button>
                        <div className="flex-1 relative">
                            <Textarea readOnly={!isOutputEditable} onChange={(e) => setUserOutput(e.target.value)} value={userOutput} placeholder='Your output will be here' className={`${!isOutputEditable ? "ring-0 focus-visible:ring-0" : " ring-2 ring-accent_one focus-visible:ring-accent_one"} pr-14 rounded-md border min-h-[300px] md:h-[55vh] max-h-screen bg-muted`} />

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button onClick={() => copyText(userOutput)} className='absolute right-3 top-3 px-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                            </svg>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side='right'>
                                        <p>Copy output</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button onClick={() => setIsOutputEditable(prev => !prev)} className={`${isOutputEditable ? "animate-none" : ""} absolute right-3 top-14 px-2`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-5 ${isOutputEditable ? "animate-pulse" : ""} `}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side='right'>
                                        <p>Edit output</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <span className={`text-sm text-accent_one font-semibold`}>{userOutput.length} characters</span>
                        </div>
                    </div>
                    <Button disabled={isLoading || userInput.length < 20 || userInput.length >= 2000} className='justify-center mt-5 w-fit mx-auto  -translate-x-0 md:flex hidden md:-translate-x-1/2 px-6 rounded-full text-lg' onClick={() => paraphrase(userInput, activeStyle, activeLanguage)}>Paraphrase</Button>
                </div>
            </div >
        </>
    )
}

export default Evaluation