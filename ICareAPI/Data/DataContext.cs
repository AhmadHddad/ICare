using System;
using Microsoft.EntityFrameworkCore;
using ICareAPI.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace ICareAPI.Repositories
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, int, IdentityUserClaim<int>,
    UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {

        public DataContext()
        {
        }
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

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

            modelBuilder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            modelBuilder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();




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


        }

    }
}
