namespace DigitRecognizer
{
    public class Classifiers
    {
        private static BasicClassifier _basic;
        public static BasicClassifier Basic => _basic ?? (_basic = GetTrainingClassifier());

        private static BasicClassifier GetTrainingClassifier()
        {
            var baseDirectory = @"C:\Users\pavel\Documents\Visual Studio 2017\Projects\DigitRecognizer\DigitRecognizer\";

            var distance = new EuclidianDistance();
            var classifier = new BasicClassifier(distance);

            var trainingPath = $@"{baseDirectory}train.csv";

            var training
                = DataReader.ReadObservations(trainingPath);

            classifier.Train(training);

            return classifier;
        }
    }
}
