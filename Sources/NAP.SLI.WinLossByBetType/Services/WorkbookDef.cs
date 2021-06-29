using NAP.SLI.WinLossByBetType.Models;
using ONEbook.SpreadSheets;

namespace NAP.SLI.WinLossByBetType.Services
{
    public abstract class WorkbookDef<T> where T : RecordBase
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
                            .Map(Column.F, x => -x.MemberWinLoss - x.AgentWinLoss);
            if (isBody)
            {
                mapper.Map(Column.A, x => x.BetType);
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
                            .Map(Column.D, x => x.AgentTotal)
                            .Map(Column.E, x => x.MasterWinLoss)
                            .Map(Column.F, x => -x.AgentTotal - x.MasterWinLoss);
            if (isBody)
            {
                mapper.Map(Column.A, x => x.BetType);
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
                            .Map(Column.D, x => x.MasterTotal)
                            .Map(Column.E, x => x.SuperWinLoss)
                            .Map(Column.F, x => -x.MasterTotal - x.SuperWinLoss);
            if (isBody)
            {
                mapper.Map(Column.A, x => x.BetType);
            }

            return mapper;
        }
    }
}