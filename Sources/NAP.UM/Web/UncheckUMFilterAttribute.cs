namespace NAP.UM.Web
{
    using System;

    public interface IUncheckUMFilter
    {
    }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class UncheckUMFilterAttribute : Attribute, IUncheckUMFilter
    {
    }
}
