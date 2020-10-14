using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace ICareAPI
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            var host = Host.CreateDefaultBuilder(args)
                .UseContentRoot(Directory.GetCurrentDirectory())
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder
                        .UseKestrel()
                        .UseIIS()
                        .UseStartup<Startup>();
                }).Build();
            host.Run();
        }
    }
}