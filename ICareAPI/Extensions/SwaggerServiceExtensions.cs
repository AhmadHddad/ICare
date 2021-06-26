using System;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace ICareAPI.Extensions
{
    public static class SwaggerServiceExtensions
    {
        public static IServiceCollection AddSwaggerService(this IServiceCollection services)
        {

            // Swagger Configuration

            services.AddSwaggerGen(setup =>
            {
                // Include 'SecurityScheme' to use JWT Authentication
                var jwtSecurityScheme = new OpenApiSecurityScheme
                {
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    Name = "JWT Authentication",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Description = "Put **_ONLY_** your JWT Bearer token on textbox below!",

                    Reference = new OpenApiReference
                    {
                        Id = JwtBearerDefaults.AuthenticationScheme,
                        Type = ReferenceType.SecurityScheme
                    }
                };

                setup.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);

                setup.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                  { jwtSecurityScheme, Array.Empty<string>() }
                });


                setup.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "ICareAPI",
                    Version = "v1",
                    Contact = new OpenApiContact
                    {
                        Name = "Ahmad Hddad",
                        Email = "ahmadhddad@outlook.com",
                        Url = new Uri("https://www.linkedin.com/in/ahmad-naalwe-hddad/")

                    },
                });


            });

            return services;
        }
    }
}