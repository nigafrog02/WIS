"use client";
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import Modal from './Modal';
import { format } from "date-fns"; // Formatting for date
import { FaCircle } from "react-icons/fa";

export default function CalendarGfg({ tasks }) {
    const [value, onChange] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null); // State for the modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState([]);

    // Handle date click
    const handleDateClick = (date) => {
        // Format the clicked date to match the tasks' Duedate format
        const formattedDate = format(date, "yyyy-MM-dd");
        console.log("Clicked date:", formattedDate);

        // Ensure tasks is an array and filter tasks that match the selected date
        if (Array.isArray(tasks)) {
            const matchingTasks = tasks.filter((task) => {
                const taskDueDate = format(new Date(task.Duedate), "yyyy-MM-dd");
                return formattedDate === taskDueDate;
            });


            // Update state with selected date and matching tasks
            setSelectedDate(date);
            setFilteredTasks(matchingTasks);
            setIsModalOpen(true); // Open the modal
        } else {
            console.error("Tasks is not an array:", tasks);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="align-items-center my-5 flex flex-col gap-4 items-center text-center mb-10">
                <div className="text-center my-5 flex flex-col gap-4">
                <span className="flex items-center gap-2 font-bold">
                    <FaCircle style={{ color: "blue" }} />
                        Work
                </span>
                <span className="flex items-center gap-2 font-bold">
                    <FaCircle style={{ color: "green" }} />
                    Personal
                </span>
                <span className="flex items-center gap-2 font-bold">
                    <FaCircle style={{ color: "red" }} />
                    Urgent
                </span>
                </div>
            <h1 className='text-2xl font-bold mt-5'>My Calender</h1>
            <Calendar onChange={onChange} value={value} onClickDay={handleDateClick} />
            </div>
            
            {/* Modal to show filtered tasks */}
            <Modal modalOpen={isModalOpen} setIsOpen={setIsModalOpen} selectedDate={selectedDate} closeModal={closeModal}>
                <h2 className='text-2xl font-bold mb-4'>Tasks for {selectedDate && format(selectedDate, "yyyy-MM-dd")}</h2>
                {filteredTasks.length > 0 ? (
                    <ul>
                    {filteredTasks.map((task, index) => {         
                      let color;
                      if (task.Category === "Work") color = "blue";
                      else if (task.Category === "Personal") color = "green";
                      else if (task.Category === "Urgent") color = "red";
                  
                      return (
                        <li key={index}>
                          <strong className="flex items-center gap-2">
                            <FaCircle style={{ color }} />
                            {task.Tasks} : {task.Category}
                          </strong>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                    <p>No tasks for this date.</p>
                )}
            </Modal>
        </div>
    );
}
