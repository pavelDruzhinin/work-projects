using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace SpamDetector
{
    public class WordTokenizer : ITokenizer
    {
        public List<string> GetTokens(string messageText)
        {
            var pattern = @"\w+";
            messageText = messageText.ToLowerInvariant();

            return Regex.Matches(messageText, pattern)
                .Cast<Match>()
                .Select(x => x.Value)
                .ToList();
        }
    }
}