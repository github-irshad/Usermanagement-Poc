using UserManagement.Core.Entities;


namespace UserManagement.Core.DTOs;


public sealed record UserResponse(
Guid Id,
string Name,
string Email,
Gender Gender,
DateOnly DateOfBirth,
string Phone,
Department Department
);


public sealed record CreateUserRequest(
string Name,
string Email,
Gender Gender,
DateOnly DateOfBirth,
string Phone,
Department Department
);


public sealed record UpdateUserRequest(
string Name,
string Email,
Gender Gender,
DateOnly DateOfBirth,
string Phone,
Department Department
);