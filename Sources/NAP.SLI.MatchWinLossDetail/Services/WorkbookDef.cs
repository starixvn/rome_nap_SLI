using NAP.SLI.MatchWinLossDetail.Models;
using ONEbook.SpreadSheets;

namespace NAP.SLI.MatchWinLossDetail.Services
{
    public abstract class WorkbookDef<T> where T : AgentRecord
    {
        public abstract Mapper<T> CreateMapper(bool isBody);
    }

    public class AgentWorkbookDef : WorkbookDef<AgentRecord2>
    {
        public override Mapper<AgentRecord2> CreateMapper(bool isBody)
        {
            var mapper = new Mapper<AgentRecord2>()
                            .Map(Column.B, x => x.Turnover)
                            .Map(Column.C, x => x.MemberWinLoss)
                            .Map(Column.D, x => x.AgentWinLoss)
                            .Map(Column.E, x => -x.MemberWinLoss + x.AgentWinLoss);
            if (isBody)
            {
                mapper.Map(Column.A, x => x.BetTypeName);
            }

            return mapper;
        }
    }

    public class MasterWorkbookDef : WorkbookDef<MasterRecord2>
    {
        public override Mapper<MasterRecord2> CreateMapper(bool isBody)
        {
            var mapper = new Mapper<MasterRecord2>()
                            .Map(Column.B, x => x.Turnover)
                            .Map(Column.C, x => x.MemberWinLoss)
                            .Map(Column.D, x => x.AgentWinLoss)
                            .Map(Column.E, x => x.MasterWinLoss)
                            .Map(Column.F, x => -x.MemberWinLoss + x.AgentWinLoss + x.MasterWinLoss);
            if (isBody)
            {
                mapper.Map(Column.A, x => x.BetTypeName);
            }

            return mapper;
        }
    }

    public class SuperWorkbookDef : WorkbookDef<SuperRecord2>
    {
        public override Mapper<SuperRecord2> CreateMapper(bool isBody)
        {
            var mapper = new Mapper<SuperRecord2>()
                            .Map(Column.B, x => x.Turnover)
                            .Map(Column.C, x => x.MemberWinLoss)
                            .Map(Column.D, x => x.AgentWinLoss)
                            .Map(Column.E, x => x.MasterWinLoss)
                            .Map(Column.F, x => x.SuperWinLoss)
                            .Map(Column.G, x => -x.MemberWinLoss + x.AgentWinLoss + x.MasterWinLoss + x.SuperWinLoss);
            if (isBody)
            {
                mapper.Map(Column.A, x => x.BetTypeName);
            }

            return mapper;
        }
    }
}