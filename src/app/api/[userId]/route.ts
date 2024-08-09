'use server'
import { prisma }from '@/src/lib/prisma/prisma'
import { sort, sortDesc } from '@/src/utils';

export async function GET(request: Request, { params }: { params: { userId: string }}) {
    try{
        const id = params.userId;
        let tasks = await prisma.task.findMany({
            where: {
                userId: `${id}`
            }
        })
        tasks = sort(tasks);
        return new Response(JSON.stringify(tasks));
    } catch (error : any) {
        return new Response(`Error: ${error.message}`, {
            status: 400,
        })
    }
}
