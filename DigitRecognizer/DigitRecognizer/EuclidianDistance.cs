using System;
using System.Linq;

namespace DigitRecognizer
{
    public class EuclidianDistance : IDistance
    {
        public double Between(int[] pixels1, int[] pixels2)
        {
            if (pixels1.Length != pixels2.Length)
            {
                throw new ArgumentException("Inconsistent image size");
            }

            return pixels1
                .Select((x, i) => (int)Math.Pow(x - pixels2[i], 2))
                .Sum();
        }
    }
}