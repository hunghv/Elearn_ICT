using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Elearn.Data.Entities.Base;

namespace Elearn.Data.Entities
{
    public class EmailTemplate : Entity
    {
        [MaxLength(150)]
        public string TemplateName { get; set; }
        [MaxLength(250)]
        public string Description { get; set; }
        public string Subject { get; set; }
        [Column(TypeName = "ntext")]
        [MaxLength]
        public string BodyContent { get; set; }
    }
}
