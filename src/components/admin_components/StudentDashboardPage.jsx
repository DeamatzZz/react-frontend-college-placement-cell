import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentDashboardPage.css';

const StudentDashboardPage = () => {
    const [studentDetails, setStudentDetails] = useState({
        name: '',
        email: '',
        profilePicture: null,
        gender: '',
        dob: '',
        phone: '',
        password: '',
        address: '',
        branch: ''
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [students, setStudents] = useState([]);
    const [showForm, setShowForm] = useState(false); // State to control form visibility
    const [selectedStudent, setSelectedStudent] = useState(null); // Ensure this is initialized properly


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudentDetails({ ...studentDetails, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setStudentDetails({ ...studentDetails, profilePicture: file });

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in studentDetails) {
            formData.append(key, studentDetails[key]);
        }

        if (selectedStudent) {
            // Update existing student
            try {
                const response = await axios.put(`http://localhost:5001/api/students/${selectedStudent._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.status === 200) {
                    // Update the student in state
                    const updatedStudents = students.map((student) => 
                        student._id === selectedStudent._id ? response.data : student
                    );
                    setStudents(updatedStudents);
                    alert("Student updated successfully!");
                } else {
                    alert("Failed to update student");
                }
            } catch (error) {
                console.error("Error during updating:", error);
            }
        } else {
            // Add new student
            try {
                const response = await axios.post('http://localhost:5001/api/register', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.status === 201) {
                    setStudents([...students, response.data]);
                    alert("Student registered successfully!");
                } else {
                    alert("Failed to register student");
                }
            } catch (error) {
                console.error("Error during registration:", error);
            }
        }

        // Reset form state
        resetForm();
    };

    const resetForm = () => {
        setStudentDetails({
            name: '',
            email: '',
            profilePicture: null,
            gender: '',
            dob: '',
            phone: '',
            password: '',
            address: '',
            branch: ''
        });
        setImagePreview(null);
        setShowForm(false);
        setSelectedStudent(null); // Clear selected student
    };

    
    // Function to fetch students from the server
    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/students');
            fetchStudents();
            setStudents(response.data); // Set the students state with fetched data
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    // Fetch students when component mounts
    useEffect(() => {
        fetchStudents();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/students/${id}`);
            console.log("Deleting student with ID:", id);

            fetchStudents(); // Refresh the list after deletion
            alert("Student deleted successfully!");
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    const handleView = (student) => {
        setSelectedStudent(student); // This should work if selectedStudent is defined correctly
    };

    const handleEdit = (student) => {
        setStudentDetails(student);
        setSelectedStudent(student); // Set selected student for editing
        setShowForm(true); // Show form for editing
    };

    const handleCloseDetails = () => {
        setSelectedStudent(null); // Reset the selected student to hide the details
    };

    // Get current date in YYYY-MM-DD format
    const today = new Date();
    const maxDate = today.toISOString().split("T")[0];

    return (
        <div>
            <div className="header-section">
                <h2>All Students</h2>
                <button className="add-button" onClick={() => setShowForm(true)}>
                    Add New
                </button>
            </div>
            <hr className="dashboard-line" />

            {showForm && ( // Conditional rendering of the form
                <form id="registration-form" onSubmit={handleSubmit} className="registration-form">
                    <h3>Student Registration</h3>

                    <div className="form-group">
                        <label>Profile Photo:</label>
                        <div className="profile-container" onClick={() => document.getElementById('file-input').click()}>
                            {imagePreview ? (
                                <img src={imagePreview} alt="Profile Preview" className="profile-preview" />
                            ) : (
                                <div className="profile-placeholder">Click to Add Picture</div>
                            )}
                        </div>
                        <input
                            type="file"
                            id="file-input"
                            onChange={handleFileChange}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={studentDetails.name} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={studentDetails.email} onChange={handleInputChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="gender">Gender:</label>
                        <select id="gender" name="gender" value={studentDetails.gender} onChange={handleInputChange} required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth:</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={studentDetails.dob}
                            onChange={handleInputChange}
                            max={maxDate}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone No:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={studentDetails.phone}
                            onChange={handleInputChange}
                            maxLength="10"
                            pattern="\d{10}"
                            required
                            placeholder="Enter 10-digit phone number"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={studentDetails.password}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter password (provided by admin)"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={studentDetails.address}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter address"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="branch">Branch:</label>
                        <input
                            type="text"
                            id="branch"
                            name="branch"
                            value={studentDetails.branch}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter branch"
                        />
                    </div>

                    <div className="form-footer">
                        <button type="submit" className="submit-button">Submit</button>
                    </div>
                </form>
            )}

            <table className="student-table">
                <thead>
                    <tr>
                        <th>Serial No.</th>
                        <th>Profile and Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Date of Birth</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Branch</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="profile-name-cell">
                                <div className="profile-name-wrapper">
                                    {student.profilePicture ? (
                                        <img
                                            src={student.profilePicture} // Make sure this is a valid data URI or path
                                            alt="Profile"
                                            className="table-profile"
                                        />
                                    ) : (
                                        <div className="table-profile-placeholder">No Image</div>
                                    )}
                                    <span>{student.name}</span>
                                </div>
                            </td>
                            <td>{student.email}</td>
                            <td>{student.gender}</td>
                            <td>{new Date(student.dob).toLocaleDateString('en-GB')}</td>
                            <td>{student.phone}</td>
                            <td>{student.address}</td>
                            <td>{student.branch}</td>
                            <td>
                                <div className="action-buttons">
                                    <button className="view-button" onClick={() => handleView(student)}>
                                        <i className="fas fa-eye"></i> View
                                    </button>
                                    <button className="edit-button" onClick={() => handleEdit(student)}>
                                        <i className="fas fa-edit"></i> Edit
                                    </button>
                                    <button className="delete-button" onClick={() => handleDelete(student._id)}>
                                        <i className="fas fa-trash"></i> Delete
                                    </button>
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

             {/* Student Details Section */}
             {selectedStudent && (
                <div className="student-details">
                    <h3>Student Details</h3>
                    <div className="details-form">
                        {selectedStudent.profilePicture ? (
                            <img
                                src={selectedStudent.profilePicture}
                                alt="Profile"
                                className="details-profile"
                            />
                        ) : (
                            <div className="details-profile-placeholder">No Image</div>
                        )}
                        <div className="detail-row"><strong>Name:</strong> {selectedStudent.name}</div>
                        <div className="detail-row"><strong>Email:</strong> {selectedStudent.email}</div>
                        <div className="detail-row"><strong>Phone:</strong> {selectedStudent.phone}</div>
                        <div className="detail-row"><strong>Gender:</strong> {selectedStudent.gender}</div>
                        <div className="detail-row"><strong>DOB:</strong> {new Date(selectedStudent.dob).toLocaleDateString('en-GB')}</div>
                        <div className="detail-row"><strong>Address:</strong> {selectedStudent.address}</div>
                        <div className="detail-row"><strong>Branch:</strong> {selectedStudent.branch}</div>
                        <button onClick={handleCloseDetails} className="close-details-button">Close Detail</button> {/* Close button */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDashboardPage;
