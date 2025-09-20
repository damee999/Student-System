package com.damjanjanev.studentsystem.service;

import com.damjanjanev.studentsystem.model.Exam;

import java.util.List;

public interface ExamService {
    Exam saveExam(Exam exam);
    List<Exam> getExamsByStudentId(int studentId);
}