using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace ICareAPI.Middlewares
{

    class NotFoundException : Exception
    {
        public NotFoundException(string msg)
     : base(String.Format(msg))
        {

        }
    }

    class BadRequestException : Exception
    {
        public BadRequestException(string msg)
     : base(String.Format(msg))
        {

        }
    }

    class InternalServerException : Exception
    {
        public InternalServerException(string msg)
     : base(String.Format(msg))
        {

        }
    }





    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate next;
        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context /* other dependencies */)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            var code = HttpStatusCode.InternalServerError; // 500 if unexpected
            var exMsg = ex.Message;


            if (ex is NotFoundException) code = HttpStatusCode.NotFound;
            else if (ex is BadRequestException) code = HttpStatusCode.BadRequest;
            else if (ex is InternalServerException) code = HttpStatusCode.InternalServerError;

            var result = JsonConvert.SerializeObject(new { error = ex.Message + "!" });
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;
            return context.Response.WriteAsync(result);
        }
    }
}