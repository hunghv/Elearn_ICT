namespace Service.ViewModels.Request
{
    public class UserProfileRequest : PagingRequest
    {
    }

    public class userProfileUpdateRequest
    {
        public int? Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string DisplayName { get; set; }
        public string NickName { get; set; }
        public byte[] ThumbnailPhoto { get; set; }
        public string TelephoneNumber { get; set; }
        public int? CountryId { get; set; }
    }

}
