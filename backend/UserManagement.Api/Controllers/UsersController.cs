namespace UserManagement.Api.Controllers
{
    using Core.DTOs;
    using Core.Entities;
    using Core.Interfaces.Services;
    using Microsoft.AspNetCore.Mvc;

    namespace Api.Controllers
    {
        [ApiController]
        [Route("api/[controller]")]
        public class UsersController : ControllerBase
        {
            private readonly IUserService _service;

            public UsersController(IUserService service)
            {
                _service = service;
            }

            [HttpGet]
            public ActionResult<IEnumerable<User>> GetAll() => Ok(_service.GetAll());

            [HttpGet("{id}")]
            public ActionResult<User> GetById(Guid id)
            {
                var user = _service.GetById(id);
                if (user == null) return NotFound();
                return Ok(user);
            }

            [HttpPost]
            public ActionResult<User> Add([FromBody] UserDto dto)
            {
                var user = _service.Add(dto);
                return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
            }

            [HttpPut("{id}")]
            public ActionResult<User> Update(Guid id, [FromBody] UserDto dto)
            {
                try
                {
                    var updatedUser = _service.Update(id, dto);
                    return Ok(updatedUser);
                }
                catch (KeyNotFoundException)
                {
                    return NotFound();
                }
            }

            [HttpDelete("{id}")]
            public IActionResult Delete(Guid id)
            {
                _service.Delete(id);
                return NoContent();
            }
        }
    }

}
