using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ICareAPI.Dtos;
using ICareAPI.Middlewares;
using ICareAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ICareAPI.Helpers
{
    public static class HelpersMethods
    {

        public static RecordForAddEditDetails? GetFifithPatientRecord(IList<RecordForAddEditDetails> records)
        {

            if (records?.Count > 3)
            {
                return records[4];
            }
            else
            {
                return null;
            }

        }

        public static double CalcuateAvarageOfBills(IList<RecordForAddEditDetails> passedRecrords, bool reoveOutLier)
        {
            var records = passedRecrords.ToList();

            if (records.Count == 0)
            {
                return 0;
            }

            var billsList = new List<double> { };



            records.ForEach(delegate (RecordForAddEditDetails record)
            {
                billsList.Add(record.Bill);
            });


            if (reoveOutLier)
            {
                billsList = billsList.SkipOutliers(k: 2, selector: result => result).ToList();
            }


            return billsList.Average();

        }



        public static string GetMostVisitedMonth(IList<RecordForAddEditDetails> records)
        {
            IDictionary<string, int> monthsDict = new Dictionary<string, int>()
                                            {
                                                {"January",0},
                                                {"February", 0},
                                                {"March",0},
                                                {"April",0},
                                                {"May",0 },
                                                {"June",0},
                                                {"July",0},
                                                {"August",0},
                                                {"September",0},
                                                {"October",0},
                                                {"November",0},
                                                {"December",0},
                                                  };

            records.ToList().ForEach(delegate (RecordForAddEditDetails rec)
            {
                monthsDict[rec.TimeOfEntry.ToMonthName()]++;
            });


            var keyOfMaxValue = monthsDict.Aggregate((x, y) => x.Value > y.Value ? x : y).Key;

            return keyOfMaxValue;
        }

    }
}
