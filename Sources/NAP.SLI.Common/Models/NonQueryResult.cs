namespace NAP.SLI.Common.Models
{
    public class NonQueryResult
    {
        public int ErrCode { get; set; }

        public string ErrMessage { get; set; }

        public bool IsSuccessful => ErrCode == 0;
    }
}
