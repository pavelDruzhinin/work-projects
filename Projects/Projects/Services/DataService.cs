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
                new Project(),
                new Project(),
                new Project(),
                new Project()
            };
        }
    }
}