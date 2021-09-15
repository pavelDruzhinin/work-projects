namespace Projects.Classes.Contracts
{
    public interface IProject
    {
        int ID { get; set; }
        string Name { get; set; }
        double Estimate { get; set; }
        double Actual { get; set; }
        void Update(IProject project);
    }
}