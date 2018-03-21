using System;
using System.Threading.Tasks;
using Elearn.Data.Entities;
using Elearn.Data.Repository.Interfaces;
using Service.Common;
using Service.Services.Interfaces;
using Service.ViewModels.Request;
using Service.ViewModels.Response;

namespace Service.Services
{
    public class CoverImageServices : ICoverImageServices
    {
        #region Declare Property

        private readonly ICoverImagesRepository _coverImagesRepository;

        #endregion

        #region Constructure

        public CoverImageServices(ICoverImagesRepository coverImagesRepository)
        {
            _coverImagesRepository = coverImagesRepository;
        }

        #endregion

        #region Public Method 

        public async Task<FileInfosResponse> SaveImageCover(FileInfosRequest request)
        {
            CoverImage coverImage = new CoverImage
            {
                Attachment = request.Attachment,
                FileName = request.FileName,
                Extension = request.Extension,
                Mime = request.Mime,
                IsDeleted = true,
                CreatedDate = DateTime.Now,
                CreatedBy = Constants.GetUserId()
            };

            _coverImagesRepository.Add(coverImage);

            bool isCreateOk = await _coverImagesRepository.CommitAsync();

            if (isCreateOk)
            {
                return new FileInfosResponse
                {
                    Id = coverImage.Id,
                    FileName = request.FileName,
                    Extension = request.Extension,
                    FileSize = request.FileLength
                };
            }

            return null;
        }

        #endregion

        #region Private Method

        

        #endregion

    }
}
