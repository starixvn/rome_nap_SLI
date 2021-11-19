using System;

namespace NAP.SLI.UserManagement.Models
{
    public class UserModel
    {
        public int UserId { get; set; }

        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Creator { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}