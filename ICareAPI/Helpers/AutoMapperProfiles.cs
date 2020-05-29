using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.JsonPatch.Operations;
using System.Collections.Generic;
using System.Linq;
using ICareAPI.Dtos;
using ICareAPI.Models;

namespace ICareAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Patient, PatientsForListDto>()
                .ForMember(dest => dest.LastEntry, opt => opt.MapFrom(src => src.Records.Select(r => r.TimeOfEntry).GetLatestDate().ToString()));

            CreateMap<Patient, PatientForDetailsDto>()
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email.ToLowerIfPossible()));

            CreateMap<Patient, PatientForAddEditDto>();

            CreateMap<PatientForAddEditDto, Patient>();

            CreateMap<Record, RecordForAddEditDetails>();

            CreateMap<RecordForAddEditDetails, Record>();

            CreateMap<List<Record>, List<RecordForAddEditDetails>>();

            CreateMap<PatientForDetailsDto, StatisticsDto>()
                .ForMember(dest => dest.FivethRecord, opt => opt.MapFrom(src => HelpersMethods.GetFifithPatientRecord(src.Records)))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CacluateDateOfBirth()))
                .ForMember(dest => dest.AvarageOfBills, opt => opt.MapFrom(src => HelpersMethods.CalcuateAvarageOfBills(src.Records, false)))
                .ForMember(dest => dest.AverageeOfBillsWithoutOutlier, opt => opt.MapFrom(src => HelpersMethods.CalcuateAvarageOfBills(src.Records, true)))
                .ForMember(dest => dest.HighestMonth, opt => opt.MapFrom(src => HelpersMethods.GetMostVisitedMonth(src.Records)));

            CreateMap(typeof(JsonPatchDocument<>), typeof(JsonPatchDocument<>));

            CreateMap<Operation<Patient>, Operation<PatientForAddEditDto>>();
            CreateMap<Operation<PatientForAddEditDto>, Operation<Patient>>();

            CreateMap<Operation<Record>, Operation<RecordForAddEditDetails>>();
            CreateMap<Operation<RecordForAddEditDetails>, Operation<Record>>();


            CreateMap<UserForDetailsDto, User>();
            CreateMap<User, UserForDetailsDto>();

            CreateMap<DoctorForAddDto, Doctor>();

        }
    }
}