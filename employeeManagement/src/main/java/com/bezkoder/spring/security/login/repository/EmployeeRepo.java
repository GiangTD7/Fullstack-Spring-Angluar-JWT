package com.bezkoder.spring.security.login.repository;

import com.bezkoder.spring.security.login.models.Employee;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface EmployeeRepo extends PagingAndSortingRepository<Employee, Long> {
    void deleteEmployeeById(Long id);

    Optional<Employee> findEmployeeById(Long id);
}
