using System.Security.Claims;
using ICareAPI.Helpers;
using ICareAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;

namespace ICareAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(LogUserActivity))]
    public class BaseController : ControllerBase
    {

        private LoggedInUser? _loggedInUser;

        protected LoggedInUser? LoggedInUser
        {
            get
            {

                if (_loggedInUser is null)
                {


                    Request.Headers.TryGetValue("Authorization", out StringValues Token);


                    if (string.IsNullOrWhiteSpace(Token))
                    {
                        _loggedInUser = null;
                        return _loggedInUser;
                    }
                    else
                    {
                        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                        var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
                        var userName = User.FindFirst(ClaimTypes.Name)?.Value;

                        if (userEmail is not null && userId is not null && userName is not null)
                        {
                            _loggedInUser = new LoggedInUser()
                            {
                                Email = userEmail,
                                Name = userName,
                                Id = userId
                            };

                            return _loggedInUser;
                        }
                        else
                        {
                            return _loggedInUser;
                        }
                    }


                }
                else
                {
                    return _loggedInUser;
                }
            }
        }



    }
}