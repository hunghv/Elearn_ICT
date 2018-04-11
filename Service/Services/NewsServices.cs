using System;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Elearn.Data.Common;
using Elearn.Data.Entities;
using Elearn.Data.Repository.Interfaces;
using Service.Common;
using Service.Services.Interfaces;
using Service.ViewModels.Request;
using Service.ViewModels.Response;

namespace Service.Services
{
    public class NewsServices : PaggingHelper, INewsServices
    {
        #region Declare Property

        private readonly INewsRepository _newsRepository;
        private readonly ElearnContext _context;
        public DateTime DateNow = DateTime.Now;
        #endregion

        #region Constructure

        public NewsServices(INewsRepository newsRepository, ElearnContext context)
        {
            _newsRepository = newsRepository;
            _context = context;
        }
        //comment
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
                    PostedById = Constants.GetUserId(),
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
                news.PostedById = Constants.GetUserId();
                news.ModifiedBy = Constants.GetUserId();
                news.ModifiedDate = DateNow;
            }
            return 0;
        }

        public NewsResponse GetNewsById(int id)
        {
            var query = _newsRepository.GetAllNoneDeleted().Where(x => x.Id == id).Select(x => new NewsResponse
            {
                Title = x.Title,
                Content = x.Content,
                Category = x.Category.Name,

                Description = x.Description,
                PostedBy = x.PostedBy.DisplayName,
                PublicDate = x.PublicDate,
                Status = x.Status.Name,
                PostedDate = x.CreatedDate,
                Available = x.Available,
                ImageId = x.ImageId,
               // LikeCount = _context.Likes.Where(x=>x.)
            }).FirstOrDefault();
            return query;
        }

        #endregion
    }
}
