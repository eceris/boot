package com.boot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.boot.domain.model.EmployeeModel;
import com.boot.service.EmployeeService;

@RequestMapping("/employee")
@Controller
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public ResponseEntity getLists(@RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "offset", defaultValue = "10") int offset,
            @RequestParam(value = "property", defaultValue = "name") String property,
            @RequestParam(value = "direction", defaultValue = "asc") String direction) {

        return new ResponseEntity<>(service.getEmployees(page, offset, property, direction), HttpStatus.OK);
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public ResponseEntity updateEmployee(@RequestBody EmployeeModel model) {
        EmployeeModel updated = service.updateEmployee(model);
        if (updated == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity createEmployee(@RequestBody EmployeeModel model) {

        EmployeeModel created = service.createEmployee(model);
        if (created == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteCustomer(@PathVariable("id") String id) {
        service.deleteEmployee(Long.valueOf(id));
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
