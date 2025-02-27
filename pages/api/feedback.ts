import { get_preferences, openDB, save_preferences } from '@/lib/sqlite'
import { getAuth } from '@clerk/nextjs/server'
import { getDefaultResultOrder } from 'dns'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Ollama } from 'ollama'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    const conversation = [
        {
            role: "system",
            content: `You are a Korean Language Tutor who strictly only provides corrections to Korean Language spelling or grammatical errors and no other content`
        },
        {
            role: "assistant",
            content: `Which content can I review?`
        },
        {
            role: "user",
            content: `Correct any spelling or grammar errors in this message: Message =${req.body.message}`,
        }
    ]

    const ollama = new Ollama({ host: "http://localhost:11434" })
    const message = await ollama.chat({
        model: "gemma:2b",
        messages: conversation
    })

    res.status(200).json({ response: message })
}