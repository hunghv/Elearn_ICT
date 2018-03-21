using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Elearn.Data.Entities;
using Elearn.Data.Repository.Interfaces;
using Service.Common;
using Service.Services.Interfaces;
using Service.ViewModels.Request;
using Service.ViewModels.Response;

namespace Service.Services
{
    public class AdminServices : IAdminServices
    {
        #region Declare Property

        private readonly ICategoriesRepository _categoriesRepository;
        private readonly ICountryRepository _countryRepository;

        #endregion

        #region Constructure

        public AdminServices(ICategoriesRepository categoriesRepository, ICountryRepository countryRepository)
        {
            _categoriesRepository = categoriesRepository;
            _countryRepository = countryRepository;
        }

        #endregion

        #region Public Method 

        #region Categories

        public IPagedResults<CategoriesResponse> GetCategories(CategoriesRequest request)
        {
            var respone = new PagedResults<CategoriesResponse>();
            IQueryable<Categories> query = _categoriesRepository.GetAllNoneDeleted().OrderBy(x => x.Name);
            respone.Total = query.Count();

            if (request != null && request.Skip.HasValue && request.Take.HasValue)
                query = query.Skip(request.Skip.Value).Take(request.Take.Value == 0 ? respone.Total : request.Take.Value);

            var categorieses = query.ToList();
            var result = Mapper.Map<List<CategoriesResponse>>(categorieses);
            respone.Data = result;
            return respone;
        }

        #endregion

        #region Country

        public IPagedResults<CountryResponse> GetCountrys(CountryRequest request)
        {
            var respone = new PagedResults<CountryResponse>();
            var query =  _countryRepository.GetAllNoneDeleted();
            respone.Total = query.Count();

            if (request != null && request.Skip.HasValue && request.Take.HasValue)
                query = query.Skip(request.Skip.Value).Take(request.Take.Value == 0 ? respone.Total : request.Take.Value);

            var categorieses =  query.OrderBy(x => x.CountryName).ToList();
            respone.Data = Mapper.Map<List<CountryResponse>>(categorieses);
            return respone;
        }

        #endregion

        #region Role



        #endregion

        #endregion

        #region Private Method



        #endregion


    }
}
