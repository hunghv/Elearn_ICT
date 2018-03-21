using System.Threading.Tasks;
using Service.ViewModels.Request;
using Service.ViewModels.Response;

namespace Service.Services.Interfaces
{
    public interface ICoverImageServices
    {
        Task<FileInfosResponse> SaveImageCover(FileInfosRequest request);
    }
}
