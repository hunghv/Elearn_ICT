using System.ComponentModel.DataAnnotations;
using Elearn.Data.Entities.Base;

namespace Elearn.Data.Entities
{
    public class Country : Entity
    {
        [MaxLength(150)]
        public string CountryName { get; set; }
    }
}
