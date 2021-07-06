using System;
using System.Globalization;
using System.Linq;
using NAP.SLI.MatchWinLossDetail.Models;
using ONEbook.SpreadSheets;
using ONEbook.SpreadSheets.NPOI;

namespace NAP.SLI.MatchWinLossDetail.Services
{
    public abstract class Workbook<T> : NpoiWorkbook<T> where T : class, IRecordEx<T>, new()
    {
        private const int ReportSheetIndex = 0;
        private const int TemplateSheetIndex = 1;
        private int currentRowIndex = 0;

        internal Data<T> Data { get; }
        internal Row MatchTitleRowTemplate { get; private set; }
        internal Row OddRowTemplate { get; private set; }
        internal Row EvenRowTemplate { get; private set; }
        internal Row SubTotalRowTemplate { get; private set; }
        internal Row TotalRowTemplate { get; private set; }
        protected abstract Mapper<T> CreateMapper(bool isBody);

        public Workbook(WorkbookInfo workbookInfo, Data<T> data)
        {
            UseTemplate(workbookInfo.TemplateInfo).Title(workbookInfo.Title).Sheet(workbookInfo.SheetName).Header(workbookInfo.Localize);
            Data = data;
        }

        protected override Sheet LoadTemplateSheet()
        {
            var sheet = GetSheetAt(TemplateSheetIndex);
            currentRowIndex = TemplateInfo.BodyStartIndex + 1;
            MatchTitleRowTemplate = sheet.GetRow(currentRowIndex++);
            OddRowTemplate = sheet.GetRow(currentRowIndex++);
            EvenRowTemplate = sheet.GetRow(currentRowIndex++);
            SubTotalRowTemplate = sheet.GetRow(currentRowIndex++);
            TotalRowTemplate = sheet.GetRow(currentRowIndex++);

            return GetSheetAt(ReportSheetIndex);
        }

        protected override void FillNoInfoRow(Sheet sheet)
        {
            if (sheet == null)
            {
                throw new ArgumentNullException(nameof(sheet), "Sheet cannot be null");
            }

            var rowIndex = TemplateInfo.BodyStartIndex;
            var colIndex = Column.GetColIndex(TemplateInfo.ColumnStartName);

            sheet.SetCellRangeValue(
                rowIndex,
                colIndex,
                rowIndex,
                MatchTitleRowTemplate.LastCellIndex - 1,
                TemplateInfo.NoInfomationText);
            sheet.GetCell(rowIndex, colIndex).SetCenterHorizontalAlignment();
        }

        protected override void FillBody(Sheet sheet)
        {
            if (sheet == null)
            {
                throw new ArgumentNullException(nameof(sheet), "Sheet cannot be null");
            }

            Workbook.RemoveSheetAt(TemplateSheetIndex);
            if (Data.Matches.Any())
            {
                FillBodyRows(sheet);
                FillFooterRows(sheet);
            }
            else
            {
                FillNoInfoRow(sheet);
            }
        }

        protected override void FillBodyRows(Sheet sheet)
        {
            if (sheet == null)
            {
                throw new ArgumentNullException(nameof(sheet), "Sheet cannot be null");
            }

            currentRowIndex = TemplateInfo.BodyStartIndex;
            var bodyMapper = CreateMapper(true);
            var totalMapper = CreateMapper(false);
            Row row;
            foreach (var match in Data.Matches)
            {
                FillMatchTitle(sheet, currentRowIndex++, match);
                var isEvenRow = false;
                foreach (var record in match.Records)
                {
                    row = sheet.GetRow(currentRowIndex++);
                    row.CopyCellsFrom(isEvenRow ? EvenRowTemplate : OddRowTemplate);
                    FillCells(row, record, bodyMapper.Mappings);
                    isEvenRow = !isEvenRow;
                }

                row = sheet.GetRow(currentRowIndex++);
                row.CopyCellsFrom(SubTotalRowTemplate);
                FillCells(row, match.Total, totalMapper.Mappings);
            }
        }

        private void FillMatchTitle(Sheet sheet, int rowIndex, MatchData<T> dataRecord)
        {
            var row = sheet.GetRow(rowIndex);
            row.CopyCellsFrom(MatchTitleRowTemplate);

            var title = (dataRecord.LeagueName + (string.IsNullOrEmpty(dataRecord.MatchName) ? string.Empty : $" >> {dataRecord.MatchName}"))
                .ToUpper(CultureInfo.InvariantCulture);
            sheet.SetCellRangeValue(rowIndex, row.FirstCellIndex, rowIndex, row.LastCellIndex - 1, title);
        }

        protected override void FillFooterRows(Sheet sheet)
        {
            if (sheet == null)
            {
                throw new ArgumentNullException(nameof(sheet), "Sheet cannot be null");
            }

            var totalMapper = CreateMapper(false);
            var row = sheet.GetRow(currentRowIndex);
            row.CopyCellsFrom(TotalRowTemplate);
            FillCells(row, Data.Total, totalMapper.Mappings);
        }
    }

    public class AgentWorkbook : Workbook<AgentRecordEx>
    {
        public AgentWorkbook(WorkbookInfo workbookInfo, AgentData data)
        : base(workbookInfo, data)
        {
        }

        protected override Mapper<AgentRecordEx> CreateMapper(bool isBody)
        {
            var mapper = new Mapper<AgentRecordEx>()
                            .Map(Column.B, x => x.Turnover)
                            .Map(Column.C, x => x.MemberWinLoss)
                            .Map(Column.D, x => x.AgentWinLoss)
                            .Map(Column.E, x => x.CompanyWinLoss);
            if (isBody)
            {
                mapper.Map(Column.A, x => x.BetTypeName);
            }

            return mapper;
        }
    }

    public class MasterWorkbook : Workbook<MasterRecordEx>
    {
        public MasterWorkbook(WorkbookInfo workbookInfo, MasterData data)
        : base(workbookInfo, data)
        {
        }

        protected override Mapper<MasterRecordEx> CreateMapper(bool isBody)
        {
            var mapper = new Mapper<MasterRecordEx>()
                            .Map(Column.B, x => x.Turnover)
                            .Map(Column.C, x => x.MemberWinLoss)
                            .Map(Column.D, x => x.AgentWinLoss)
                            .Map(Column.E, x => x.MasterWinLoss)
                            .Map(Column.F, x => x.CompanyWinLoss);
            if (isBody)
            {
                mapper.Map(Column.A, x => x.BetTypeName);
            }

            return mapper;
        }
    }

    public class SuperWorkbook : Workbook<SuperRecordEx>
    {
        public SuperWorkbook(WorkbookInfo workbookInfo, SuperData data)
        : base(workbookInfo, data)
        {
        }

        protected override Mapper<SuperRecordEx> CreateMapper(bool isBody)
        {
            var mapper = new Mapper<SuperRecordEx>()
                            .Map(Column.B, x => x.Turnover)
                            .Map(Column.C, x => x.MemberWinLoss)
                            .Map(Column.D, x => x.AgentWinLoss)
                            .Map(Column.E, x => x.MasterWinLoss)
                            .Map(Column.F, x => x.CompanyWinLoss);
            if (isBody)
            {
                mapper.Map(Column.A, x => x.BetTypeName);
            }

            return mapper;
        }
    }
}