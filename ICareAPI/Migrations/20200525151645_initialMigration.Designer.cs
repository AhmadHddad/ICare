﻿// <auto-generated />
using System;
using ICareAPI.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace ICareAPI.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20200525151645_initialMigration")]
    partial class initialMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity("ICareAPI.Models.Doctor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Department");

                    b.Property<string>("Name");

                    b.Property<string>("OfficialId");

                    b.Property<string>("Specialty");

                    b.Property<string>("University");

                    b.HasKey("Id");

                    b.ToTable("Doctors");
                });

            modelBuilder.Entity("ICareAPI.Models.Patient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created");

                    b.Property<DateTime>("DateOfBirth");

                    b.Property<string>("Email");

                    b.Property<string>("Name");

                    b.Property<string>("OfficialId");

                    b.HasKey("Id");

                    b.ToTable("Patients");
                });

            modelBuilder.Entity("ICareAPI.Models.PatientDoctor", b =>
                {
                    b.Property<int>("DoctorId");

                    b.Property<int>("PatientId");

                    b.HasKey("DoctorId", "PatientId");

                    b.HasIndex("PatientId");

                    b.ToTable("PatientDoctors");
                });

            modelBuilder.Entity("ICareAPI.Models.Record", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("Bill");

                    b.Property<DateTime>("Created");

                    b.Property<string>("Description");

                    b.Property<string>("DiseaseName");

                    b.Property<int>("PatientId");

                    b.Property<DateTime>("TimeOfEntry");

                    b.HasKey("Id");

                    b.HasIndex("PatientId");

                    b.ToTable("Records");
                });

            modelBuilder.Entity("ICareAPI.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created");

                    b.Property<string>("Email");

                    b.Property<DateTime>("LastAcitve");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("UserName");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ICareAPI.Models.PatientDoctor", b =>
                {
                    b.HasOne("ICareAPI.Models.Doctor", "Doctor")
                        .WithMany("PatientDoctors")
                        .HasForeignKey("DoctorId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("ICareAPI.Models.Patient", "Patient")
                        .WithMany("PatientDoctors")
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("ICareAPI.Models.Record", b =>
                {
                    b.HasOne("ICareAPI.Models.Patient", "Patient")
                        .WithMany("Records")
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}