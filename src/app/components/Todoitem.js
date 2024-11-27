"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useRouter } from "next/navigation";
import { EditTask ,DeleteTask} from "../api";
import Modal from "./Modal";
// @ts-check
/**
 * @typedef {Object} TaskProps
 * @property {ITask[]} task - The array of tasks to display in the table.
 */

/**
 * Todolist component that displays a list of tasks in a table.
 * @param {TaskProps} props
 */
const Task = ({task}) => {

  const router = useRouter();
  const [openModalEdit, setopenModalEdit] = useState(false);
  const [openModalDelete, setopenModalDelete] = useState(false);
  const [tasktoEdit, setTaskToEdit] = useState(task.Tasks);
  const [EditDate, setNewEditDate] = useState(task.Duedate);
  const [EditCategory, setNewEditCategory] = useState(task.Category);
  const [EditStatus, setNewEditStatus] = useState(task.Status);
  const dateInputRef = useRef(null);
  
    useEffect(() => {
        if (dateInputRef.current) {
          flatpickr(dateInputRef.current, {
            dateFormat: "Y-m-d", // Format the date
            minDate: "today", // Disable past dates thx flatpckr Docs
            onChange: (selectedDates, dateStr, instance) => {
              setNewEditDate(dateStr); // Update the state with the selected date thx gpt for this
              },
          });
        }
      }, []);
  

  const handleSubmitEditTask = async(e) => { //catch validations

    
        
        e.preventDefault();
       await EditTask({
            id: task.id,
            Tasks: tasktoEdit,
            Duedate: EditDate,
            Category: EditCategory,
            Status: EditStatus
        }) 
            setopenModalEdit(false);
            router.refresh();
    
    
}
  const handleDeleteTask = async(id) => { 
    await DeleteTask(id)
    setopenModalDelete(false)
    router.refresh()
  }


    return (
        <tr key={task.id}>
          <td>{task.Tasks}</td>
          <td>{task.Duedate}</td>
          <td>{task.Category}</td>
          <td>{task.Status}</td>
          <td className="flex gap-2 ">
            <FaEdit onClick={() => setopenModalEdit(true)} cursor="pointer" className="text-blue-500" size={25}/>
            <Modal modalOpen={openModalEdit} setIsOpen={setopenModalEdit}>
            <form onSubmit={handleSubmitEditTask}>
                <h3 className="font-bold text-lg">Edit task</h3>
                <div className="modal-action">
                <input value={tasktoEdit} onChange={e=>setTaskToEdit(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full " />
                </div>
                <div className="modal-action">
                <input value={EditDate} onChange={e=>setNewEditDate(e.target.value)} type="text"  ref={dateInputRef} placeholder="Due Date" className="input input-bordered w-full " />
                </div>
                <div className="modal-action">
                <select className="select select-bordered w-full" value={EditCategory} onChange={e=>setNewEditCategory(e.target.value)}>
                <option defaultValue={"Category"}>Category</option>
                <option>Work</option>
                <option>Personal</option>
                <option>Urgent</option>
                </select>
                </div>
                <div className="modal-action">
                <select className="select select-bordered w-full " value={EditStatus} onChange={e=>setNewEditStatus(e.target.value)} >
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
            <MdDeleteForever onClick={() => setopenModalDelete(true)} cursor="pointer" className="text-red-500" size={25}/>
            <Modal modalOpen={openModalDelete} setIsOpen={setopenModalDelete}>
              <h3 className="font-bold text-lg">Delete task ?</h3>
              
              <div className="modal-action">
                <button onClick={() => handleDeleteTask(task.id)} className="btn btn-primary " >Yes</button>
              </div>
            </Modal>
          </td>
        </tr>
    );

};

export default Task;