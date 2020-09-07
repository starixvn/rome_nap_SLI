namespace NAP.SLI.Common.Models
{
    using Fanex.Data;

    public class NonQueryResult
    {
        public int ErrCode { get; set; }

        public string ErrMsg { get; set; }

        [SpParam(Ignored = true)]
        public bool IsSuccessful => ErrCode == ErrorCodes.OK;
    }
}
