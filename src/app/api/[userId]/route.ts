'use server'
import { prisma }from '@/src/lib/prisma/prisma'

export async function GET(request: Request, { params }: { params: { userId: string }}) {
    try{
        const id = params.userId;
        const tasks = await prisma.task.findMany({
            where: {
                userId: `${id}`
            }
        })
        return new Response(JSON.stringify(tasks));
    } catch (error : any) {
        return new Response(`Error: ${error.message}`, {
            status: 400,
        })
    }
}