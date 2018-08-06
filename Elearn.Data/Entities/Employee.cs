using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Elearn.Data.Entities.Base;

namespace Elearn.Data.Entities
{
    public class Employee : Entity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmpCode { get; set; }
        public string Position { get; set; }
        public string Office { get; set; }
    }
}
