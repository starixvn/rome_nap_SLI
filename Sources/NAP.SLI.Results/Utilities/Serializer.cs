namespace NAP.SLI.Results.Utilities
{
    using SimpleJson;

    public interface ISerializer
    {
        string Serialize<T>(T data);

        T Deserialize<T>(string data);
    }

    public class JsonSerializer : ISerializer
    {
        public string Serialize<T>(T data) => SimpleJson.SerializeObject(data);

        public T Deserialize<T>(string data) => SimpleJson.DeserializeObject<T>(data);
    }
}