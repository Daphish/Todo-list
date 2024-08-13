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

export async function PATCH(request: Request) {
    try {
        const res = await request.json();
        const completedTask = await prisma.task.update({
            where: {
                id: res,
            },
            data: {
                state: 'Completada',
            },
        })
        return new Response(JSON.stringify(completedTask));
    } catch (error : any) {
        return new Response(`Error : ${error.message}`, {
            status: 400,
        })
    }
}

export async function PUT(request: Request) {
    try {
        const res = await request.json();
        const updatedTask = await prisma.task.update({
            where: {
                id: res.id,
            },
            data: res
        })
        return new Response(JSON.stringify(updatedTask));
    } catch (error : any) {
        return new Response(`Error : ${error.message}`, {
            status: 400,
        })
    }
}

export async function DELETE(request: Request) {
    try {
        const res = await request.json();
        const deletedTask = await prisma.task.delete({
            where: {
                id: res,
            },
        })
        return new Response(JSON.stringify(deletedTask));
    } catch (error : any) {
        return new Response(`Error : ${error.message}`, {
            status: 400,
        })
    }
}