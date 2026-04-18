import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Task, mockTasks } from "@/data/mockData";

interface TaskContextType {
    tasks: Task[];
    addTask: (task: Omit<Task, "id" | "status" | "participants">) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

export const useTasks = () => {
    const ctx = useContext(TaskContext);
    if (!ctx) throw new Error("useTasks must be used within TaskProvider");
    return ctx;
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("nestlle_tasks");
        if (saved) {
            try {
                setTasks(JSON.parse(saved));
            } catch {
                setTasks(mockTasks);
            }
        } else {
            setTasks(mockTasks);
        }
    }, []);

    const addTask = (taskData: Omit<Task, "id" | "status" | "participants">) => {
        const newTask: Task = {
            category: "general",
            ...taskData,
            id: Date.now().toString(),
            status: "not_started",
            participants: 0,
        };

        setTasks((prev) => {
            const updated = [...prev, newTask];
            localStorage.setItem("nestlle_tasks", JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask }}>
            {children}
        </TaskContext.Provider>
    );
};
