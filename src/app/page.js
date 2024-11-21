// @ts-check
import React from "react";
import Addtask from "./components/Addtask";
import Todolist from "./components/Todolist";
import { getTasks } from "@/app/api";


export default async function Home() {
  const tasks = await getTasks();
  console.log(tasks);
  return (
    
      <main className="max-w-4xl mx-auto mt-4">
        <div className="text-center my-5 flex flex-col gap-4">
          <h1 className="text-2xl  font-bold">WIS Todo List App</h1>
          <Addtask/>
        </div>
        <Todolist tasks={tasks}/>
        </main>
        
    
  );
}
