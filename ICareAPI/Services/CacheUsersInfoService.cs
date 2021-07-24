using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ICareAPI.Data;
using ICareAPI.Dtos;
using ICareAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using ICareAPI.Constants;

namespace ICareAPI.Services
{
    public class CacheUsersInfoService : BackgroundService
    {
        private readonly RedisCacheService _redisCacheService;
        private readonly IServiceScopeFactory _scopeFactory;

        public CacheUsersInfoService(IServiceScopeFactory scopeFactory,
        RedisCacheService redisCacheService)
        {
            _scopeFactory = scopeFactory;
            _redisCacheService = redisCacheService;



        }

        public async Task<IList<int>> GetBlockedUserIdsAsync()
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                var _userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();

                return await _userManager.Users.Where(u => u.Blocked).Select(user => user.Id).ToListAsync();
            }

        }



        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            this.CacheBlockedUsersIds();

            return Task.CompletedTask;
        }


        public async void CacheBlockedUsersIds()
        {
            var blockedusersIds = await this.GetBlockedUserIdsAsync();

            System.Console.WriteLine("______________");
            System.Console.WriteLine(JsonConvert.SerializeObject(blockedusersIds));

            await _redisCacheService.SetCacheValueAsync(Contants.CACHED_BLOCKED_USERS_IDS_KEY, JsonConvert.SerializeObject(blockedusersIds));

        }
    }
}