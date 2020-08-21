using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ICareAPI.Models;

namespace ICareAPI.Repositories
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Patient> Patients { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Record> Records { get; set; }

        public DbSet<Doctor> Doctors { get; set; }

        public DbSet<PatientDoctor> PatientDoctors { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {


            modelBuilder.Entity<PatientDoctor>()
            .HasKey(k => k.Id);
            modelBuilder.Entity<PatientDoctor>()
            .HasOne(p => p.Doctor)
            .WithMany(pd => pd.PatientDoctors)
            .HasForeignKey(k => k.DoctorId)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PatientDoctor>()
           .HasOne(p => p.Patient)
           .WithMany(pd => pd.PatientDoctors)
            .HasForeignKey(k => k.PatientId)
            .OnDelete(DeleteBehavior.Restrict);


            base.OnModelCreating(modelBuilder);
        }

    }
}
