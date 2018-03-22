using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Elearn.Data.Entities;
using Service.ViewModels.Response;

namespace Service.Mapping
{
    public class AutomapperConfiguration
    {
        public static void Configure()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Categories, CategoriesResponse>();
                cfg.CreateMap<Country, CountryResponse>();
            });
        }
    }
}
