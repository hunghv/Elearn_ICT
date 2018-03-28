using Service.Common;
using Service.ViewModels.Request;
using Service.ViewModels.Response;

namespace Service.Services.Interfaces
{
    public interface IAdminServices
    {

        #region Categories

        IPagedResults<CategoriesResponse> GetCategories(CategoriesRequest request);

        int? SaveCategories(CategoriesSaveRequest request);

        bool DeleteCategories(int request);

        #endregion

        #region Country

        IPagedResults<CountryResponse> GetCountrys(CountryRequest request);

        #endregion

    }
}
