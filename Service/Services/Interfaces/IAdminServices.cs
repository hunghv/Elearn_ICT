using Service.Common;
using Service.ViewModels.Request;
using Service.ViewModels.Response;

namespace Service.Services.Interfaces
{
    public interface IAdminServices
    {
        IPagedResults<CategoriesResponse> GetCategories(CategoriesRequest request);

        IPagedResults<CountryResponse> GetCountrys(CountryRequest request);
    }
}
