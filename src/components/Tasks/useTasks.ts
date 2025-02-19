import { api } from "@/API/config";
import useTodos from "@/providers/useTodos"
import { Task, authResponse } from "@/types/API";

export function useTaskActions() {
    const { tasks, setTasks } = useTodos();

    return {
        createTask: (newTask: Task) => createTask({ tasks, setTasks, newTask }),
        completeTask: (id: string) => completeTask({ id, tasks, setTasks }),
        editTask: (newTask: Task) => editTask({ tasks, setTasks, newTask }),
        deleteTask: (id: string) => deleteTask({ id, tasks, setTasks })
    };
}

export type UseTasks = {
    id?: string,
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    newTask?: Task
}

type UseAuth = {
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export const getFormattedDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Mes comienza en 0
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const createTask = async ({ tasks, setTasks, newTask }: UseTasks) => {
    await api.post<Task[]>('/tasks', newTask).then(response => {
        setTasks([...tasks, response.data[0]])
        return response
    })
}

export const editTask = async ({ setTasks, newTask }: UseTasks) => {
    if (!newTask?.id) return; // Evita errores si el ID es undefined

    try {
        const response = await api.patch<Task>(`/tasks/${newTask.id}`, newTask);

        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === newTask.id ? response.data[0] : task
            )
        );
    } catch (error) {
        console.error("Error al editar la tarea:", error);
    }
};


export const getAuthData = async ({ setIsAuthenticated, setTasks }: UseAuth) => {
    api.get<authResponse>('/login/auth')
        .then(response => {
            const { authenticated } = response.data
            setIsAuthenticated(authenticated)

            if (authenticated) {
                return getAllTask({ setTasks })
            }
        })
}

export const getAllTask = ({ setTasks }: UseTasks) => {
    api.get<Task[]>('/tasks')
        .then(response => {
            const sortedTasks = response.data.sort((a, b) => {
                const dateA = new Date(a.created_at)
                const dateB = new Date(b.created_at)

                return dateA.getTime() - dateB.getTime()
            })
            setTasks(sortedTasks)
        })
}

export async function deleteTask({ id, tasks, setTasks }: UseTasks) {
    const TaskCopy = tasks
    setTasks(tasks.filter((task) => task.id !== id))
    try {
        const response = await api.delete(`/tasks/${id}`)
        if (response.status !== 200) {
            throw new Error('Error deleting task')
        }
        return response.data
    } catch (err) {
        console.error(err)
        setTasks([...TaskCopy])
    }
}

export async function completeTask({ id, setTasks }: UseTasks) {
    if (!id) return; // Evita errores si el ID es undefined

    try {
        const response = await api.patch<Task>(`/tasks/complete/${id}`);

        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? response.data[0] : task
            )
        );
    } catch (error) {
        console.error("Error al editar la tarea:", error);
    }
};