using Elearn.Data.Common;
using Elearn.Data.Entities;
using Elearn.Data.Repository.Base;
using Elearn.Data.Repository.Interfaces;

namespace Elearn.Data.Repository.Implementation
{
    public class EmployeeRepository : EntityBaseRepository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(ElearnContext context) : base(context)
        {
        }
    }
}
