using System.Threading.Tasks;
using ICareAPI.Data;
using Microsoft.AspNetCore.Http;

namespace ICareAPI.Middlewares
{
    public class RequestInterceptorMiddleware
    {

     private readonly RequestDelegate _next;

        public RequestInterceptorMiddleware(RequestDelegate next, DataContext dataContext)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
      

            // Call the next delegate/middleware in the pipeline
            await _next(context);
        }
    }
}