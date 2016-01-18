package com.boot.domain.model;

import com.boot.domain.Employee;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EmployeeModel {
    private Long id;

    private String level;

    private String name;

    private String phone;

    private String email;

    private String seq;

    public EmployeeModel(Employee emp) {
        this.id = emp.getId();
        this.level = emp.getLevel();
        this.name = emp.getName();
        this.phone = emp.getPhone();
        this.email = emp.getEmail();
        this.seq = emp.getSeq();
    }
}
