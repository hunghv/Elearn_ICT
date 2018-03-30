namespace Service.ViewModels.Request
{
   public class CountryRequest : PagingRequest
    {
    }

    public class CountrySaveRequest
    {
        public int? Id { get; set; }
        public string CountryName { get; set; }
        
    }

    public class CountryDelRequest
    {
        public int Id { get; set; }
    }
}
