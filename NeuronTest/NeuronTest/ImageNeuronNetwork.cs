using System;
using System.IO;
using NeuronTest.Extensions;
using Newtonsoft.Json;

namespace NeuronTest
{
    public class ImageNeuronNetwork
    {
        private readonly string _neuronPath = $"{AppDomain.CurrentDomain.BaseDirectory}Neurons.json";

        public ImageNeuron[] Neurons { get; set; }

        public ImageNeuronNetwork(int neuronCount, int weight, int height)
        {
            if (!File.Exists(_neuronPath))
            {
                Neurons = new ImageNeuron[neuronCount];

                for (var i = 0; i < neuronCount; i++)
                {
                    Neurons[i] = new ImageNeuron
                    {
                        Weight = new int[weight, height]
                    };
                }
            }
            else
            {
                var json = File.ReadAllText(_neuronPath);
                Neurons = JsonConvert.DeserializeObject<ImageNeuron[]>(json);
            }
        }

        ~ImageNeuronNetwork()
        {
            var json = JsonConvert.SerializeObject(Neurons);
            File.WriteAllText(_neuronPath, json);
        }

        public int GetAnswer(int[,] input)
        {
            var answers = new int[Neurons.Length];

            for (var i = 0; i < Neurons.Length; i++)
            {
                answers[i] = Neurons[i].Handle(input);
            }

            return answers.GetMaxIndex();
        }

        public void Study(int[,] input, int correctAnswer, int factor)
        {
            Neurons[correctAnswer].Study(input, factor);
        }
    }
}