import { Task } from '@/types/API';
import { createContext, useState } from 'react';

type Props = {
    children: React.ReactNode
}

const TodoContext = createContext({} as { tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>> })

export function TodoProvider({ children }: Props) {
    const [tasks, setTasks] = useState<Task[]>([])

    return (
        <TodoContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TodoContext.Provider>
    )
}

export { TodoContext };
