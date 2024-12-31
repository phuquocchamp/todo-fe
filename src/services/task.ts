const API_BASE_URL = "http://localhost:8080/v1/api/tasks";

export interface TaskRequest {
    name: string;
    dueDate: string;
    isDone: boolean;
}

export interface TaskResponse {
    id: number;
    name: string;
    dueDate: string;
    isDone: boolean;
}

const getHeaders = (): Headers => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    return headers;
};


export const createTask = async (task: TaskRequest): Promise<TaskResponse> => {
    const response = await fetch(`${API_BASE_URL}`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(task),
    });
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("FAILED TO CREATE A NEW TASK")
    }
}

export const doneTask = async (id: number): Promise<TaskResponse> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PATCH",
        headers: getHeaders(),
    });
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("FAILED TO UPDATE TASK")
    }
}


export const fetchAllTasks = async (): Promise<TaskResponse[]> => {
    const response = await fetch(`${API_BASE_URL}`, {
        method: "GET",
        headers: getHeaders(),
    });
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("FAILED TO UPDATE TASK")
    }
}

