using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ICareAPI.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using ICareAPI.Helpers;
using Microsoft.AspNetCore.Http;
using AutoMapper;
using ICareAPI.Interfaces;
using ICareAPI.Middlewares;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Identity;
using ICareAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.OpenApi.Models;
using System;

namespace ICareAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddDbContext<DataContext>(x => x.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));


            // Configuration for Identity framework

            // IdentityBuilder builder = services.AddIdentityCore<User>(opt =>
            // {
            //     opt.Password.RequireDigit = false;
            //     opt.Password.RequiredLength = 4;
            //     opt.Password.RequireNonAlphanumeric = false;
            //     opt.Password.RequireUppercase = false;
            // });

            // builder = new IdentityBuilder(builder.UserType, typeof(Role), builder.Services);
            // builder.AddEntityFrameworkStores<DataContext>();
            // builder.AddRoleValidator<RoleValidator<Role>>();
            // builder.AddRoleManager<RoleManager<Role>>();
            // builder.AddSignInManager<SignInManager<User>>();

            // To Authenticate Token
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetSection("AppSettings:Token").Value));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false

                };
            });

            //AddJsonOptions self Reference Loop accrues when a modal has another modal inside it like patients has records,
            // and in records there is patients and so on, so dot net will see it as self referencing loop, and we need to ignore it
            services.AddMvc(options =>
            {
                var policy = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .Build();

                options.Filters.Add(new AuthorizeFilter(policy));
            })
                  .AddMvcOptions(options => options.EnableEndpointRouting = false)
                .SetCompatibilityVersion(CompatibilityVersion.Latest);

            services.AddControllers()
            .AddNewtonsoftJson(opt =>
             opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
             );

            // Make routes to lower case
            services.AddRouting(opt => opt.LowercaseUrls = true);

            services.AddCors();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

            /// Repos --- START ---
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IPatientRepository, PatientRepository>();
            services.AddScoped<IRecordRepository, RecordRepository>();
            services.AddScoped<IDoctorRepository, DoctorRepository>();
            services.AddScoped<IPatientDoctorRepository, PatientDoctorRepository>();
            services.AddScoped<LogUserActivity>();
            services.AddScoped<IUserRepository, UserRepository>();
            /// Repos --- END ---




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



        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public static void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {


            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ICareAPI v1"));
            }
            else
            {

                // Global Exception Handler with CORS Helper instead of keep using try & catch
                app.UseExceptionHandler(builder =>
                {
                    builder.Run(async context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                        var error = context.Features.Get<IExceptionHandlerFeature>();

                        if (error != null)
                        {
                            //AddApplicationError an extension to modify and add CORS to the error;
                            context.Response.AddApplicationError(error.Error.Message);
                            await context.Response.WriteAsync(error.Error.Message).ConfigureAwait(false);
                        }
                    });
                });

                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                //  app.UseHsts();
            }

            //app.UseStaticFiles();

            app.UseRouting();

            //  app.UseHttpsRedirection();
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseAuthentication();
            app.UseAuthorization();

            //app.UseDefaultFiles();

            // ErrorHandlingMiddleware

            app.UseMiddleware(typeof(ErrorHandlingMiddleware));


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
            });



        }
    }
}
