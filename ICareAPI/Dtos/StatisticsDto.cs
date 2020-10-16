using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ICareAPI.Models
{
    public class StatisticsDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;

        public double AvarageOfBills { get; set; }

        public double AverageeOfBillsWithoutOutlier { get; set; }

        public int Age { get; set; }

        public Record FivethRecord { get; set; } = default!;


        public IList<Patient> PatientsWithSimilarDiseases { get; set; } = default!;


        public string HighestMonth { get; set; } = default!;
    }
}