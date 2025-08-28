using UserManagement.Core.Entities;
using UserManagement.Core.Enums;
using System.ComponentModel.DataAnnotations;


namespace UserManagement.Core.DTOs;


public class UserDto
{
    public string Name { get; set; } = string.Empty;
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
    public Gender Gender { get; set; }
    public DateTime DateOfBirth { get; set; }
    [RegularExpression(@"^\+?[1-9]\d{1,14}$", ErrorMessage = "Enter a valid phone number")]
    public string Phone { get; set; } = string.Empty;
    public Department Department { get; set; }
}