using System;
using System.Security.Claims;
using System.Threading.Tasks;
using ICareAPI.Repositories;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace ICareAPI.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            var NameIdentifier = ClaimTypes.NameIdentifier;

            var userId = resultContext.HttpContext.User
             .FindFirst(NameIdentifier);

            if (userId != null)
            {

                var repo = resultContext.HttpContext.RequestServices.GetService<IUserRepository>();

                if (repo != null)
                {

                    var user = await repo.GetUserById(int.Parse(userId.Value));

                    user.LastActivity = DateTime.Now;

                    await repo.SaveAll();
                }
            }


        }
    }
}