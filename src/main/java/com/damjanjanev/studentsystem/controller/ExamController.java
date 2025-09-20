package com.damjanjanev.studentsystem.controller;

import com.damjanjanev.studentsystem.model.Exam;
import com.damjanjanev.studentsystem.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import com.damjanjanev.studentsystem.model.Student;
import com.damjanjanev.studentsystem.repository.StudentRepository;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class ExamController {

    @Autowired
    private ExamService examService;

    @Autowired
    private StudentRepository studentRepository;

    @PostMapping("/{studentId}/exams")
    public ResponseEntity<Exam> addExam(@PathVariable int studentId, @Valid @RequestBody Exam exam) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + studentId));

        exam.setStudent(student);

        Exam savedExam = examService.saveExam(exam);

        return new ResponseEntity<>(savedExam, HttpStatus.CREATED);
    }

    @GetMapping("/{studentId}/exams")
    public ResponseEntity<List<Exam>> getExamsForStudent(@PathVariable int studentId) {
        List<Exam> exams = examService.getExamsByStudentId(studentId);
        return new ResponseEntity<>(exams, HttpStatus.OK);
    }
}