using System.Collections.Generic;
using Projects.Classes;
using Projects.Services.Contracts;

namespace Projects.Services
{
    public class DataService : IDataService
    {
        public IEnumerable<Project> GetProjects()
        {
            return new List<Project>
            {
                new Project()
                {
                    ID = 0,
                    Name = "Halloway",
                    Estimate = 500
                },
                new Project()
                {
                    ID = 1,
                    Name = "Jones",
                    Estimate = 1500
                },
                new Project()
                {
                    ID = 2,
                    Name = "Smith",
                    Estimate = 2000
                }
            };
        }
    }
}