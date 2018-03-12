﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Elearn.Data.Entities.Base;

namespace Elearn.Data.Entities
{
    public class CoverImage : Entity
    {
        public CoverImage()
        {
            this.News = new List<News>();
        }
        public int Id { get; set; }
        [MaxLength(100)]
        public string FileName { get; set; }
        [MaxLength(50)]
        public string Extension { get; set; }
        [MaxLength(50)]
        public string Mime { get; set; }
        public byte[] Attachment { get; set; }
        public virtual ICollection<News> News { get; set; }
    }
}
