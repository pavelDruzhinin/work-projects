using Projects.Classes.Contracts;
using Projects.Models;

namespace Projects.ViewModels.Contracts
{
    public interface IProjectViewModel : IProject
    {
        Status EstimateStatus { get; set; }
    }
}