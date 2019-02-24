using System.Collections.Generic;

namespace DigitRecognizer
{
    public class BasicClassifier : IClassifier
    {
        private IEnumerable<Observation> _data;
        private readonly IDistance _distance;
        public BasicClassifier(IDistance distance)
        {
            _distance = distance;
        }

        public void Train(IEnumerable<Observation> trainingSet)
        {
            _data = trainingSet;
        }

        public Observation GetObservation(int[] pixels)
        {
            Observation currentBest = null;
            var shortest = double.MaxValue;
            foreach (var obs in _data)
            {
                var dist = _distance.Between(obs.Pixels,
                    pixels);

                if (!(dist < shortest))
                    continue;

                shortest = dist;
                currentBest = obs;
            }

            return currentBest;
        }

        public string Predict(int[] pixels)
        {
            Observation currentBest = null;
            var shortest = double.MaxValue;
            foreach (var obs in _data)
            {
                var dist = _distance.Between(obs.Pixels,
                    pixels);

                if (!(dist < shortest))
                    continue;

                shortest = dist;
                currentBest = obs;
            }

            return currentBest?.Label ?? "Nothing";
        }
    }
}