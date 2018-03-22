namespace Service.ViewModels.Request
{
    public class CategoriesRequest : PagingRequest
    {
    }

    public class CategoriesSaveRequest
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class CategoriesDelRequest
    {
        public int Id { get; set; }
    }
}
