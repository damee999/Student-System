package com.damjanjanev.studentsystem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

@Entity
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Subject name is mandatory")
    private String subjectName;

    @Min(value = 0, message = "Score must be at least 0")
    @Max(value = 100, message = "Score must be at most 100")
    private Integer score;

    private LocalDate dateTaken;

    @ManyToOne
    @JoinColumn(name = "student_id")
    @JsonIgnore
    private Student student;
    
    public Exam() {
    }

    public Exam(String subjectName, Integer score, LocalDate dateTaken) {
        this.subjectName = subjectName;
        this.score = score;
        this.dateTaken = dateTaken;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public LocalDate getDateTaken() {
        return dateTaken;
    }

    public void setDateTaken(LocalDate dateTaken) {
        this.dateTaken = dateTaken;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
}