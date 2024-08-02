'use server'
import { prisma }from '@/src/lib/prisma/prisma'
import { Task } from '@/src/styles/types';

export async function POST(request: Request) {
    try{
        const res = await request.json();
        const newTask = prisma.task.create({
            data : {
                title: `${res.title}`
            }
        })
        return new Response(JSON.stringify(newTask));
    } catch (error : any) {
        return new Response(`Error: ${error.message}`, {
            status: 400,
        })
    }
}    