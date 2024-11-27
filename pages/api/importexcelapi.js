import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';
import {v4 as uuidv4} from "uuid";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Extract the Base64 file data from the request body
            const { file } = req.body;
            if (!file) {
                throw new Error('No file provided in the request body.');
            }

            // Parse the Base64 file into an Excel workbook
            const workbook = XLSX.read(file, { type: 'base64' });
            const sheetName = workbook.SheetNames[0];
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

            // Define the path to the todo.json file
            const todoPath = path.join(process.cwd(), 'public','Data', 'todos.json');

            // Read the existing todo.json file
            let currentData = { tasks: [] }; // Default structure if file is empty or not found
            if (fs.existsSync(todoPath)) {
                const rawData = fs.readFileSync(todoPath, 'utf8');
                currentData = JSON.parse(rawData);
            }

            // Ensure the new data is properly formatted
            const newTasks = data.map((item) => ({
                id: String(item.id + uuidv4() || Math.random().toString(36).substring(2)), // Convert to string
                Tasks: item.Tasks || '',
                Duedate: item['Duedate ']||item.Duedate || '',
                Category: item.Category || '',
                Status: item.Status || 'Pending',
            }));

            // Merge new tasks with existing tasks
            const updatedData = { tasks: [...currentData.tasks, ...newTasks] };

            // Write the updated data back to the todo.json file
            fs.writeFileSync(todoPath, JSON.stringify(updatedData, null, 2));

            // Respond with success
            res.status(200).json({ message: 'Todos imported successfully!' });
        } catch (error) {
            console.error('Error importing todos:', error.message);
            res.status(500).json({ error: 'Failed to import todos.', details: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

