using System.Collections.Generic;
using System.Linq;
using Elearn.Data.Entities;
using Elearn.Data.Repository.Interfaces;
using Service.Common;
using Service.Services.Interfaces;

namespace Service.Services
{
    public class EmployeeServices : PaggingHelper, IEmployeeServices
    {
        #region Declare Property

        private readonly IEmployeeRepository _employeeRepository;

        #endregion

        #region Constructure

        public EmployeeServices(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        #endregion

        #region Public Method 

        public List<Employee>  GetEmployees()
        {
            return _employeeRepository.GetAllNoneDeleted().ToList();
        }

        #endregion

        #region Private Method



        #endregion
    }
}
