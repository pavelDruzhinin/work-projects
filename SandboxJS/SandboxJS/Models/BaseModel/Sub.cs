namespace SandboxJS.Models.BaseModel
{
    public class Sub
    {
        public string Url { get { return "/" + Controller.Replace(" ", string.Empty) + "/" + Name.Replace(" ", string.Empty); } }
        public string Name { get; set; }

        public string Controller { get; set; }

        public Sub(string name)
        {
            Name = name;
        }
    }
}