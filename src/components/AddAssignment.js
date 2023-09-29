import React, { useState, useEffect } from 'react';
import { SERVER_URL } from '../constants';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function AddAssignment(props) {
    const [open, setOpen] = useState(false);
    const [assignmentName, setAssignmentName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [courseId, setCourseId] = useState('');
    const [courseOptions, setCourseOptions] = useState([]);
    const [message, setMessage] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.onClose();
    };

    const fetchCourseOptions = () => {
        // Fetch course options from the server
        fetch(`${SERVER_URL}/courses`)
            .then((response) => response.json())
            .then((data) => {
                // Assuming the data is an array of course objects with 'id' and 'title'
                setCourseOptions(data);
            })
            .catch((error) => {
                console.error('Error fetching course options: ' + error);
            });
    };

    useEffect(() => {
        // Fetch course options when the component mounts
        fetchCourseOptions();
    }, []);

    const handleSubmit = () => {
        setMessage('');
        const newAssignment = {
            assignmentName,
            dueDate,
            courseId, // Use the courseId input value as is
            // handleClose();
        };

        fetch(`${SERVER_URL}/assignment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAssignment),
        })
            .then((response) => {
            // .then((data) => {
                if (response.ok) {
                    // Assignment created successfully, clear form fields
                    setAssignmentName('');
                    setDueDate('');
                    setCourseId('');
                    setMessage('Assignment created successfully.');
                    handleClose(); // Close the dialog
                } else {
                    setMessage('Failed to create assignment: ');
                }
            })
            .catch((error) => {
                setMessage('Error creating assignment: ' + error);
            });
    };

    return (
        <div>
            <button onClick={handleOpen}>Add Assignment</button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Add Assignment</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Assignment Name"
                        fullWidth
                        value={assignmentName}
                        onChange={(e) => setAssignmentName(e.target.value)}
                    />
                    <TextField
                        label="Due Date"
                        fullWidth
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    <TextField
                        label="Course ID" // Change the label to "Course ID"
                        fullWidth
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)} // Use the input value directly
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>Create Assignment</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddAssignment;
