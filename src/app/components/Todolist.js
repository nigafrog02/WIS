import React, { useState, useEffect } from "react";
import Task from "./Todoitem";
import { useRouter } from "next/navigation";


/**
 * @typedef {Object} TodoListProps
 * @property {ITask[]} tasks - The array of tasks to display in the table.
 */

/**
 * Todolist component that displays a list of tasks in a table.
 * @param {TodoListProps} props
 */
const Todolist = ({ tasks }) => {
  const router = useRouter();
  const [currentNumitems, setCurrentNumitems] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTask, setSearchTask] = useState("");
  const [taskStatus, settaskStatus] = useState("");
  const [sortDate, setSortDate] = useState("asc");
  const [file, setFile] = useState(null);

  
  useEffect(() => {
    setCurrentPage(1); // Reset to the first page when itemsPerPage changes
  }, [currentNumitems]);

  const itemsPerPage = currentNumitems; // Number of tasks per page

  const filteredTasks = tasks.filter(
    (task) =>
      task.Status.toLowerCase().includes(taskStatus.toLowerCase()) &&
      task.Tasks.toLowerCase().includes(searchTask.toLowerCase())
  );

  const sortedDateTasks = filteredTasks.sort((a, b) => {
    const dateA = new Date(a.Duedate);
    const dateB = new Date(b.Duedate);

    return sortDate === "asc" ? dateA - dateB : dateB - dateA;
  });

  const totalPages = Math.ceil(sortedDateTasks.length / itemsPerPage);

  
  if (currentPage > totalPages) {
    setCurrentPage(totalPages); // If currentPage exceeds totalPages, set to the last page
  }

  const startIndex = (currentPage - 1) * itemsPerPage; 
  const currentTasks = sortedDateTasks.slice(startIndex, startIndex + itemsPerPage); 

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleSortDate = () => {
    setSortDate((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file.");

    const reader = new FileReader();
    reader.onload = async (e) => {
      const fileContent = e.target.result.split(",")[1]; // Get base64 content
      const response = await fetch("/api/importexcelapi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: fileContent }),
      });

      const result = await response.json();
      alert(result.message || "File uploaded!");
    };
    reader.readAsDataURL(file);
    router.refresh();
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <input
          type="text"
          value={searchTask}
          onChange={(e) => setSearchTask(e.target.value)}
          placeholder="Search by description"
          className="input input-bordered w-full"
        />
        <select
          className="select"
          value={taskStatus}
          onChange={(e) => settaskStatus(e.target.value)}
        >
          <option value={""}>All</option>
          <option>Completed</option>
          <option>Pending</option>
        </select>
        <select
          className="select"
          value={currentNumitems}
          onChange={(e) => setCurrentNumitems(parseInt(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>

        <button onClick={handleSortDate}>
          Sort by Due Date ({sortDate === "asc" ? "Ascending" : "Descending"})
        </button>

        <div className="flex gap-2">
          <input className="border border-gray-300 rounded px-2 py-1"type="file" accept=".xlsx" onChange={handleFileChange} />
          <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleUpload}>Upload</button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Tasks</th>
            <th>Due Date</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="btn btn-secondary"
        >
          Previous
        </button>

        <span>
          Page {currentPage} / {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="btn btn-secondary"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Todolist;
