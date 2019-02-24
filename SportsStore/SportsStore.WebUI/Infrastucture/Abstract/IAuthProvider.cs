namespace SportsStore.WebUI.Infrastucture.Abstract
{
    public interface IAuthProvider
    {
        bool Authenticate(string username, string password);
    }
}
