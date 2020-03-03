using Microsoft.AspNetCore.Mvc;
using NetCoreAngularCosmos.Data;
using NetCoreAngularCosmos.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NetCoreAngularCosmos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IDocumentDBRepository<Employee> Respository;
        private readonly string CollectionId;
        public EmployeesController(IDocumentDBRepository<Employee> Respository)
        {
            this.Respository = Respository;
            CollectionId = "Employee";
        }

        [HttpGet]
        public async Task<IEnumerable<Employee>> Get()
        {
            return await Respository.GetItemsAsync(CollectionId);
        }

        [HttpGet("{id}/{cityname}")]
        public async Task<Employee> Get(string id, string cityname)
        {
            var employees = await Respository.GetItemsAsync(d => d.Id == id && d.Cityname == cityname, CollectionId);
            Employee employee = new Employee();
            foreach (var emp in employees)
            {
                employee = emp;
                break;
            }
            return employee;
        }

        [HttpPost]
        public async Task<bool> Post([FromBody]Employee employee)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    employee.Id = null;
                    await Respository.CreateItemAsync(employee, CollectionId);
                }
                return true;
            }
            catch
            {
                return false;
            }

        }

        [HttpPut]
        public async Task<bool> Put([FromBody]Employee employee)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    await Respository.UpdateItemAsync(employee.Id, employee, CollectionId);
                }
                return true;
            }
            catch
            {
                return false;
            }
        }

        [HttpDelete("{id}/{cityname}")]
        public async Task<bool> Delete(string id, string cityname)
        {
            try
            {
                await Respository.DeleteItemAsync(id, CollectionId, cityname);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}