using Microsoft.AspNetCore.Mvc;


namespace Api.Controllers
{
    public class HealthController : Controller
    {
        [HttpGet("/health")]
        public IActionResult Index()
        {
            return Ok("Healthy");
        }
    }
}
