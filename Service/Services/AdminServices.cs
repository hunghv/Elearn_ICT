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
    public class AdminServices : PaggingHelper,IAdminServices
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
            var query = _categoriesRepository.GetAllNoneDeleted();
            respone.Total = query.Count();
           //sort  data
            if (!string.IsNullOrEmpty(request?.SortField))
            {
                OrderBy(ref query, request);
            }
            else
            {
                query = query.OrderBy(x => x.Name);
            }
            //pagging data
            if (request?.Skip != null && request.Take.HasValue)
            {
                Paging(ref query, request);
            }
            var result = Mapper.Map<List<Categories>,List<CategoriesResponse>>(query.ToList());
            respone.Data = result;
            return respone;
        }
        
        public int? SaveCategories(CategoriesSaveRequest request)
        {
            if (request.Id!=null)
            {
                var categories = _categoriesRepository.GetSingleNoneDeleted(x => x.Id == request.Id);
                //update
                if (categories!=null)
                {
                    categories.Name = request.Name;
                    categories.Description = request.Description;
                    _categoriesRepository.Update(categories);
                }
                if (categories != null) return categories.Id;
            }
            else
            {
                //add new
                var newCat = new Categories
                {
                    Name = request.Name,
                    Description = request.Description,
                    CreatedBy = Constants.GetUserId(),
                    ModifiedBy = Constants.GetUserId(),
                    CreatedDate = Constants.GetDateNow(),
                    ModifiedDate = Constants.GetDateNow()
                };
                _categoriesRepository.Add(newCat);
                _categoriesRepository.Commit();
                return newCat.Id;
            }
            return null;
        }

        public bool DeleteCategories(CategoriesDelRequest request)
        {
            var categories = _categoriesRepository.GetSingleNoneDeleted(x => x.Id == request.Id);
            if (categories!=null)
            {
                categories.IsDeleted = true;
                categories.DeletedBy = Constants.GetUserId();
                categories.DeletedDate = Constants.GetDateNow();
                _categoriesRepository.Update(categories);
            }
            return _categoriesRepository.Commit();
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
