const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/studentDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    branch: { type: String, required: true },
    profilePicture: { type: Buffer }
});

const Student = mongoose.model('Student', studentSchema);

app.post('/api/register', upload.single('profilePicture'), async (req, res) => {
    console.log('Received request:', req.body);

    const { name, email, gender, dob, phone, password, address, branch } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
        name,
        email,
        gender,
        dob,
        phone,
        password: hashedPassword,
        address,
        branch,
        profilePicture: req.file ? req.file.buffer : null
    });

    try {
        await newStudent.save();
        res.status(201).send("Student registered successfully");
    } catch (error) {
        console.error("Error saving student:", error);
        res.status(500).send("Error saving student");
    }
});

// Get all students
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        
        // Convert the profile picture buffer to Base64 format
        const studentsWithBase64Pictures = students.map(student => ({
            ...student.toObject(),
            profilePicture: student.profilePicture 
                ? `data:image/jpeg;base64,${student.profilePicture.toString('base64')}`
                : null
        }));
        
        res.json(studentsWithBase64Pictures);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).send("Error fetching students");
    }
});

// Edit student (update)
app.put('/api/students/:id', upload.single('profilePicture'), async (req, res) => {
    const { id } = req.params;

    const updatedData = {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        dob: req.body.dob,
        phone: req.body.phone,
        address: req.body.address,
        branch: req.body.branch,
    };

    if (req.file) {
        updatedData.profilePicture = req.file.buffer; // Update image if new file is uploaded
    }

    try {
        await Student.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).send("Student updated successfully");
    } catch (error) {
        res.status(400).send("Error updating student");
    }
});

// Delete student
app.delete('/api/students/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const result = await Student.findByIdAndDelete(studentId);
        if (!result) {
            return res.status(404).send('Student not found');
        }
        res.status(200).send('Student deleted successfully');
    } catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).send('Server error');
    }
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
