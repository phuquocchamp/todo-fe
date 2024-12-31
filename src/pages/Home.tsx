import { SetStateAction, useEffect, useState } from "react";
import {
    createTask,
    doneTask,
    fetchAllTasks,
    TaskRequest,
    TaskResponse,
} from "../services/task.ts"; // Import API functions

function Home() {
    const [tasks, setTasks] = useState<TaskResponse[]>([]);

    const [newTaskName, setNewTaskName] = useState("");
    const [newDueDate, setNewDueDate] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasks = await fetchAllTasks();
                setTasks(tasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
                // Handle error (e.g., display an error message)
            }
        };

        fetchTasks();
    }, []);

    const handleTaskNameChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setNewTaskName(event.target.value);
    };

    const handleDueDateChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setNewDueDate(event.target.value);
    };

    const addTask = async () => {
        try {
            const newTask: TaskRequest = {
                name: newTaskName,
                dueDate: newDueDate,
                isDone: false,
            };

            const createdTask = await createTask(newTask);
            setTasks([...tasks, createdTask]);
            setNewTaskName("");
            setNewDueDate("");
        } catch (error) {
            console.error("Error adding task:", error);
            // Handle error (e.g., display an error message)
        }
    };

    const toggleTaskDone = async (id: number) => {
        try {
            await doneTask(id); // Call the API to update the task status
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === id ? { ...task, isDone: !task.isDone } : task,
                ),
            );
        } catch (error) {
            console.error("Error updating task:", error);
            // Handle error
        }
    };

    return (
        <div>
            <h1 className="text-center py-5 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-white">
                TODO APPLICATION
            </h1>

            <div className={"container my-5 px-2 mx-auto"}>
                {/*Input Section*/}
                <div className="mx-4 flex items-center justify-center mb-5">
                    <input
                        type="text"
                        placeholder="Enter task name"
                        className="mr-2 w-2/4 rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newTaskName}
                        onChange={handleTaskNameChange}
                    />
                    <input
                        type="datetime-local"
                        className="mr-2 rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newDueDate}
                        onChange={handleDueDateChange}
                    />
                    <button
                        onClick={addTask}
                        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Add Task
                    </button>
                </div>
                {/*Tablet Display*/}
                <div className="relative overflow-x-auto mx-5  max-w-3xl justify-center flex">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                Task
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Due Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Done
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {tasks.map((task) => (
                            <tr
                                key={task.id} // Add a key prop for each row
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {task.name}
                                </th>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{task.dueDate.replace("T", " ")}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <button
                                        type="button"
                                        onClick={() => toggleTaskDone(task.id)}
                                        className={`rounded px-3 py-1 text-sm font-medium 
                                        ${task.isDone
                                            ? 'bg-green-500 text-white hover:bg-green-600'
                                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`
                                        }
                                    >
                                        {task.isDone ? "Done" : "Pending"}
                                    </button>
                                </td>

                            </tr>
                        ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}

export default Home;