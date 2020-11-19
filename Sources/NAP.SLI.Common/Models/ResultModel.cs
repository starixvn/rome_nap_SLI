namespace NAP.SLI.Common.Models
{
    public class ResultModel
    {
        public int ErrCode { get; set; }

        public string ErrMsg { get; set; }

        public bool IsSuccessful => ErrCode == ErrorCodes.OK;
    }
}
