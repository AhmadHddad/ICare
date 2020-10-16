using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ICareAPI.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace ICareAPI.Repositories
{
    public class DataContext : IdentityDbContext<User, Role, int,
     IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Patient> Patients { get; set; } = default!;

        public DbSet<Record> Records { get; set; } = default!;

        public DbSet<Doctor> Doctors { get; set; } = default!;

        public DbSet<PatientDoctor> PatientDoctors { get; set; } = default!;


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(ur => ur.Id);
                userRole.HasOne(ur => ur.Role).WithMany(r => r.UserRoles).HasForeignKey(k => k.RoleId).IsRequired();
                userRole.HasOne(ur => ur.User).WithMany(u => u.UserRoles).HasForeignKey(k => k.UserId).IsRequired();
            });


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
