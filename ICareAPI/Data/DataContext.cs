using System;
using Microsoft.EntityFrameworkCore;
using ICareAPI.Models;

namespace ICareAPI.Repositories
{
    public class DataContext : DbContext
    {

        public DataContext()
        {
        }
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } = default!;

        public DbSet<Patient> Patients { get; set; } = default!;

        public DbSet<Record> Records { get; set; } = default!;

        public DbSet<Doctor> Doctors { get; set; } = default!;

        public DbSet<PatientDoctor> PatientDoctors { get; set; } = default!;


        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            if (!options.IsConfigured)
            {
                options.UseSqlite("Data Source=ICareDB.db");

            }
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // modelBuilder.Entity<UserRole>(userRole =>
            // {
            //     userRole.HasKey(ur => ur.Id);
            //     userRole.HasOne(ur => ur.Role).WithMany(r => r.UserRoles).HasForeignKey(k => k.RoleId).IsRequired();
            //     userRole.HasOne(ur => ur.User).WithMany(u => u.UserRoles).HasForeignKey(k => k.UserId).IsRequired();
            // });


            modelBuilder.Entity<PatientDoctor>()
            .HasKey(k => k.Id);
            modelBuilder.Entity<PatientDoctor>()
            .HasOne(p => p.Doctor)
            .WithMany(pd => pd.PatientDoctors)
            .HasForeignKey(k => k.DoctorId).IsRequired()
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PatientDoctor>()
           .HasOne(p => p.Patient)
           .WithMany(pd => pd.PatientDoctors)
            .HasForeignKey(k => k.PatientId).IsRequired()
            .OnDelete(DeleteBehavior.Restrict);


            base.OnModelCreating(modelBuilder);
        }

    }
}
