import * as XLSX from 'xlsx';
import { FaFileExport } from "react-icons/fa6";
const ExportExcel = () => {
    const exportToExcel = async () => {
        try {
            // Load the JSON data
            const response = await fetch('/Data/todos.json'); // Ensure the path is correct
            const data = await response.json();

            // Extract the tasks array from the JSON
            const tasks = data.tasks;

            // Convert JSON data to a worksheet
            const worksheet = XLSX.utils.json_to_sheet(tasks);

            // Create a new workbook and append the worksheet
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Todos');

            // Export the workbook to a file
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

            // Create a Blob from the buffer and trigger download
            const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'todos.xlsx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            console.log('Export successful!');
        } catch (error) {
            console.error('Error exporting to Excel:', error);
        }
    };

    return (
        <div>
            <button className='btn btn-success text-white font-bold' onClick={exportToExcel}><FaFileExport />Export to Excel</button>
        </div>
    );
};

export default ExportExcel;