import Task from "./components/Todoitem";

// @ts-check
const baseUrl = "http://localhost:3001";

/**
 * Fetches tasks from the server.
 * @returns {Promise<ITask[]>} A promise that resolves to an array of tasks.
 */
export const getTasks = async () => {
    
        const response = await fetch(`${baseUrl}/tasks`,{ cache: 'no-store'});
        const todos = await response.json();
        return todos;  // This should be an array of ITask objects
    

};

export const addTask = async (/** @type {ITask} */ task) => {
  
    const response = await fetch(`${baseUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
    const newTask = await response.json();
    return newTask;
};

export const EditTask = async (/** @type {ITask} */ task) => {
  
  const response = await fetch(`${baseUrl}/tasks/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })
  const UpdateTask = await response.json();
  return UpdateTask;
};

export const DeleteTask = async (/** @type {ITask} */ id) => {
  
  await fetch(`${baseUrl}/tasks/${id}`, {
    method: "DELETE",
  })
};


