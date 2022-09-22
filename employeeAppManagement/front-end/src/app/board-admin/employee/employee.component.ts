import {Component, OnInit} from '@angular/core';

import {HttpErrorResponse} from '@angular/common/http';

import {NgForm} from '@angular/forms';
import {Employee} from '../../_services/employee';
import {EmployeeService} from 'src/app/_services/employee.service';
import {PageEvent} from '@angular/material/paginator';
import {UserService} from '../../_services/user.service';


@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
    [x: string]: any;

    public employees: Employee[] = [];
    public editEmployee: Employee;
    public deleteEmployee: Employee;
    totalElements = 0;
    content = '';

    constructor(private employeeService: EmployeeService, private userService: UserService) {
    }

    ngOnInit(): void {
        this.getEmployees({page: 0, size: 8});
    }


    public getEmployees(request): void {
        this.employeeService.getEmployees(request[`page`], request[`size`]).subscribe(
            (response: Employee[]) => {
                this.employees = response[`content`];
                this.totalElements = response[`totalElements`];
                console.log(this.employees);
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

    nextPage(event: PageEvent) {
        const request = {};
        request[`page`] = event.pageIndex.toString();
        request[`size`] = event.pageSize.toString();
        this.getEmployees(request);
    }

    public onAddEmloyee(addForm: NgForm): void {
        document.getElementById('add-employee-form').click();
        this.employeeService.addEmployees(addForm.value).subscribe(
            (response: Employee) => {
                console.log(response);
                this.ngOnInit();
                addForm.reset();
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
                addForm.reset();
            }
        );
    }

    public onUpdateEmloyee(employee: Employee): void {
        this.employeeService.updateEmployee(employee).subscribe(
            (response: Employee) => {
                console.log(response);
                this.ngOnInit();
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

    public onDeleteEmloyee(employeeId: number): void {
        this.employeeService.deleteEmployee(employeeId).subscribe(
            (response: void) => {
                console.log(response);
                this.ngOnInit();
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

    public searchEmployees(key: string): void {
        console.log(key);
        const results: Employee[] = [];
        for (const employee of this.employees) {
            if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
                results.push(employee);
            }
        }
        this.employees = results;
        if (results.length === 0 || !key) {
            this.getEmployees({page: '0', size: '8'});
        }
    }

    public onOpenModal(employee: Employee, mode: string): void {
        const container = document.getElementById('main-container');
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle', 'modal');
        if (mode === 'add') {
            button.setAttribute('data-target', '#addEmployeeModal');
        }
        if (mode === 'edit') {
            this.editEmployee = employee;
            button.setAttribute('data-target', '#updateEmployeeModal');
        }
        if (mode === 'delete') {
            this.deleteEmployee = employee;
            button.setAttribute('data-target', '#deleteEmployeeModal');
        }
        container.appendChild(button);
        button.click();
    }
}
