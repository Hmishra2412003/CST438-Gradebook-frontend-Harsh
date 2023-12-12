import React, { useState, useEffect } from 'react';
import { SERVER_URL } from '../constants';
import { Link } from 'react-router-dom';
import AddAssignment from './AddAssignment';
import EditAssignment from './EditAssignment';

function ListAssignment(props) {
    const [assignments, setAssignments] = useState([]);
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [selectedAssignment, setSelectedAssignment] = useState(null); // Define selectedAssignment here
const token =sessionStorage.getItem("jwt");

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = () => {
        fetch(`${SERVER_URL}/assignment`, {
            headers: {'Authorization': token}
        })
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setAssignments(data);
            })
            .catch((err) => console.error(err));
    }

    const refresh = () => {
        console.log("Coming from dialog")
        closeModal();
    }

    const handleDeleteAssignment = (assignmentId, hasGrades) => {
        if (hasGrades) {
            const confirmation = window.confirm(
                'This assignment has grades. Deleting it will also delete associated grades. Are you sure you want to delete it?'
            );
            if (!confirmation) {
                return; // Do nothing if the user cancels the deletion
            }
        }

        fetch(`${SERVER_URL}/assignment/${assignmentId}`, {
            method: 'DELETE',
            headers: {'Authorization': token}
        })
            .then((response) => {
                if (response.ok) {
                    setMessage('Assignment deleted');
                    fetchAssignments();
                } else {
                    setMessage('Assignment delete failed');
                }
            })
            .catch((error) => {
                console.error('Error deleting assignment:', error);
            });


    };

    const headers = ['Assignment Name', 'Course Title', 'Due Date',];

    const openModal = (type, assignment) => {
        setIsModalOpen(true);
        setModalType(type);
        setSelectedAssignment(assignment);
    };

    const closeModal = () => {

        setIsModalOpen(false);
        setModalType('');

        setSelectedAssignment(null); // Clear the selected assignment
        console.log("Refreshing");
        fetchAssignments();

    };

    return (
        <div>
            <h3>Assignments</h3>
            <div margin="auto">
                <h4>{message}&nbsp;</h4>
                <table className="Center">
                    <thead>
                    <tr>
                        {headers.map((title, idx) => (
                            <th key={idx}>{title}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {assignments.map((row, idx) => (
                        <tr key={idx}>
                            <td>{row.assignmentName}</td>
                            <td>{row.courseTitle}</td>
                            <td>{row.dueDate}</td>
                            <td>
                                <Link to={`/gradeAssignment/${assignments[idx].id}`}>Grade</Link>
                            </td>
                            <td>
                                <button id='editassignmentbutton' onClick={() => openModal('edit', assignments[idx])}>Edit</button>
                            </td>
                            <td>
                                <button id='deletebutton' onClick={() => handleDeleteAssignment(assignments[idx].id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div>
                    <button id="addbutton1" onClick={() => openModal('add', null)}>Add Assignment</button>
                </div>
            </div>
            {isModalOpen && (
                <div className="add-assignment-modal">
                    <div className="modal-content">
                        <button onClick={fetchAssignments} className="close-button">
                            &times;
                        </button>
                        {modalType === 'add' ? (
                            <div>
                                <h2>Add Assignment</h2>
                                <AddAssignment onClose={fetchAssignments} />
                            </div>
                        ) : modalType === 'edit' ? (
                            <div>
                                <h2>Edit Assignment</h2>
                                <EditAssignment assignment={selectedAssignment} onClose={refresh} />
                            </div>
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListAssignment;
