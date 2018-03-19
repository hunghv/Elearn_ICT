using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Elearn.Data.Entities.Base;

namespace Elearn.Data.Entities
{
    public class CoverImage : Entity
    {
        public CoverImage()
        {
            News = new List<News>();
        }
        [MaxLength(100)]
        public string FileName { get; set; }
        [MaxLength(50)]
        public string Extension { get; set; }
        [MaxLength(50)]
        public string Mime { get; set; }
        public byte[] Attachment { get; set; }
        public ICollection<News> News { get; set; }
    }
}
