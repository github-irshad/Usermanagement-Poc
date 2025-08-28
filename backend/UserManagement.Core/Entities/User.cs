using UserManagement.Core.Enums;

namespace UserManagement.Core.Entities;




public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public Gender Gender { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string Phone { get; set; } = string.Empty;
    public Department Department { get; set; }
    public Role Role { get; set; }
}