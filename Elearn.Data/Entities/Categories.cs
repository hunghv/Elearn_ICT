﻿using System;
using Elearn.Data.Entities.Base;
using Elearn.Data.Entities.Interfaces;

namespace Elearn.Data.Entities
{
    public class Categories : Entity
    {
        public string Name { get; set; }
        public string Image { get; set; }
        public string Icon { get; set; }
    }
}
