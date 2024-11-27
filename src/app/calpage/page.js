import CalendarGfg from "../components/Calender";
import { getTasks } from "@/app/api";
import Link from "next/link";

export default async function calpage() {
  const tasks = await getTasks();
    return (

      <main className="max-w-4xl mx-auto mt-4">
        <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Click on the date to check your TODOS for the day!</h1>

        </div>
        <CalendarGfg tasks={tasks}/>
        <div className="text-center my-5 flex flex-col gap-4">
        <Link href="/">
          <button className="btn btn-primary">
            Back
          </button>
        </Link>
        </div>
      </main>
    );
  }