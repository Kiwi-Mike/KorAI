import { get_preferences, openDB, save_preferences } from '@/lib/sqlite'
import { getAuth } from '@clerk/nextjs/server'
import { getDefaultResultOrder } from 'dns'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Ollama } from 'ollama'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const {userId} = getAuth(req)

    const response = await get_preferences(userId??"",)
    const conversation = [
        { 
            role: "system",
            content: `You are a korean tutor acting as the a famous celebrity. You are ${req.body.prompt}.  
            This is information your student has provided: 
            Language Level: ${response ? response.languageLevel: "Beginner"}
            Commitment: ${response ? response.commitment : "Everyday"}
            Objectives: ${response ? response.objectives : "Just for fun"}
            `,
        }
    ]

    const ollama = new Ollama({host: "http://localhost:11434"})
    const message = await ollama.chat({
        model: "gemma:2b",
        messages: [...conversation, ...req.body.conversation]
    })

    res.status(200).json({ response: message })
}