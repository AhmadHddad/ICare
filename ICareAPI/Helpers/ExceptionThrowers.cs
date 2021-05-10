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

        public static void ThrowErrorIfEntityNotExist(EntityType entityType,
      Repositories.DataContext context,
       int id, bool checkArchived = false, bool archived = true)
        {

            ThrowErrorIfNotValidId(id);

            if (context != null)
            {


                if (entityType == EntityType.patient)
                {
                    using (var patient = context.Patients.FirstOrDefaultAsync(p => checkArchived == true ? p.Id == id && p.Archived == archived : p.Id == id))
                    {
                        if (patient.Result == null) throw new BadRequestException("Patient does not exists");

                    }
                }

                if (entityType == EntityType.doctor)
                {

                    using (var doctor = context.Doctors.FirstOrDefaultAsync(d => checkArchived == true ? d.Id == id && d.Archived == archived : d.Id == id))
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

        public static void ThrowErrorIfEntityNotExist(EntityType entityType,
      Repositories.DataContext context,
       string OfficialId, bool checkArchived = false, bool archived = true)
        {

            ThrowErrorIfNotValidId(OfficialId);

            if (context != null)
            {
                if (entityType == EntityType.patient)
                {
                    using (var patient = context.Patients.FirstOrDefaultAsync(p => checkArchived == true ? p.OfficialId == OfficialId && p.Archived == archived : p.OfficialId == OfficialId))
                    {
                        if (patient.Result == null) throw new BadRequestException("Patient does not exists");

                    }
                }

                if (entityType == EntityType.doctor)
                {

                    using (var doctor = context.Doctors.FirstOrDefaultAsync(d => checkArchived == true ? d.OfficialId == OfficialId && d.Archived == archived : d.OfficialId == OfficialId))
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
          int id, bool checkArchived = false, bool archived = false)
        {

            ThrowErrorIfNotValidId(id);

            if (context != null)
            {

                if (entityType == EntityType.patient)
                {
                    using (var patient = context.Patients.FirstOrDefaultAsync(p => checkArchived ? p.Id == id && p.Archived == archived : p.Id == id))
                    {
                        if (patient.Result != null) throw new BadRequestException("Patient already exists");

                    }
                }

                if (entityType == EntityType.doctor)
                {

                    using (var doctor = context.Doctors.FirstOrDefaultAsync(d => checkArchived ? d.Id == id && d.Archived == archived : d.Id == id))
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

        public static void ThrowErrorIfEntityExist(EntityType entityType,
         Repositories.DataContext context, string OfficialId, bool checkArchived = false, bool archived = false)
        {
            ThrowErrorIfNotValidId(OfficialId);

            if (context != null)
            {


                if (entityType == EntityType.patient)
                {
                    using (var patient = context.Patients.FirstOrDefaultAsync(p => checkArchived ? p.OfficialId == OfficialId && p.Archived == archived : p.OfficialId == OfficialId))
                    {
                        if (patient.Result != null) throw new BadRequestException("Patient already exists");

                    }
                }

                if (entityType == EntityType.doctor)
                {

                    using (var doctor = context.Doctors.FirstOrDefaultAsync(d => checkArchived ? d.OfficialId == OfficialId && d.Archived == archived : d.OfficialId == OfficialId))
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