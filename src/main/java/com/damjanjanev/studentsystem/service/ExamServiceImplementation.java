package com.damjanjanev.studentsystem.service;

import com.damjanjanev.studentsystem.model.Exam;
import com.damjanjanev.studentsystem.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamServiceImplementation implements ExamService {

    @Autowired
    private ExamRepository examRepository;

    @Override
    public Exam saveExam(Exam exam) {
        return examRepository.save(exam);
    }

    @Override
    public List<Exam> getExamsByStudentId(int studentId) {
        return examRepository.findByStudentId(studentId);
    }
}