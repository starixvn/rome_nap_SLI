namespace NAP.SLI.Common.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System;

    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class CommonController: Controller
    {
        [HttpGet("[action]")]
        public void Exception()
        {
            //throw new NotSupportedException("Test");
        }
    }
}
