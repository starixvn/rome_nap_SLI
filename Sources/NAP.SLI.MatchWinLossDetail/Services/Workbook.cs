using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using NAP.SLI.MatchWinLossDetail.Models;
using ONEbook.SpreadSheets;
using ONEbook.SpreadSheets.NPOI;

namespace NAP.SLI.MatchWinLossDetail.Services
{
    public abstract class Workbook<T> : NpoiWorkbook<T> where T : class, ISumRecord<T>, new()
    {
        private int currentRowIndex = 0;
        private const int ReportSheetIndex = 1;
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
            var sheet = GetSheetAt(TemplateInfo.SheetIndex);
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

    public class AgentWorkbook : Workbook<AgentRecord2>
    {
        public AgentWorkbook(WorkbookInfo workbookInfo, AgentData data)
        : base(workbookInfo, data)
        {
        }

        protected override Mapper<AgentRecord2> CreateMapper(bool isBody)
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

    public class MasterWorkbook : Workbook<MasterRecord2>
    {
        public MasterWorkbook(WorkbookInfo workbookInfo, MasterData data)
        : base(workbookInfo, data)
        {
        }

        protected override Mapper<MasterRecord2> CreateMapper(bool isBody)
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

    public class SuperWorkbook : Workbook<SuperRecord2>
    {
        public SuperWorkbook(WorkbookInfo workbookInfo, SuperData data)
        : base(workbookInfo, data)
        {
        }

        protected override Mapper<SuperRecord2> CreateMapper(bool isBody)
        {
            var mapper = new Mapper<SuperRecord2>()
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
}