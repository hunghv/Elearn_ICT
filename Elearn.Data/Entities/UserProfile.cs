using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Elearn.Data.Entities.Base;

namespace Elearn.Data.Entities
{
    public sealed class UserProfile : Entity
    {
        public UserProfile()
        {
            UserRoles = new List<UserRole>();
        }

        [MaxLength(50)]
        public string UserName { get; set; }
        [MaxLength(50)]
        public string Password { get; set; }
        [MaxLength(50)]
        public string ConfirmPassword { get; set; }
        [MaxLength(255)]
        public string DisplayName { get; set; }
        [MaxLength(100)]
        public string Email { get; set; }
        [MaxLength(50)]
        public string NickName { get; set; }
        public byte[] ThumbnailPhoto { get; set; }
        public string Domain { get; set; }
        public bool? ReceiveEmail { get; set; }
        public bool? Active { get; set; }
        public int? CountryId { get; set; }
        [MaxLength(30)]
        public string TelephoneNumber { get; set; }
        [MaxLength(80)]
        
        public ICollection<UserRole> UserRoles { get; set; }
        public Country Country { get; set; }

    }
}
