package com.damjanjanev.studentsystem.service;

import com.damjanjanev.studentsystem.model.Student;
import com.damjanjanev.studentsystem.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImplementation implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public String deleteStudent(int id) {
        if (studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
            return "Student with id " + id + " has been deleted.";
        } else {
            return "Student with id " + id + " does not exist.";
        }
    }

    @Override
    public Student updateStudent(int id, Student studentDetails) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found for this id :: " + id));

        student.setName(studentDetails.getName());
        student.setAddress(studentDetails.getAddress());
        student.setEmail(studentDetails.getEmail());
        student.setPhoneNumber(studentDetails.getPhoneNumber());

        return studentRepository.save(student);
    }
}
