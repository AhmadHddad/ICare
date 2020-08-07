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


        public PagedList(List<T> items, int count, int pageNumber, int pageSize, int? totalPages = null)
        {
            TotalCount = count;
            PageSize = pageSize;
            CurrnetPage = pageNumber;
            TotalPages = totalPages ?? (int)Math.Ceiling(count / (double)pageSize);
            this.AddRange(items);
        }

        public static async Task<PagedList<T>> CreatePagedAsync(IQueryable<T> source, int pageNumber, int pageSize, int? totalPages = null)
        {

            var count = await source.CountAsync();

            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();


            return new PagedList<T>(items, count, pageNumber, pageSize, totalPages);
        }

        public static PagedList<T> CreatePagedAsync(IList<T> source, int pageNumber, int pageSize, int? totalPages = null)
        {

            var count = source.Count;

            var items = source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();


            return new PagedList<T>(items, count, pageNumber, pageSize, totalPages);
        }
    }
}