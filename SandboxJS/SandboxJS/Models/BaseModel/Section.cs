using System.Collections.Generic;

namespace SandboxJS.Models.BaseModel
{
    public class Section
    {
        public string Name { get; set; }
        public List<Sub> Subs { get; set; }

        public Section(string name, List<Sub> subs)
        {
            Name = name;
            subs.ForEach(x => x.Controller = Name);

            Subs = subs;
        }
    }
}