import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Paper, Button, Collapse, IconButton, Modal, Fade, Backdrop } from '@mui/material';
import { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; 
import ExpandLessIcon from '@mui/icons-material/ExpandLess'; 

export default function Student() {
    const paperstyle={padding:'50px 20px', width:600, margin:"20px auto"}
    const [name, setName]= useState('')
    const[address, setAddress]= useState('')
    const[email, setEmail]= useState('')
    const[phoneNumber, setPhoneNumber]= useState('')
    const[students, setStudents]= useState([])
    const [open, setOpen] = useState(false); 
    const [currentStudent, setCurrentStudent] = useState({ id: 0, name: '', address: '', email: '', phoneNumber: '' });
    const [expandedStudentId, setExpandedStudentId] = useState(null); 
    const [exams, setExams] = useState([]); 
    const [newExam, setNewExam] = useState({ 
        subjectName: '',
        score: '',
        dateTaken: ''
    });

    const handleClick=(e)=>{
        e.preventDefault()
        const student={name,address,email,phoneNumber}
        console.log(student)
        fetch("http://localhost:8080/student/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)
        }).then(()=>{
            console.log("New Student Added",
            setName(''),
            setAddress(''),
            setEmail(''),
            setPhoneNumber('')
        )}
        )
    }

     const handleDelete = (id, studentName) => {
        if (window.confirm(`Are you sure you want to delete ${studentName}?`)) {
            fetch(`http://localhost:8080/student/delete/${id}`, {
                method: "DELETE",
            })
            .then(response => response.text())
            .then((message) => {
                console.log(message);
                setStudents(students.filter(student => student.id !== id));
            })
            .catch(error => console.error('Error deleting student:', error));
        }
    };

     const toggleExams = (studentId) => {
        if (expandedStudentId === studentId) {
            setExpandedStudentId(null);
            setExams([]);
        } else {
            setExpandedStudentId(studentId);
            fetch(`http://localhost:8080/student/${studentId}/exams`)
                .then(res => res.json())
                .then((result) => {
                    setExams(result);
                })
                .catch(error => console.error('Error fetching exams:', error));
        }
    };

     const handleExamInputChange = (e) => {
        const { name, value } = e.target;
        setNewExam(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

     const addExam = (studentId) => {
        fetch(`http://localhost:8080/student/${studentId}/exams`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newExam)
        })
        .then(response => response.json())
        .then(savedExam => {
            console.log("New exam added:", savedExam);
            setExams([...exams, savedExam]);
            setNewExam({ subjectName: '', score: '', dateTaken: '' });
        })
        .catch(error => console.error('Error adding exam:', error));
    };

     const handleEditOpen = (student) => {
        setCurrentStudent(student);
        setOpen(true);
    };

    const handleEditClose = () => {
        setOpen(false);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setCurrentStudent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/student/update/${currentStudent.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(currentStudent)
        })
        .then(response => response.json())
        .then(updatedStudent => {
            console.log("Student updated:", updatedStudent);
            setStudents(students.map(student => 
                student.id === updatedStudent.id ? updatedStudent : student
            ));
            handleEditClose(); 
        })
        .catch(error => console.error('Error updating student:', error));
    };

    useEffect(()=>{
        fetch("http://localhost:8080/student/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setStudents(result);
        })
        },[])
  return (
    <Container>
        <Paper elevation={3} style={paperstyle}>
            <h1> Add a Student</h1>
        <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1 } }}
        noValidate
        autoComplete="off"
        >
        <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth 
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />
        <TextField id="outlined-basic" label="Student Address" variant="outlined" fullWidth
        value={address}
        onChange={(e)=>setAddress(e.target.value)}
        />
        <TextField id="outlined-basic" label="Student Email" variant="outlined" fullWidth
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <TextField id="outlined-basic" label="Student Phone Number" variant="outlined" fullWidth
        value={phoneNumber}
        onChange={(e)=>setPhoneNumber(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleClick}>
            Submit
        </Button>
        </Box>
        </Paper>
        <h1>Students</h1>
        <Paper elevation={3} style={paperstyle}>
            {students.map(student => (
            <div key={student.id}>
                <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <div>Id: {student.id}</div>
                            <div>Name: {student.name}</div>
                            <div>Address: {student.address}</div>
                            <div>Email: {student.email}</div>
                            <div>Phone: {student.phoneNumber}</div>
                        </div>
                        <div>
                            <IconButton color="primary" onClick={() => handleEditOpen(student)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="error" onClick={() => handleDelete(student.id, student.name)}>
                                <DeleteIcon />
                            </IconButton>
                            <IconButton onClick={() => toggleExams(student.id)}>
                                {expandedStudentId === student.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                        </div>
                    </div>
                </Paper>
                
                <Collapse in={expandedStudentId === student.id}>
                    <Paper elevation={2} style={{ margin: "0 10px 10px 10px", padding: "15px" }}>
                        <h3>Exams</h3>
                        
                        {exams.length > 0 ? (
                            exams.map(exam => (
                                <Paper key={exam.id} elevation={1} style={{ padding: '10px', margin: '5px 0' }}>
                                    <div><strong>Subject:</strong> {exam.subjectName}</div>
                                    <div><strong>Score:</strong> {exam.score}</div>
                                    <div><strong>Date:</strong> {exam.dateTaken}</div>
                                </Paper>
                            ))
                        ) : (
                            <div>No exams yet.</div>
                        )}

                        <Box component="form" sx={{ mt: 2, '& > :not(style)': { m: 1, width: '25ch' } }}>
                            <TextField label="Subject" name="subjectName" value={newExam.subjectName} onChange={handleExamInputChange} />
                            <TextField label="Score" type="number" name="score" value={newExam.score} onChange={handleExamInputChange} />
                            <TextField label="Date" type="date" InputLabelProps={{ shrink: true }} name="dateTaken" value={newExam.dateTaken} onChange={handleExamInputChange} />
                            <Button variant="contained" onClick={() => addExam(student.id)}>Add Exam</Button>
                        </Box>
                    </Paper>
                </Collapse>
            </div>
            ))}
        </Paper>
        <Modal
        open={open}
        onClose={handleEditClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
        sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& .MuiBackdrop-root': {
            position: 'absolute',
            zIndex: -1 
            }
        }}
        >
        <Fade in={open}>
            <Paper 
            elevation={24}
            sx={{ 
                padding: '20px', 
                width: 600, 
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1300,
                bgcolor: 'background.paper', 
                border: '2px solid #000',
                boxShadow: 24, 
                p: 4,
            }}
            >
            <h2>Edit Student</h2>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1 } }}
                noValidate
                autoComplete="off"
            >
                <TextField
                label="Student Name"
                variant="outlined"
                fullWidth
                name="name"
                value={currentStudent.name}
                onChange={handleEditChange}
                />
                <TextField
                label="Student Address"
                variant="outlined"
                fullWidth
                name="address"
                value={currentStudent.address}
                onChange={handleEditChange}
                />
                <TextField
                label="Student Email"
                variant="outlined"
                fullWidth
                name="email"
                value={currentStudent.email}
                onChange={handleEditChange}
                />
                <TextField
                label="Student Phone Number"
                variant="outlined"
                fullWidth
                name="phoneNumber"
                value={currentStudent.phoneNumber}
                onChange={handleEditChange}
                />
                <Button variant="contained" color="primary" onClick={handleEditSubmit}>
                Save Changes
                </Button>
            </Box>
            </Paper>
        </Fade>
        </Modal>
    </Container>
  );
}
