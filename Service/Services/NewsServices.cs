using System;
using Elearn.Data.Entities;
using Elearn.Data.Repository.Interfaces;
using Service.Common;
using Service.Services.Interfaces;
using Service.ViewModels.Request;

namespace Service.Services
{
    public class NewsServices : PaggingHelper, INewsServices
    {
        #region Declare Property

        private readonly INewsRepository _newsRepository;
        public DateTime DateNow = DateTime.Now;
        #endregion

        #region Constructure

        public NewsServices(INewsRepository newsRepository)
        {
            _newsRepository = newsRepository;
        }

        #endregion

        #region Public Method 

        public int? Update(NewsRequest request)
        {
            var news = _newsRepository.GetSingleNoneDeleted(x => x.Id == request.Id);
            if (news == null)
            {
                //add new
                var newNews = new News
                {
                    CategoryId = request.CategoryId,
                    ImageId = request.ImageId,
                    Content = request.Content,
                    Description = request.Description,
                    Available = false,
                    PostedBy = Constants.GetUserId(),
                    Title = request.Title,
                    StatusId = request.StatusId,
                    PostedDate = DateNow,
                    CreatedBy = Constants.GetUserId(),
                    ModifiedBy = Constants.GetUserId(),
                    CreatedDate = DateNow,
                    ModifiedDate = DateNow,
                };
                _newsRepository.Add(newNews);
                _newsRepository.Commit();
            }
            else
            {
                news.Title = request.Title;
                news.CategoryId = request.CategoryId;
                news.Content = request.Content;
                news.Description = request.Description;
                news.ImageId = request.ImageId;
                news.PostedBy = Constants.GetUserId();
                news.ModifiedBy = Constants.GetUserId();
                news.ModifiedDate = DateNow;
            }
            return 0;
        }

        #endregion
    }
}
