using System;
using System.Collections.Generic;
using System.Linq;

namespace SpamDetector
{
    public class NaiveBayesClassifier
    {
        private readonly ITokenizer _tokenizer;
        private readonly List<Tuple<DocLabel, DocsGroup>> _groups;

        public NaiveBayesClassifier(Tuple<DocLabel, string>[] docs, ITokenizer tokenizer, List<string> classificationTokens)
        {
            _tokenizer = tokenizer;
            _groups = Learn(docs, classificationTokens);
        }

        public Tuple<float, Tuple<DocLabel, DocsGroup>> Classify(string messageText)
        {
            var tokenized = _tokenizer.GetTokens(messageText);

            var tuples = _groups
                .Select(x => new Tuple<float, Tuple<DocLabel, DocsGroup>>(Score(tokenized, x.Item2), x));

            //get element with max 
            return tuples.OrderByDescending(x => x.Item1).FirstOrDefault();
        }

        private float TokenScore(DocsGroup group, string token)
        {
            if (group.TokenFrequencies.ContainsKey(token))
                return (float)Math.Log(group.TokenFrequencies[token]);

            return 0.0f;
        }

        private float Score(List<string> tokenizedDoc, DocsGroup group)
        {
            return (float)Math.Log(group.Proportion) +
                   tokenizedDoc
                       .Select(x => TokenScore(@group, x))
                       .Sum();
        }

        private float Proportion(float count, float total)
        {
            return count / total;
        }

        private float Laplace(float count, float total)
        {
            return (count + 1) / (total + 1);
        }

        private int CountIn(List<List<string>> group, string token)
        {
            return group.Count(x => x.Contains(token));
        }

        private float AnalyzeScore(List<List<string>> group, string token)
        {
            var count = CountIn(group, token);
            return Laplace(count, group.Count);
        }

        private DocsGroup Analyze(List<List<string>> group, int totalDocs, List<string> classificationTokens)
        {
            var groupSize = group.Count;
            var scoredTokens = classificationTokens.ToDictionary(x => x, x => AnalyzeScore(group, x));

            return new DocsGroup
            {
                Proportion = Proportion(groupSize, totalDocs),
                TokenFrequencies = scoredTokens
            };
        }

        private List<Tuple<DocLabel, DocsGroup>> Learn(Tuple<DocLabel, string>[] docs, List<string> classificationTokens)
        {
            var total = docs.Length;

            return docs
                .Select(x => new Tuple<DocLabel, List<string>>(x.Item1, _tokenizer.GetTokens(x.Item2)))
                .GroupBy(x => x.Item1)
                .Select(x => new Tuple<DocLabel, List<List<string>>>(x.Key, x.Select(t => t.Item2).ToList()))
                .Select(x => new Tuple<DocLabel, DocsGroup>(x.Item1, Analyze(x.Item2, total, classificationTokens)))
                .ToList();
        }
    }
}