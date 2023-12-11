import React, { useState, useEffect } from 'react';
import { SERVER_URL } from '../constants';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function EditAssignment(props) {
    const [open, setOpen] = useState(false);
    // const [assignmentName, setAssignmentName] = useState('');
    // const [dueDate, setDueDate] = useState('');
    // const [courseId, setCourseId] = useState('');
    const [courseOptions, setCourseOptions] = useState([]);
    const [message, setMessage] = useState('');
    const [assignment, setAssignment] = useState(props.assignment);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.onClose();
    };
    const handleChange = (event) => {
        setAssignment({...assignment,[event.target.name]:event.target.value});
    }

    // const fetchCourseOptions = () => {
    //     // Fetch course options from the server
    //     fetch(`${SERVER_URL}/courses`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             // Assuming the data is an array of course objects with 'id' and 'title'
    //             setCourseOptions(data);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching course options: ' + error);
    //         });
    // };
    //
    // useEffect(() => {
    //     // Fetch course options when the component mounts
    //     fetchCourseOptions();
    // }, []);

    // useEffect(() => {
    //     // Update form fields when the assignment prop changes
    //     if (props.assignment) {
    //         setAssignmentName(props.assignment.assignmentName);
    //         setDueDate(props.assignment.dueDate);
    //         setCourseId(props.assignment.courseId);
    //     }
    // }, [props.assignment]);

    const handleSubmit = () => {
        console.log(assignment);
        setMessage('');



        // Send a PUT request to update the assignment data
        fetch(`${SERVER_URL}/assignment/${assignment.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(assignment),
        })
            .then((response) => {
                if (response.ok) {
                    setMessage('assignment edited')
                    handleClose();

                } else {
                    setMessage("Assignment edit failed")
                }
            })
            // .then((data) => {
            //     if (data.success) {
            //         setMessage('Assignment updated successfully.');
            //         handleClose();
            //     } else {
            //         setMessage('Failed to update assignment: ' + data.error);
            //     }
            // })
            .catch((error) => {
                setMessage('Error updating assignment: ' + error);
            });

    };

    return (
        <div>
            <button id='editassignmentbutton2' onClick={handleOpen}>Edit Assignment</button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Edit Assignment</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Assignment Name"
                        id='newassignmentname'
                        name="assignmentName"
                        fullWidth
                        value={assignment.assignmentName}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Due Date"
                        name="dueDate"
                        fullWidth
                        value={assignment.dueDate}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Course ID"
                        name="courseId"
                        fullWidth
                        value={assignment.courseId}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button id ='submitedit' onClick={handleSubmit}>Save Changes</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditAssignment;
