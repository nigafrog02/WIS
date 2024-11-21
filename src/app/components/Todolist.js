import React from "react";
import Task from "./Todoitem";

/**
 * @typedef {Object} TodoListProps
 * @property {ITask[]} tasks - The array of tasks to display in the table.
 */

/**
 * Todolist component that displays a list of tasks in a table.
 * @param {TodoListProps} props
 */
// @ts-check
const Todolist = ({tasks}) => {
    return (
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>  
        <th>Tasks</th>
        <th>Due Date </th>
        <th>Category</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {tasks.map((task) => 
      (<Task key={task.id } task={task} />)
        )}
    </tbody>
  </table>
</div>
    );
};

export default Todolist;