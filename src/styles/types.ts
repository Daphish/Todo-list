export type Task = {
    title: string;
    description: string;
    deadline: string | null;
    state: 'Completada' | 'Pendiente';
    userId: string;
}

export type Taskdb = Task & {
    id: number;
}