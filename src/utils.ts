import { Taskdb } from "./styles/types";


function parseDate(dateStr : string) {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
}

export function sort(tasks : Taskdb[]) {
    let sortedTasks = tasks;
    sortedTasks.sort((a, b) => {
        if(!a.deadline) return 1;
        if(!b.deadline) return -1;
        return (parseDate(a.deadline)).getTime() - (parseDate(b.deadline)).getTime();
    });
    return sortedTasks;
}

export function sortDesc(tasks : Taskdb[]) {
    let initTasks = tasks;
    const sortedTasks = initTasks.sort((a, b) => {
        if(!b.deadline){
            return 1
        }
        if(!a.deadline){
            return -1
        }
        return (parseDate(b.deadline)).getTime() - (parseDate(a.deadline)).getTime();
    });
    console.log(sortedTasks)
    return sortedTasks;
}