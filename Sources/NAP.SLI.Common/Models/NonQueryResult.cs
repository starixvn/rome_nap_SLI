namespace NAP.SLI.Common.Models
{
    public class NonQueryResult
    {
        public int ErrCode { get; set; }

        public string ErrMsg { get; set; }

        public bool IsSuccessful => ErrCode == ErrorCodes.OK;
    }
}
