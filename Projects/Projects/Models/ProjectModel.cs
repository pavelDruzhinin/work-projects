using System;
using System.Collections.ObjectModel;
using System.Linq;
using Projects.Args;
using Projects.Classes;
using Projects.Classes.Contracts;
using Projects.Models.Contracts;
using Projects.Services.Contracts;

namespace Projects.Models
{
    public class ProjectModel : IProjectModel
    {
        public ObservableCollection<Project> Projects { get; set; }
        public event EventHandler<ProjectEventArgs> ProjectUpdated = delegate { };

        public ProjectModel(IDataService dataService)
        {
            Projects = new ObservableCollection<Project>();

            foreach (var project in dataService.GetProjects())
            {
                Projects.Add(project);
            }

        }

        public void UpdateProject(IProject updatedProject)
        {
            GetProject(updatedProject.ID).Update(updatedProject);
            ProjectUpdated(this,
                new ProjectEventArgs(updatedProject));
        }

        private Project GetProject(int projectId)
        {
            return Projects.FirstOrDefault(
                project => project.ID == projectId);
        }
    }
}