using System;

namespace NlogTest.Domain
{
    public class User
    {
        
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string SecondName { get; set; }

        public DateTime? DeleteUtcDateTime { get; set; }

        public string FullName => $"{FirstName} {LastName} {SecondName}";
    }
}