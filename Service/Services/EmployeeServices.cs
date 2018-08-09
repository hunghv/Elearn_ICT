using System;
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
        private readonly DateTime _dateTime=DateTime.Now;
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

        public int SaveEmployee(Employee request)
        {
            if (request.Id != 0)
            {
                var entity = _employeeRepository.GetAllNoneDeleted().FirstOrDefault(x => x.Id == request.Id);
                if (entity!= null)
                {
                    entity.EmpCode= request.EmpCode;
                    entity.FirstName = request.FirstName;
                    entity.LastName = request.LastName;
                    entity.Office = request.Office;
                    entity.Position = request.Position;
                    entity.ModifiedBy = 1;
                    entity.ModifiedDate = _dateTime;
                    _employeeRepository.Update(request);
                    _employeeRepository.Commit();
                }
            }
            else
            {
                request.CreatedBy = 1;
                request.CreatedDate = _dateTime;
                request.IsDeleted = false;
                request.ModifiedBy = 1;
                request.ModifiedDate = _dateTime;
                _employeeRepository.Add(request);
                _employeeRepository.Commit();
            }
            return request.Id;
        }

        #endregion

        #region Private Method



        #endregion
    }
}
