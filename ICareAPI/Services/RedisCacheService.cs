using System.Threading.Tasks;
using StackExchange.Redis;

namespace ICareAPI.Services
{
    public class RedisCacheService
    {
        private readonly IConnectionMultiplexer _connectionMultiplexer;
        private readonly IDatabase _database;
        public RedisCacheService(IConnectionMultiplexer connectionMultiplexer)
        {
            _connectionMultiplexer = connectionMultiplexer;
            _database = connectionMultiplexer.GetDatabase();
        }



        public async Task<string> GetCacheValueAsync(string key)
        {

            return await _database.StringGetAsync(key);
        }

        public async Task<bool> SetCacheValueAsync(string key, string value)
        {

            return await _database.StringSetAsync(key, value);
        }
    }
}