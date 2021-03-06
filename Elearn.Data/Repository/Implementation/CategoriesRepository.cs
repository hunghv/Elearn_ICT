﻿using Elearn.Data.Common;
using Elearn.Data.Entities;
using Elearn.Data.Repository.Base;
using Elearn.Data.Repository.Interfaces;

namespace Elearn.Data.Repository.Implementation
{
    public class CategoriesRepository:EntityBaseRepository<Categories>, ICategoriesRepository
    {
        public CategoriesRepository(ElearnContext context) : base(context)
        {
        }
    }
}   
