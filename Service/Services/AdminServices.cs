﻿using System.Collections.Generic;
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
    public class AdminServices : PaggingHelper, IAdminServices
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
            var result = Mapper.Map<List<Categories>, List<CategoriesResponse>>(query.ToList());
            respone.Data = result;
            return respone;
        }

        public int? SaveCategories(CategoriesSaveRequest request)
        {
            if (request.Id != null)
            {
                var categories = _categoriesRepository.GetSingleNoneDeleted(x => x.Id == request.Id);
                //update
                if (categories != null)
                {
                    categories.Name = request.Name;
                    categories.Description = request.Description;
                    categories.ModifiedDate = Constants.GetDateNow();
                    categories.ModifiedBy = Constants.GetUserId();
                    _categoriesRepository.Update(categories);
                    _categoriesRepository.Commit();
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

        public bool DeleteCategories(int id)
        {
            var categories = _categoriesRepository.GetSingleNoneDeleted(x => x.Id == id);
            if (categories != null)
            {
                categories.IsDeleted = true;
                categories.DeletedBy = Constants.GetUserId();
                categories.DeletedDate = Constants.GetDateNow();
                _categoriesRepository.Update(categories);
                return _categoriesRepository.Commit();
            }
            else
            {
                return false;
            }

        }
        #endregion

        #region Country

        public IPagedResults<CountryResponse> GetCountrys(CountryRequest request)
        {
            var respone = new PagedResults<CountryResponse>();
            var query = _countryRepository.GetAllNoneDeleted();
            respone.Total = query.Count();
            //sort  data
            if (!string.IsNullOrEmpty(request?.SortField))
            {
                OrderBy(ref query, request);
            }
            else
            {
                query = query.OrderBy(x => x.CountryName);
            }
            //pagging data
            if (request?.Skip != null && request.Take.HasValue)
            {
                Paging(ref query, request);
            }
            var result = Mapper.Map<List<Country>, List<CountryResponse>>(query.ToList());
            respone.Data = result;
            return respone;
        }

        public int? UpdateCountrys(CountrySaveRequest request)
        {
            if (request.Id != null)
            {
                var countries = _countryRepository.GetSingleNoneDeleted(x => x.Id == request.Id);
                //update
                if (countries != null)
                {
                    countries.CountryName = request.CountryName;
                    countries.ModifiedDate = Constants.GetDateNow();
                    countries.ModifiedBy = Constants.GetUserId();
                    _countryRepository.Update(countries);
                    _countryRepository.Commit();
                }
                if (countries != null) return countries.Id;
            }
            else
            {
                //add new
                var newCountry = new Country
                {
                    CountryName = request.CountryName,
                    CreatedBy = Constants.GetUserId(),
                    ModifiedBy = Constants.GetUserId(),
                    CreatedDate = Constants.GetDateNow(),
                    ModifiedDate = Constants.GetDateNow()
                };
                _countryRepository.Add(newCountry);
                _countryRepository.Commit();
                return newCountry.Id;
            }
            return null;
        }

        public bool DeleteCountries(int id)
        {
            var countries = _countryRepository.GetSingleNoneDeleted(x => x.Id == id);

            if (countries != null)
            {
                countries.IsDeleted = true;
                countries.DeletedBy = Constants.GetUserId();
                countries.DeletedDate = Constants.GetDateNow();
                _countryRepository.Update(countries);
                return _countryRepository.Commit();
            }
            else
            {
                return false;
            }

        }
        #endregion

        #region Role



        #endregion

        #endregion

        #region Private Method



        #endregion


    }
}
