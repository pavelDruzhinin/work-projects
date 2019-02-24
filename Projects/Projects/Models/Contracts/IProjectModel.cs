using System;
using System.Collections.ObjectModel;
using Projects.Args;
using Projects.Classes;
using Projects.Classes.Contracts;

namespace Projects.Models.Contracts
{
    public interface IProjectModel
    {
        ObservableCollection<Project> Projects { get; set; }
        event EventHandler<ProjectEventArgs> ProjectUpdated;
        void UpdateProject(IProject updatedProject);
    }
}