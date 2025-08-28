using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserManagement.Core.Entities;
using UserManagement.Core.Interfaces.Repositories;

namespace UserManagement.Repository.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly List<User> _users = new();

        public IEnumerable<User> GetAll() => _users;

        public User? GetById(Guid id) => _users.FirstOrDefault(u => u.Id == id);

        public void Add(User user) => _users.Add(user);

        public void Update(User user)
        {
            var index = _users.FindIndex(u => u.Id == user.Id);
            if (index != -1)
                _users[index] = user;
        }

        public void Delete(Guid id) => _users.RemoveAll(u => u.Id == id);
    }
}
