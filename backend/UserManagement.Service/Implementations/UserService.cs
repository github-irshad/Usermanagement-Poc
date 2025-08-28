using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserManagement.Core.DTOs;
using UserManagement.Core.Entities;
using UserManagement.Core.Interfaces.Repositories;
using UserManagement.Core.Interfaces.Services;

namespace UserManagement.Service.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;

        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<User> GetAll() => _repository.GetAll();

        public User? GetById(Guid id) => _repository.GetById(id);

        public User Add(UserDto dto)
        {
            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Gender = dto.Gender,
                DateOfBirth = dto.DateOfBirth,
                Phone = dto.Phone,
                Department = dto.Department
            };

            _repository.Add(user);
            return user;
        }

        public User Update(Guid id, UserDto dto)
        {
            var user = _repository.GetById(id) ?? throw new KeyNotFoundException("User not found");

            user.Name = dto.Name;
            user.Email = dto.Email;
            user.Gender = dto.Gender;
            user.DateOfBirth = dto.DateOfBirth;
            user.Phone = dto.Phone;
            user.Department = dto.Department;

            _repository.Update(user);
            return user;
        }

        public void Delete(Guid id) => _repository.Delete(id);
    }
}
