namespace UserManagement.Core.Entities;


public enum Gender { Male = 1, Female = 2 }
public enum Department { Engineering = 1, Sales = 2, HR = 3, Finance = 4, Marketing = 5, Operations = 6 }


public sealed class User
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public Gender Gender { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public string Phone { get; set; } = string.Empty;
    public Department Department { get; set; }
}