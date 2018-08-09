using System.Collections.Generic;
using Elearn.Data.Entities;

namespace Service.Services.Interfaces
{
    public interface IEmployeeServices
    {
        List<Employee> GetEmployees();
        int SaveEmployee(Employee request);
    }
}
