using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserManagement.Core.DTOs;
using UserManagement.Core.Entities;

namespace UserManagement.Core.Interfaces.Services
{
    public interface IUserService
    {
        IEnumerable<User> GetAll();
        User? GetById(Guid id);
        User Add(UserDto dto);
        User Update(Guid id, UserDto dto);
        void Delete(Guid id);
    }
}
