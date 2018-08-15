using AutoMapper;
using Elearn.Data.Entities;
using Service.ViewModels.Request;
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
                cfg.CreateMap<Attachment, AttachmentRequest>();
                cfg.CreateMap<AttachmentRequest, Attachment>();
            });
        }
    }
}
