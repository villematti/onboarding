import axios from "axios"
import { KEY_TASKS } from "../constants/constants";
import { ITaskModel } from "../models/ITaskModel";
import { IUserModel } from "../models/IUserModel";

export const fetchUsers = async () => {
    const res = await axios.get<IUserModel[]>('https://jsonplaceholder.typicode.com/users');
    return res.data;
}

export const fetchTasks = async (userId: number) => {
    const { data } = await axios.get<ITaskModel[]>('https://jsonplaceholder.typicode.com/todos');
    let modifiedTasks: ITaskModel[] = [];
    const storedTasks = localStorage.getItem(KEY_TASKS);
    if (storedTasks) modifiedTasks = JSON.parse(storedTasks);
    return data.filter(t => t.userId === userId).map(x => {
        let currentTask = x;
        modifiedTasks.forEach(y => {
            if (y.id === x.id) currentTask = y;
        });
        return currentTask;
    });
    return data.filter(t => t.userId === userId);
}

export const updateTask = async (task: ITaskModel) => {
    const res = await axios.put<ITaskModel>(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {...task});
    return res.data;
}