using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using ICareAPI.Helpers.Pagination;
using ICareAPI.Models;

namespace ICareAPI.Helpers
{

    public static class Extentions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");

        }


        public static void AddPagination(this HttpResponse response, int currentPage, int itemsPerPage, int totalItems, int totalPages)
        {
            var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);

            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();


            response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader, camelCaseFormatter));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");

        }


        public static DateTime GetLatestDate(this IEnumerable<DateTime> dateTimes)
        {
            try
            {
                return dateTimes.OrderBy(b => b).Last();
            }
            catch
            {

                throw new ArgumentNullException();

            }

        }

        public static dynamic Cast(dynamic obj, Type castTo)
        {
            return Convert.ChangeType(obj, castTo);
        }

        public static int CacluateDateOfBirth(this DateTime theDate)
        {
            return DateTime.Today.Year - theDate.Year;

        }


        public static string ToMonthName(this DateTime dateTime)
        {
            return CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(dateTime.Month);
        }


        // Return the standard deviation of an array of Doubles.
        //
        // If the second argument is True, evaluate as a sample.
        // If the second argument is False, evaluate as a population.
        public static double StdDev(this IEnumerable<int> values,
            bool as_sample)
        {
            // Get the mean.
            double mean = values.Sum() / values.Count();

            // Get the sum of the squares of the differences
            // between the values and the mean.
            var squares_query =
                from int value in values
                select (value - mean) * (value - mean);
            double sum_of_squares = squares_query.Sum();

            if (as_sample)
            {
                return Math.Sqrt(sum_of_squares / (values.Count() - 1));
            }
            else
            {
                return Math.Sqrt(sum_of_squares / values.Count());
            }

        }



        /// <summary>
        /// Calculates a standard deviation of elements, using a specified selector.
        /// </summary>
        public static double StandardDeviation<T>(
          this IEnumerable<T> enumerable, Func<T, double> selector)
        {
            double sum = 0;
            double average = enumerable.Average(selector);
            int N = 0;
            foreach (T item in enumerable)
            {
                double diff = selector(item) - average;
                sum += diff * diff;
                N++;
            }
            return N == 0 ? 0 : Math.Sqrt(sum / N);
        }


        /// <summary>
        /// Filters elements to remove outliers. The enumeration will be
        /// selected three times, first to calculate an average, second
        /// for a standard deviation, and third to yield remiaining elements. The outliers are these
        /// elements which are further from an average than k*(standard deviation). Set k=3 for
        /// standard three-sigma rule.
        /// </summary>
        public static IEnumerable<T> SkipOutliers<T>(
           this IEnumerable<T> enumerable, double k, Func<T, double> selector)
        {
            // Duplicating a SD code to avoid calculating an average twice.
            double sum = 0;
            double average = enumerable.Average(selector);
            int N = 0;
            foreach (T item in enumerable)
            {
                double diff = selector(item) - average;
                sum += diff * diff;
                N++;
            }
            double SD = N == 0 ? 0 : Math.Sqrt(sum / N);
            double delta = k * SD;
            foreach (T item in enumerable)
            {
                if (Math.Abs(selector(item) - average) <= delta)
                    yield return item;
            }
        }
    }
}
