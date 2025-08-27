using Microsoft.AspNetCore.Mvc;
using MVCEtWebAPI.Data;
using Models.Models;
using Microsoft.AspNetCore.Authorization;
using WebAPI.DTO;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class TestDataController : ControllerBase
    {
        protected readonly ApplicationDbContext _dbContext;

        public TestDataController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<TestData>> GetAll()
        {
            return _dbContext.TestDatas.ToList();
        }

        [Authorize]
        [HttpPost]
        public ActionResult<TestData> CreateData(CreateTestDataDTO data)
        {
            TestData testData = new TestData() { Name = data.Name };
            _dbContext.TestDatas.Add(testData);
            _dbContext.SaveChanges();
            return testData;
        }
    }
}
