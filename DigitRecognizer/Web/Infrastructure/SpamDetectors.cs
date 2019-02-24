using System;
using System.Linq;
using FSpamDetector;
using Microsoft.FSharp.Core;
using SpamDetector;

namespace Web.Infrastructure
{
    public static class SpamDetectors
    {
        private static FSharpFunc<string, ReadData.DocType> _fDetector;
        public static FSharpFunc<string, ReadData.DocType> FDetector => _fDetector ?? (_fDetector = NaiveBayes.train());

        private static NaiveBayesClassifier _detector;
        public static NaiveBayesClassifier Detector => _detector ?? (_detector = GetTrainedDetector());

        private static NaiveBayesClassifier GetTrainedDetector()
        {
            var baseDirectory = @"C:\Users\pavel\Documents\Visual Studio 2017\Projects\DigitRecognizer\FSpamDetector";

            var filePath = $@"{baseDirectory}\SMSSpamCollection.txt";
            var docs = SpamDataReader.Read(filePath);
            var classificationTokens = new[] { "txt" }.ToList();
            return new NaiveBayesClassifier(docs, new WordTokenizer(), classificationTokens);
        }
    }
}