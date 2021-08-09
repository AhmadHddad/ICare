using Microsoft.VisualBasic;
using System.Reflection.Metadata;
using System.Linq;
using System.Threading.Tasks;
using ICareAPI.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using ICareAPI.Services;
using static ICareAPI.Constants.Constants;

namespace ICareAPI.Middlewares
{
    public class RequestInterceptorMiddleware
    {

        private readonly RequestDelegate _next;
        private readonly RedisCacheService _redisCacheService;

        public RequestInterceptorMiddleware(RequestDelegate next, RedisCacheService redisCacheService)
        {
            _redisCacheService = redisCacheService;
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {


            // Call the next delegate/middleware in the pipeline

            var allBearerToken = context.Request.Headers["Authorization"].FirstOrDefault();

            if (allBearerToken is null || string.IsNullOrEmpty(allBearerToken) || string.IsNullOrWhiteSpace(allBearerToken)) return;


            var contextUserId = await GetUserIdFromToken(allBearerToken);

            if (contextUserId != 0)
            {

                var stringifiedValues = await _redisCacheService.GetCacheValueAsync(CACHED_BLOCKED_USERS_IDS_KEY);

                if (stringifiedValues is null || string.IsNullOrEmpty(stringifiedValues)) return;

                var blockedUsersIds = JsonConvert.DeserializeObject(stringifiedValues, typeof(int[])) as int[];

                if (blockedUsersIds is not null && blockedUsersIds.Any(blockedUserId => blockedUserId == contextUserId))
                {
                    return;
                }
                else
                {
                    await _next(context);

                };
            }
            else
            {
                await _next(context);

            }




        }


        private Task<int> GetUserIdFromToken(string allBearerToken)
        {
            var token = allBearerToken.Split(" ")[1];
            var id = 0;

            if (string.IsNullOrEmpty(token) || token == "null") return Task.FromResult(id);

            var handler = new JwtSecurityTokenHandler();
            var parsedToken = handler.ReadJwtToken(token);

            var userIdClaim = parsedToken.Claims.FirstOrDefault(claim => claim.Type == "nameid");

            if (userIdClaim is null) return Task.FromResult(id);

             id = int.Parse(userIdClaim.Value);

            return Task.FromResult(id);

        }
    }
}