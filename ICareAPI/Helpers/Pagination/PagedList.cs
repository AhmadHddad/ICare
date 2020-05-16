using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ICareAPI.Helpers
{
    public class PagedList<T> : List<T>
    {
        public int CurrnetPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }


        public PagedList(List<T> items, int count, int pageNumber, int pageSize)
        {
            TotalCount = count;
            PageSize = pageSize;
            CurrnetPage = pageNumber;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            this.AddRange(items);
        }

        public static async Task<PagedList<T>> CreatePagedAsync(IQueryable<T> source, int pageNumber, int pageSize)
        {

            var count = await source.CountAsync();

            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();


            return new PagedList<T>(items, count, pageNumber, pageSize);
        }
    }
}