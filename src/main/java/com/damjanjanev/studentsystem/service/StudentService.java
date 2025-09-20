package com.damjanjanev.studentsystem.service;

import com.damjanjanev.studentsystem.model.Student;

import java.util.List;

public interface StudentService {
    public Student saveStudent(Student student);
    public List<Student> getAllStudents();
    public String deleteStudent(int id);
    public Student updateStudent(int id, Student student);
}
