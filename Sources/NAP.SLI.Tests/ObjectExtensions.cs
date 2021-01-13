namespace NAP.SLI.Tests
{
    public static class ObjectExtensions
    {
        public static T Cast<T>(this object obj, T type)
        {
            return (T)obj;
        }
    }
}