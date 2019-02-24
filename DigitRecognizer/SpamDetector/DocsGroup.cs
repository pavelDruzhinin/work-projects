using System.Collections.Generic;

namespace SpamDetector
{
    public class DocsGroup
    {
        public float Proportion { get; set; }
        public Dictionary<string, float> TokenFrequencies { get; set; }
    }
}