using Service.ViewModels.Request;

namespace Service.Services.Interfaces
{
    public interface IAttachmentServices
    {
        int SaveAttachment(AttachmentRequest _request);
    }
}
