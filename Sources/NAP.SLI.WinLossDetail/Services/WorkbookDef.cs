using NAP.SLI.WinLossDetail.Models;
using ONEbook.SpreadSheets;

namespace NAP.SLI.WinLossDetail.Services
{
    public abstract class WorkbookDef<T> where T : AgentRecord
    {
        public abstract Mapper<T> CreateMapper(bool isBody);
    }

    public class AgentWorkbookDef : WorkbookDef<AgentRecord>
    {
        public override Mapper<AgentRecord> CreateMapper(bool isBody)
        {
            var mapper = new Mapper<AgentRecord>()
                .Map(Column.B, x => x.BetCount)
                .Map(Column.C, x => x.Turnover)
                .Map(Column.D, x => x.MemberWinLoss)
                .Map(Column.E, x => x.AgentWinLoss)
                .Map(Column.F, x => -x.MemberWinLoss + x.AgentWinLoss);
            if (isBody)
            {
                mapper.Map(Column.A, x => x.Username);
            }

            return mapper;
        }
    }

    public class MasterWorkbookDef : WorkbookDef<MasterRecord>
    {
        public override Mapper<MasterRecord> CreateMapper(bool isBody)
        {
            var mapper = new Mapper<MasterRecord>()
                .Map(Column.B, x => x.BetCount)
                .Map(Column.C, x => x.Turnover)
                .Map(Column.D, x => x.MemberWinLoss)
                .Map(Column.E, x => x.AgentWinLoss)
                .Map(Column.F, x => x.MasterWinLoss)
                .Map(Column.G, x => -x.MemberWinLoss + x.AgentWinLoss + x.MasterWinLoss);
            if (isBody)
            {
                mapper.Map(Column.A, x => x.Username);
            }

            return mapper;
        }
    }

    public class SuperWorkbookDef : WorkbookDef<SuperRecord>
    {
        public override Mapper<SuperRecord> CreateMapper(bool isBody)
        {
            var mapper = new Mapper<SuperRecord>()
                .Map(Column.B, x => x.BetCount)
                .Map(Column.C, x => x.Turnover)
                .Map(Column.D, x => x.MemberWinLoss)
                .Map(Column.E, x => x.AgentWinLoss)
                .Map(Column.F, x => x.MasterWinLoss)
                .Map(Column.G, x => x.SuperWinLoss)
                .Map(Column.H, x => -x.MemberWinLoss + x.AgentWinLoss + x.MasterWinLoss + x.SuperWinLoss);
            if (isBody)
            {
                mapper.Map(Column.A, x => x.Username);
            }

            return mapper;
        }
    }
}