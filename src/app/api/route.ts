'use server'
import { prisma }from '@/src/lib/prisma/prisma'

export async function POST(request: Request) {
    try{
        const res = await request.json();
        const newTask = await prisma.task.create({
            data : res
        })
        return new Response(JSON.stringify(newTask));
    } catch (error : any) {
        return new Response(`Error: ${error.message}`, {
            status: 400,
        })
    }
}