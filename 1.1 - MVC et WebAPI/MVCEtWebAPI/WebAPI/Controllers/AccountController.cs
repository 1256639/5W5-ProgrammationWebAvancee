﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AccountController : ControllerBase
    {
        [HttpGet]
        public ActionResult PublicTest()
        {
            return Ok(new string[] { "Pomme", "Poire", "Banane" });
        }

        [HttpGet]
        [Authorize]
        public ActionResult PrivateTest()
        {
            return Ok(new string[] { "PrivatePomme", "PrivatePoire", "PrivateBanane" });
        }
    }
}
