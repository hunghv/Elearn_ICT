using System.Collections.Generic;
using Service.ViewModels.Request;
using Service.ViewModels.Response;

namespace Service.Services.Interfaces
{
    public interface ICategoriesService
    {
        List<CategoriesResponse> GetCategories(CategoriesRequest request);
    }
}
