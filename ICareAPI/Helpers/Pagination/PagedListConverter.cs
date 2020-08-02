using System.Linq;
using System.Collections.Generic;
using AutoMapper;
using ICareAPI.Helpers;

public static class PagedListConverter<TIn, TOut>
{

    public static PagedList<TOut> Convert(PagedList<TIn> listToConvert, in IMapper _mapper)
    {


        var mappedList = _mapper.Map<List<TOut>>(listToConvert.ToList());

        return new PagedList<TOut>(mappedList.ToList(), listToConvert.TotalCount, listToConvert.CurrnetPage, listToConvert.PageSize, listToConvert.TotalPages);
    }


}