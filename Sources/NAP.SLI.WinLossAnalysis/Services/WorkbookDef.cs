using NAP.SLI.WinLossAnalysis.Models;
using ONEbook.SpreadSheets;

namespace NAP.SLI.WinLossAnalysis.Services
{
    public abstract class WorkbookDef<T> where T : AgentRecord
    {
        public abstract Mapper<T> CreateMapper(bool isBody);
    }

    public class AgentWorkbookDef : WorkbookDef<AgentRecordEx>
    {
        public override Mapper<AgentRecordEx> CreateMapper(bool isBody)
        {
            var mapper = new Mapper<AgentRecordEx>()
                            .Map(Column.B, x => x.BetCount)
                            .Map(Column.C, x => x.Turnover)
                            .Map(Column.D, x => x.MemberWinLoss)
                            .Map(Column.E, x => x.AgentWinLoss)
                            .Map(Column.F, x => x.CompanyWinLoss);
            if (isBody)
            {
                mapper.Map(Column.A, x => x.RollupKey);
            }

            return mapper;
        }
    }

    public class MasterWorkbookDef : WorkbookDef<MasterRecordEx>
    {
        public override Mapper<MasterRecordEx> CreateMapper(bool isBody)
        {
            var mapper = new Mapper<MasterRecordEx>()
                            .Map(Column.B, x => x.BetCount)
                            .Map(Column.C, x => x.Turnover)
                            .Map(Column.D, x => x.MemberWinLoss)
                            .Map(Column.E, x => x.AgentWinLoss)
                            .Map(Column.F, x => x.MasterWinLoss)
                            .Map(Column.G, x => x.CompanyWinLoss);
            if (isBody)
            {
                mapper.Map(Column.A, x => x.RollupKey);
            }

            return mapper;
        }
    }

    public class SuperWorkbookDef : WorkbookDef<SuperRecordEx>
    {
        public override Mapper<SuperRecordEx> CreateMapper(bool isBody)
        {
            var mapper = new Mapper<SuperRecordEx>()
                            .Map(Column.B, x => x.BetCount)
                            .Map(Column.C, x => x.Turnover)
                            .Map(Column.D, x => x.MemberWinLoss)
                            .Map(Column.E, x => x.AgentWinLoss)
                            .Map(Column.F, x => x.MasterWinLoss)
                            .Map(Column.G, x => x.SuperWinLoss)
                            .Map(Column.H, x => x.CompanyWinLoss);
            if (isBody)
            {
                mapper.Map(Column.A, x => x.RollupKey);
            }

            return mapper;
        }
    }
}