"use client"; //Nextjs using SSR for components so needed to tell it this should be rendered in the client side too just a note 
import React, { useState, useEffect, useRef } from "react";
import { FcAddRow } from "react-icons/fc";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"
import Modal from "./Modal";
import { addTask } from "@/app/api";
import { useRouter } from "next/navigation";
import {v4 as uuidv4} from "uuid";
// @ts-check


const AddTask = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [newTaskvalue,setNewTaskValue] = useState("");
    const [newTaskDate,setNewTaskDate] = useState("");
    const [newTaskCategory,setNewTaskCategory] = useState("");
    const [newTaskStatus,setNewTaskStatus] = useState("");

    const dateInputRef = useRef(null);
    useEffect(() => {
        if (dateInputRef.current) {
          flatpickr(dateInputRef.current, {
            dateFormat: "Y-m-d", // Format the date
            minDate: "today", // Disable past dates thx flatpckr Docs
            onChange: (selectedDates, dateStr, instance) => {
                setNewTaskDate(dateStr); // Update the state with the selected date thx gpt for this
              },
          });
        }
      }, []);

    const handleSubmitNewTask = async(e) => { //catch validations

        if(newTaskStatus=="" || newTaskCategory=="" || newTaskCategory=="Category" || newTaskDate=="" || newTaskvalue=="" ||  newTaskvalue=="Status") {return;}

        else{
            
            e.preventDefault();
            await addTask({

                id:uuidv4(),
                Tasks: newTaskvalue,
                Duedate: newTaskDate,
                Category: newTaskCategory,
                Status: newTaskStatus
            })
            setNewTaskValue("");
            setNewTaskDate("");}
            setNewTaskCategory("");
            setNewTaskStatus("");
            setIsOpen(false);
            router.refresh();
        
    }

    return (
        
        <div>
            <button onClick={()=> setIsOpen(true)} className="btn btn-primary w-full"><FcAddRow className="ml-2" size={20}/>AddTask
            </button>

            <Modal modalOpen={isOpen} setIsOpen={setIsOpen}>
            <form onSubmit={handleSubmitNewTask}>
                <h3 className="font-bold text-lg">Add new task</h3>
                <div className="modal-action">
                <input value={newTaskvalue} onChange={e=>setNewTaskValue(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full " />
                </div>
                <div className="modal-action">
                <input value={newTaskDate} onChange={e=>setNewTaskDate(e.target.value)} type="text"  ref={dateInputRef} placeholder="Due Date" className="input input-bordered w-full " />
                </div>
                <div className="modal-action">
                <select className="select select-bordered w-full" value={newTaskCategory} onChange={e=>setNewTaskCategory(e.target.value)}>
                <option defaultValue={"Category"}>Category</option>
                <option>Work</option>
                <option>Personal</option>
                <option>Urgent</option>
                </select>
                </div>
                <div className="modal-action">
                <select className="select select-bordered w-full " value={newTaskStatus} onChange={e=>setNewTaskStatus(e.target.value)} >
                <option defaultValue={"Status"}>Status</option>
                <option >Pending</option>
                <option >Completed</option>
                </select>
                </div>
                <div className="modal-action">
                <button type="submit" className="btn btn-primary " >Submit</button>
                </div>
            </form>
            </Modal>
        </div>

        
    );
}

export default AddTask;