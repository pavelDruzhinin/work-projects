using System;
using Projects.Classes.Contracts;

namespace Projects.Args
{
    public class ProjectEventArgs : EventArgs
    {
        public IProject Project { get; set; }

        public ProjectEventArgs(IProject project)
        {
            Project = project;
        }
    }
}