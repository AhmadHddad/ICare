namespace ICareAPI.Helpers.Pagination
{
    public class PaginationParams
    {

        private const int maxPageSize = 50;
        private int pageSize = 5;


        public int PageNumber { get; set; } = 1;

        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > maxPageSize) ? maxPageSize : value; }
        }


    }
}