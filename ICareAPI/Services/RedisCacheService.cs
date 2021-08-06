using System.Collections.Generic;
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

        public void SetCacheValuesAsync(string key, List<int> listValues)
        {

            listValues.ForEach(async val =>
            {

                await _database.ListLeftPushAsync(key, val);

            });

        }


        public async Task<RedisValue[]> GetCacheValuesAsync(string key) 
        => await _database.ListRangeAsync(key, 0, -1);
    }
}