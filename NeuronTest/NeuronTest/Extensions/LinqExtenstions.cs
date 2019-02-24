using System;
using System.Linq;

namespace NeuronTest.Extensions
{
    public static class LinqExtenstions
    {
        public static int GetMaxIndex(this int[] array)
        {
            return !array.Any() ? -1 :
                array
                    .Select((value, index) => new { Value = value, Index = index })
                    .Aggregate((x, y) => x.Value > y.Value ? x : y)
                    .Index;
        }
    }
}