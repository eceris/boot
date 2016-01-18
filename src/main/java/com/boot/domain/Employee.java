package com.boot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;

import com.boot.domain.model.EmployeeModel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity(name = "employee")
public class Employee extends BaseEntity {
    //    - 출력형식: 직원번호, 직급, 이름, 전화번호, 이메일 
    //    - 정렬: 이름순
    //    - 직원번호는 항상 3자리 숫자로 출력해야 한다(1일 경우 001로 출력)
    @Column(nullable = false)
    private String seq;

    @Column(nullable = false)
    private String level;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String email;

    public Employee(EmployeeModel model) {
        this.seq = String.format("%03d", Long.parseLong(model.getSeq()));
        this.level = model.getLevel();
        this.name = model.getName();
        this.phone = model.getPhone();
        this.email = model.getEmail();
    }
}
