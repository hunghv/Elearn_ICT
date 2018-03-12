using System;

namespace Elearn.Data.Entities.Interfaces
{
    public interface IEntityBase
    {
        int Id { get; set; }
        bool IsDeleted { get; set; }
        DateTime CreatedDate { get; set; }
        int CreatedBy { get; set; }
        DateTime? ModifiedDate { get; set; }
        int? ModifiedBy { get; set; }
        DateTime? DeletedDate { get; set; }
        int? DeletedBy { get; set; }
    }
}
