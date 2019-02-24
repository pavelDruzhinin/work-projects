using System;

namespace Keyhook.Args
{
    public class FileReadyArgs : EventArgs
    {
        public string FilePath { get; private set; }

        public FileReadyArgs(string filePath)
        {
            FilePath = filePath;
        }
    }
}