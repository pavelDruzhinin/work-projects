using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

namespace NeuronTest.Extensions
{
    public static class ImageExtensions
    {
        public static int[,] ToByte(this Image img)
        {
            var bmp = new Bitmap(img);

            var mass = new int[bmp.Width, bmp.Height];

            for (var y = 0; y < img.Height; y++)
            {
                for (var x = 0; x < img.Width; x++)
                {
                    var isWhite = bmp.GetPixel(x, y).R >= 230 && bmp.GetPixel(x, y).G >= 230 &&
                                  bmp.GetPixel(x, y).B >= 230;
                    mass[x, y] = isWhite ? 0 : 1;
                }
            }

            return mass;
        }

        public static Image ToImage(this int[,] img)
        {
            var bmp = new Bitmap(img.GetLength(0), img.GetLength(1));

            for (var y = 0; y < bmp.Height; y++)
            {
                for (var x = 0; x < bmp.Width; x++)
                {
                    bmp.SetPixel(x, y, img[x, y] == 1 ? Color.Black : Color.White);
                }
            }

            return bmp;
        }

        public static int[,] CutNumber(this int[,] bytes)
        {
            return bytes;

            //var r = GetRect(bytes);

            //var mass = new int[r.Width, r.Height];

            //for (var y = 0; y < bytes.GetLength(0); y++)
            //{
            //    for (var x = 0; x < bytes.GetLength(1); x++)
            //    {
            //        mass[x, y] = bytes[x + r.X, y + r.Y];
            //    }
            //}

            //return mass;
        }

        public static Image ScaleImage(this Image source, int width, int height)
        {
            var destRect = new Rectangle(0, 0, width, height);
            var destImage = new Bitmap(width, height);

            destImage.SetResolution(source.HorizontalResolution, source.VerticalResolution);

            using (var graphics = Graphics.FromImage(destImage))
            {
                graphics.CompositingMode = CompositingMode.SourceCopy;
                graphics.CompositingQuality = CompositingQuality.HighQuality;
                graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphics.SmoothingMode = SmoothingMode.HighQuality;
                graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;

                using (var wrapMode = new ImageAttributes())
                {
                    wrapMode.SetWrapMode(WrapMode.TileFlipXY);
                    graphics.DrawImage(source, destRect, 0, 0, source.Width, source.Height, GraphicsUnit.Pixel, wrapMode);
                }
            }

            return destImage;
        }

        public static int[,] ToInput(this Image source, int width, int height)
        {
            return source.ToByte().CutNumber().ToImage().ScaleImage(width, height).ToByte();
        }

        private static Rectangle GetRect(int[,] bytes)
        {
            return new Rectangle(0, 0, bytes.GetLength(1), bytes.GetLength(0));
        }
    }
}