package com.boot.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.boot.domain.Employee;
import com.boot.domain.model.EmployeeModel;
import com.boot.domain.model.PageInfo;
import com.boot.domain.model.PageModel;
import com.boot.repository.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    @Transactional
    public PageModel<EmployeeModel> getEmployees(int page, int offset, String property, String direction) {

        Page<Employee> emps = repository
                .findAll(new PageRequest(page, offset, Direction.fromString(direction), property));
        List<EmployeeModel> empModels = new ArrayList<>();

        for (Employee emp : emps.getContent()) {
            empModels.add(new EmployeeModel(emp));
        }
        return new PageModel<EmployeeModel>(empModels, new PageInfo(emps));
    }

    @Transactional
    public EmployeeModel updateEmployee(EmployeeModel model) {
        Employee updated = repository.findOne(model.getId());
        if (!isValidEmailAddress(model.getEmail())) {
            throw new RuntimeException("정상적인 메일형식이 아닙니다.");
        }

        if (!isValidPhoneNumber(model.getPhone())) {
            throw new RuntimeException("정상적인 전화번호형식이 아닙니다.");
        }

        if (!isValidEmpSeq(model.getSeq())) {
            throw new RuntimeException("정상적인 직원번호형식이 아닙니다.");
        }

        if ((!model.getSeq().equalsIgnoreCase(updated.getSeq())) && !isNotDuplicatedEmpSeq(model.getSeq())) {
            throw new RuntimeException("직원번호가 중복되었습니다.");
        }

        updated.setEmail(model.getEmail());
        updated.setLevel(model.getLevel());
        updated.setName(model.getName());
        updated.setPhone(model.getPhone());
        updated.setSeq(String.format("%03d", Long.parseLong(model.getSeq())));

        return new EmployeeModel(repository.save(updated));
    }

    @Transactional
    public void deleteEmployee(Long id) {
        repository.delete(id);
    }

    @Transactional
    public EmployeeModel createEmployee(EmployeeModel model) {
        if (!isValidEmailAddress(model.getEmail())) {
            throw new RuntimeException("정상적인 메일형식이 아닙니다.");
        }
        if (!isValidPhoneNumber(model.getPhone())) {
            throw new RuntimeException("정상적인 전화번호형식이 아닙니다.");
        }

        if (!isValidEmpSeq(model.getSeq())) {
            throw new RuntimeException("정상적인 직원번호형식이 아닙니다.");
        }

        if (!isNotDuplicatedEmpSeq(model.getSeq())) {
            throw new RuntimeException("직원번호가 중복되었습니다.");
        }

        Employee emp = new Employee(model);
        return new EmployeeModel(repository.save(emp));
    }

    public boolean isValidEmailAddress(String email) {
        String pattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$";
        java.util.regex.Pattern p = java.util.regex.Pattern.compile(pattern);
        java.util.regex.Matcher m = p.matcher(email);
        return m.matches();
    }

    public boolean isValidPhoneNumber(String number) {
        String pattern = "\\d{3}-\\d{4}-\\d{4}";
        java.util.regex.Pattern p = java.util.regex.Pattern.compile(pattern);
        java.util.regex.Matcher m = p.matcher(number);
        return m.matches();
    }

    public boolean isValidEmpSeq(String number) {
        String pattern = "\\d{3}";
        java.util.regex.Pattern p = java.util.regex.Pattern.compile(pattern);
        java.util.regex.Matcher m = p.matcher(number);
        return m.matches();
    }

    public boolean isNotDuplicatedEmpSeq(String number) {
        Employee entity = repository.findBySeq(number);
        return entity == null ? true : false;
    }
}