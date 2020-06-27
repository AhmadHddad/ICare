using ICareAPI.Middlewares;
using Microsoft.EntityFrameworkCore;
using static ICareAPI.constants.Enums;
namespace ICareAPI.Helpers
{
    public static class ExceptionThrowers
    {

        public static void ThrowErrorIfNotValidId(dynamic id)
        {

            var parsedId = id;
            string msg = "Must be a valid id";

            if (id is string)
            {

                try
                {
                    parsedId = int.Parse(id);
                }
                catch (System.Exception)
                {

                    throw new BadRequestException(msg); ;
                }
            }


            if (parsedId == 0) throw new BadRequestException(msg);


        }

        public static void ThrowErrorIfEntiryNotExist(EntityType entityType,
      Repositories.DataContext context,
       int id)
        {

            ThrowErrorIfNotValidId(id);

            if (context != null)
            {


                if (entityType == EntityType.patinet)
                {
                    using (var patient = context.Patients.FirstOrDefaultAsync(p => p.Id == id))
                    {
                        if (patient.Result == null) throw new BadRequestException("Patient does not exists");

                    }
                }

                if (entityType == EntityType.doctor)
                {

                    using (var doctor = context.Doctors.FirstOrDefaultAsync(d => d.Id == id))
                    {
                        if (doctor.Result == null) throw new BadRequestException("Doctor does not exists");
                    }

                }

            }
            else
            {
                throw new InternalServerException("Context is null");
            }


        }

        public static void ThrowErrorIfEntiryNotExist(EntityType entityType,
      Repositories.DataContext context,
       string OfficialId)
        {

            ThrowErrorIfNotValidId(OfficialId);

            if (context != null)
            {
                if (entityType == EntityType.patinet)
                {
                    using (var patient = context.Patients.FirstOrDefaultAsync(p => p.OfficialId == OfficialId))
                    {
                        if (patient.Result == null) throw new BadRequestException("Patient does not exists");

                    }
                }

                if (entityType == EntityType.doctor)
                {

                    using (var doctor = context.Doctors.FirstOrDefaultAsync(d => d.OfficialId == OfficialId))
                    {
                        if (doctor.Result == null) throw new BadRequestException("Doctor does not exists");
                    }

                }
            }
            else
            {
                throw new InternalServerException("Context is null");
            }
        }

        public static void ThrowErrorIfEntiryExist(EntityType entityType,
         Repositories.DataContext context,
          int id)
        {

            ThrowErrorIfNotValidId(id);

            if (context != null)
            {

                if (entityType == EntityType.patinet)
                {
                    using (var patient = context.Patients.FirstOrDefaultAsync(p => p.Id == id))
                    {
                        if (patient.Result != null) throw new BadRequestException("Patient already exists");

                    }
                }

                if (entityType == EntityType.doctor)
                {

                    using (var doctor = context.Doctors.FirstOrDefaultAsync(d => d.Id == id))
                    {
                        if (doctor.Result != null) throw new BadRequestException("Doctor already exists");
                    }

                }
            }
            else
            {
                throw new InternalServerException("Context is null");
            }
        }

        public static void ThrowErrorIfEntiryExist(EntityType entityType,
         Repositories.DataContext context, string OfficialId)
        {
            ThrowErrorIfNotValidId(OfficialId);

            if (context != null)
            {


                if (entityType == EntityType.patinet)
                {
                    using (var patient = context.Patients.FirstOrDefaultAsync(p => p.OfficialId == OfficialId))
                    {
                        if (patient.Result != null) throw new BadRequestException("Patient already exists");

                    }
                }

                if (entityType == EntityType.doctor)
                {

                    using (var doctor = context.Doctors.FirstOrDefaultAsync(d => d.OfficialId == OfficialId))
                    {
                        if (doctor.Result != null) throw new BadRequestException("Doctor already exists");
                    }

                }
            }
            else
            {
                throw new InternalServerException("Context is null");
            }
        }
    }
}