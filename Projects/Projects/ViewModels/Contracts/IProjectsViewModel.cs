using System.ComponentModel;

namespace Projects.ViewModels.Contracts
{
    public interface IProjectsViewModel : INotifyPropertyChanged
    {
        IProjectViewModel SelectedProject { get; set; }
        void UpdateProject();
    }
}