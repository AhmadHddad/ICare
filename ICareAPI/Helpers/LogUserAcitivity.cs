using System;
using System.Security.Claims;
using System.Threading.Tasks;
using ICareAPI.Repositories;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace ICareAPI.Helpers
{
    public class LogUserAcitivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();
                var NameIdentifier = ClaimTypes.NameIdentifier;
            var userId = int.Parse(resultContext.HttpContext.User
            .FindFirst(NameIdentifier).Value);

            var repo = resultContext.HttpContext.RequestServices.GetService<AuthRepository>();
            var user = await repo.GetUserById(userId);

            user.LastAcitve = DateTime.Now;

            await repo.SaveAll();

        }
    }
}