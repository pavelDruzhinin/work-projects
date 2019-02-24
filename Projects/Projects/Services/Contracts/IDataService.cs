using System.Collections.Generic;
using Projects.Classes;

namespace Projects.Services.Contracts
{
    public interface IDataService
    {
        IEnumerable<Project> GetProjects();
    }
}