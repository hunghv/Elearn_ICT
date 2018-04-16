using System;
using System.Linq;
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
                LikeCount = _context.Likes.Count(c => c.NewsId==id),
                SharedCount = _context.ShareNews.Count(s=>s.NewsId==id),
                LstComment = _context.NewsComments.Where(cm=>cm.NewsId==id).Select(nc => new CommentView
                {
                    CreatedDate = nc.CreatedDate,
                    Comment = nc.Comment,
                    LikeCount = _context.Likes.Count(c => c.NewsId == nc.Id),
                    SharedCount = _context.ShareNews.Count(s => s.NewsId == nc.Id),
                    User = _context.UserProfiles.Where(u=>u.Id==nc.UserProfileId).Select(user=>new UserProfileResponse
                    {
                        DisplayName = user.DisplayName,
                        ThumbnailPhoto = user.ThumbnailPhoto
                    }).FirstOrDefault()
                }).ToList()

            }).FirstOrDefault();
            return query;
        }

        public PagedResults<NewsResponse> GetNews(NewsRequestViewAll request)
        {
            var respone = new PagedResults<NewsResponse>();
            var query = _newsRepository.GetAllNoneDeleted().Select(x => new NewsResponse
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
                LikeCount = _context.Likes.Count(c => c.NewsId == x.Id),
                SharedCount = _context.ShareNews.Count(s => s.NewsId == x.Id),
                LstComment = _context.NewsComments.Where(cm => cm.NewsId == x.Id).Select(nc => new CommentView
                {
                    CreatedDate = nc.CreatedDate,
                    Comment = nc.Comment,
                    LikeCount = _context.Likes.Count(c => c.NewsId == nc.Id),
                    SharedCount = _context.ShareNews.Count(s => s.NewsId == nc.Id),
                    User = _context.UserProfiles.Where(u => u.Id == nc.UserProfileId).Select(user => new UserProfileResponse
                    {
                        DisplayName = user.DisplayName,
                        ThumbnailPhoto = user.ThumbnailPhoto
                    }).FirstOrDefault()
                }).ToList()
            });
            respone.Total = query.Count();
            //sort  data
            if (!string.IsNullOrEmpty(request?.SortField))
            {
                OrderBy(ref query, request);
            }
            else
            {
                query = query.OrderBy(x => x.Title);
            }
            //pagging data
            if (request?.Skip != null && request.Take.HasValue)
            {
                Paging(ref query, request);
            }
            
            return respone;
        }

        #endregion
    }
}
