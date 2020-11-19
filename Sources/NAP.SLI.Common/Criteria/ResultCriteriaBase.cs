namespace NAP.SLI.Common.Criteria
{
    using Fanex.Data;
    using Fanex.Data.Repository;
    using NAP.SLI.Common.Models;

    public abstract class ResultCriteriaBase : CriteriaBase
    {
        public int ErrCode { get; set; }

        public string ErrMsg { get; set; }

        [SpParam(Ignored = true)]
        public bool IsSuccessful => ErrCode == ErrorCodes.OK;
    }
}
