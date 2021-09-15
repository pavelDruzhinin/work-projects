using Projects.Models;
using Projects.Models.Contracts;
using Projects.Services;
using Projects.View;
using Projects.ViewModels;
using System.Windows;

namespace Projects
{
    /// <summary>
    /// Логика взаимодействия для MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private IProjectsModel _projectModel;

        public MainWindow()
        {
            InitializeComponent();
            _projectModel = new ProjectsModel(
                new DataService());
        }

        private void ShowProjectsButton_Click(object sender,
            RoutedEventArgs e)
        {
            ProjectsView view = new ProjectsView();
            view.DataContext
                = new ProjectsViewModel(_projectModel);
            view.Owner = this;
            view.Show();
        }
    }
}
