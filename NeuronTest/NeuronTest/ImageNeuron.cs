namespace NeuronTest
{
    public class ImageNeuron
    {
        public int[,] Weight { get; set; }

        public int Handle(int[,] input)
        {
            var power = 0;

            for (var y = 0; y < Weight.GetLength(1); y++)
            {
                for (var x = 0; x < Weight.GetLength(0); x++)
                {
                    power += Weight[x, y] * input[x, y];
                }
            }

            return power;
        }

        public void Study(int[,] input, int factor)
        {
            for (var y = 0; y < Weight.GetLength(1); y++)
            {
                for (var x = 0; x < Weight.GetLength(0); x++)
                {
                    Weight[x, y] += factor * input[x, y];
                }
            }
        }
    }
}