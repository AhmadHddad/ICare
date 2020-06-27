using System;
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
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => String.IsNullOrEmpty(src.Email) ? "" : src.Email));

            CreateMap<Patient, PatientForEditDto>()
            .ReverseMap().ForMember(dest => dest.OfficialId, opt => opt.UseDestinationValue());

            CreateMap<Patient, PatientForAddDto>().ReverseMap();


            CreateMap<Record, RecordForAddEditDetails>().ReverseMap();


            CreateMap<List<Record>, List<RecordForAddEditDetails>>();

            CreateMap<PatientForDetailsDto, StatisticsDto>()
                .ForMember(dest => dest.FivethRecord, opt => opt.MapFrom(src => src.Records == null ? new RecordForAddEditDetails { } : HelpersMethods.GetFifithPatientRecord(src.Records)))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CacluateDateOfBirth()))
                .ForMember(dest => dest.AvarageOfBills, opt => opt.MapFrom(src => HelpersMethods.CalcuateAvarageOfBills(src.Records == null ? new List<RecordForAddEditDetails>() : src.Records, false)))
                .ForMember(dest => dest.AverageeOfBillsWithoutOutlier, opt => opt.MapFrom(src => HelpersMethods.CalcuateAvarageOfBills(src.Records == null ? new List<RecordForAddEditDetails>() : src.Records, true)))
                .ForMember(dest => dest.HighestMonth, opt => opt.MapFrom(src => HelpersMethods.GetMostVisitedMonth(src.Records == null ? new List<RecordForAddEditDetails>() : src.Records)));

            CreateMap(typeof(JsonPatchDocument<>), typeof(JsonPatchDocument<>));

            CreateMap<Operation<Patient>, Operation<PatientForEditDto>>().ReverseMap();

            CreateMap<Operation<Record>, Operation<RecordForAddEditDetails>>().ReverseMap();



            CreateMap<User, UserForDetailsDto>().ReverseMap();

            CreateMap<DoctorForAddDto, Doctor>().ReverseMap();

            CreateMap<Doctor, DoctorForDetailsDto>()
                .ForMember(dest => dest.NumberOfAssignedPatients, opt => opt.MapFrom(src => src.PatientDoctors.Count));

            CreateMap<Doctor, DoctorForListDto>()
            .ForMember(dest => dest.NumberOfAssignedPatients, opt => opt.MapFrom(src => src.PatientDoctors.Count));

        }
    }
}