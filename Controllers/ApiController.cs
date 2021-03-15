using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Evrit.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Api : ControllerBase
    {


        [HttpGet]
        [Route("Search/{q}")]
        public async Task<string> Search(string q)
        {
            return await Evrit.Api.GetSearch(q);
        }
    }
}