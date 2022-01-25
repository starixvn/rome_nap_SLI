namespace NAP.SLI.Results.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using NAP.SLI.Results.Models;
    using ONEbook.SpreadSheets;
    using ONEbook.SpreadSheets.NPOI;

    public abstract class Workbook<T> : NpoiWorkbook<T> where T : class, IMatch
    {
        private const int ReportSheetIndex = 0;
        private const int TemplateSheetIndex = 1;
        private int currentRowIndex = 0;

        internal IEnumerable<ResultMatch<T>> Records { get; }
        internal Row LeagueNameRowTemplate { get; private set; }
        internal Row OddRowTemplate { get; private set; }
        internal Row EvenRowTemplate { get; private set; }
        internal Row CurrentRow { get; private set; }
        internal Cell RedCell { get; private set; }
        internal Cell BlueCell { get; private set; }
        internal Cell GreyCell { get; private set; }
        internal Cell BlankCell { get; private set; }
        protected abstract Mapper<T> CreateMapper();
        protected abstract void FillBallsColor(T match);

        public Workbook(WorkbookInfo workbookInfo, IEnumerable<ResultMatch<T>> records)
        {
            UseTemplate(workbookInfo.TemplateInfo).Title(workbookInfo.Title).Sheet(workbookInfo.SheetName).Header(workbookInfo.Localize);
            Records = records;
        }

        protected override Sheet LoadTemplateSheet()
        {
            var sheet = GetSheetAt(TemplateSheetIndex);
            currentRowIndex = TemplateInfo.BodyStartIndex;
            LeagueNameRowTemplate = sheet.GetRow(currentRowIndex++);
            OddRowTemplate = sheet.GetRow(currentRowIndex++);
            EvenRowTemplate = sheet.GetRow(currentRowIndex++);
            RedCell = sheet.GetCell(currentRowIndex++, 0);
            BlueCell = sheet.GetCell(currentRowIndex++, 0);
            GreyCell = sheet.GetCell(currentRowIndex++, 0);
            BlankCell = sheet.GetCell(currentRowIndex++, 0);

            return GetSheetAt(ReportSheetIndex);
        }

        protected override void FillBody(Sheet sheet)
        {
            if (sheet == null)
            {
                throw new ArgumentNullException(nameof(sheet), "Sheet cannnot be null");
            }

            Workbook.RemoveSheetAt(TemplateSheetIndex);
            if (Records.Any())
            {
                FillBodyRows(sheet);
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
                throw new ArgumentNullException(nameof(sheet), "Sheet cannnot be null");
            }

            currentRowIndex = TemplateInfo.BodyStartIndex;
            var bodyMapper = CreateMapper();
            foreach (var record in Records)
            {
                FillLeagueName(sheet, currentRowIndex++, record.LeagueName);
                var isEvenRow = false;
                foreach (var match in record.Matches)
                {
                    CurrentRow = sheet.GetRow(currentRowIndex++);
                    CurrentRow.CopyCellsFrom(isEvenRow ? EvenRowTemplate : OddRowTemplate);
                    FillBallsColor(match);
                    FillCells(CurrentRow, match, bodyMapper.Mappings);
                    isEvenRow = !isEvenRow;
                }
            }
        }

        protected override void FillNoInfoRow(Sheet sheet)
        {
            if (sheet == null)
            {
                throw new ArgumentNullException(nameof(sheet), "Sheet cannnot be null");
            }

            var rowIndex = TemplateInfo.BodyStartIndex;
            var colIndex = Column.GetColIndex(TemplateInfo.ColumnStartName);

            sheet.SetCellRangeValue(
                rowIndex,
                colIndex,
                rowIndex,
                LeagueNameRowTemplate.LastCellIndex - 1,
                TemplateInfo.NoInfomationText);
            sheet.GetCell(rowIndex, colIndex).SetCenterHorizontalAlignment();
        }

        private void FillLeagueName(Sheet sheet, int rowIndex, string leagueName)
        {
            var row = sheet.GetRow(rowIndex);
            row.CopyCellsFrom(LeagueNameRowTemplate);
            row.SetCellValue(row.FirstCellIndex, leagueName);
        }
    }

    public class NumberGameWorkbook : Workbook<NumberGameMatch>
    {
        public NumberGameWorkbook(WorkbookInfo workbookInfo, IEnumerable<ResultMatch<NumberGameMatch>> records)
        : base(workbookInfo, records)
        {
        }

        protected override Mapper<NumberGameMatch> CreateMapper()
        {
            return new Mapper<NumberGameMatch>()
                            .Map(Column.A, x => x.KickOffTime)
                            .Map(Column.B, x => x.NoMatch)
                            .Map(Column.C, x => x.OEFT)
                            .Map(Column.D, x => x.FirstBall.Number)
                            .Map(Column.E, x => x.SecondBall.Number)
                            .Map(Column.F, x => x.ThirdBall.Number)
                            .Map(Column.G, x => x.EventStatus);
        }

        protected override void FillBallsColor(NumberGameMatch match)
        {
            var firstBallTemplateCell = GetColorTemplateCell(match.FirstBall.Color);
            var secondBallTemplateCell = GetColorTemplateCell(match.SecondBall.Color);
            var thirdBallTemplateCell = GetColorTemplateCell(match.ThirdBall.Color);

            CurrentRow.GetCell(3).CopyFrom(firstBallTemplateCell);
            CurrentRow.GetCell(4).CopyFrom(secondBallTemplateCell);
            CurrentRow.GetCell(5).CopyFrom(thirdBallTemplateCell);
        }

        private Cell GetColorTemplateCell(string color)
        {
            return color switch
            {
                "disable" => GreyCell,
                "red" => RedCell,
                "blue" => BlueCell,
                _ => BlankCell
            };
        }
    }

    public class Happy5Workbook : Workbook<Happy5Match>
    {
        public Happy5Workbook(WorkbookInfo workbookInfo, IEnumerable<ResultMatch<Happy5Match>> records)
        : base(workbookInfo, records)
        {
        }

        protected override Mapper<Happy5Match> CreateMapper()
        {
            return new Mapper<Happy5Match>()
                             .Map(Column.A, x => x.KickOffTime)
                             .Map(Column.B, x => x.NoMatch)
                             .Map(Column.C, x => GetBalls(x))
                             .Map(Column.D, x => x.TotalBall)
                             .Map(Column.E, x => x.BigSmall)
                             .Map(Column.F, x => x.OddEven)
                             .Map(Column.G, x => x.FourSeason)
                             .Map(Column.H, x => x.MoreOddMoreEven)
                             .Map(Column.I, x => x.Combo)
                             .Map(Column.J, x => x.EventStatus);
        }

        protected override void FillBallsColor(Happy5Match match)
        {
        }

        private static string GetBalls(Happy5Match match)
        {
            return $"{match.FirstBall.Number} - {match.SecondBall.Number} - {match.ThirdBall.Number} - {match.FourthBall.Number} - {match.FifthBall.Number}";
        }
    }
}

