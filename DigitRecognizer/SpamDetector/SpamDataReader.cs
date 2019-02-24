using System;
using System.IO;
using System.Linq;

namespace SpamDetector
{
    public class SpamDataReader
    {
        public static Tuple<DocLabel, string>[] Read(string filePath)
        {
            return File
                .ReadAllLines(filePath)
                .Select(ParseLine)
                .ToArray();
        }

        private static Tuple<DocLabel, string> ParseLine(string line)
        {
            var split = line.Split('\t');
            var label = GetDocLabel(split[0]);
            return new Tuple<DocLabel, string>(label, split[1]);
        }

        private static DocLabel GetDocLabel(string label)
        {
            switch (label)
            {
                case "ham": return DocLabel.Ham;
                case "spam": return DocLabel.Spam;
                default: throw new ArgumentException("Failed to label");
            }
        }
    }

    public enum DocLabel
    {
        Ham,
        Spam
    }
}