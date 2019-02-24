using System.Collections.Generic;

namespace SpamDetector
{
    public interface ITokenizer
    {
        List<string> GetTokens(string messageText);
    }
}