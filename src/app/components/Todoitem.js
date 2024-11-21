import React from "react";
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
    return (
        <tr key={task.id}>
          <td>{task.Tasks}</td>
          <td>{task.Duedate}</td>
          <td>{task.Category}</td>
          <td>{task.Status}</td>
        </tr>
    );

};

export default Task;