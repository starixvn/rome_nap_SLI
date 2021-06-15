using System;
using ONEbook.SpreadSheets;

namespace NAP.SLI.MatchWinLossDetail.Models
{
    public class WorkbookInfo
    {
        public TemplateInfo TemplateInfo { get; }

        public string Title { get; }

        public Func<string, string> Localize { get; }

        public string SheetName { get; }

        public WorkbookInfo(TemplateInfo templateInfo, string title, Func<string, string> localize, string sheetName)
        {
            TemplateInfo = templateInfo;
            Title = title;
            Localize = localize;
            SheetName = sheetName;
        }
    }
}