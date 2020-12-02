namespace NAP.SLI.Common.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class CommonController: ControllerBase
    {
        [HttpGet("[action]")]
        public void Exception()
        {
            ////throw new NotSupportedException("Test");
        }
    }
}
