namespace NAP.SLI.Customer.Models
{
    public class HeadlineModel
    {
        public int MemberId { get; set; }

        public string MemberName { get; set; }

        public int AgentId { get; set; }

        public string AgentName { get; set; }

        public bool AgentEnabled { get; set; }

        public int MasterId { get; set; }

        public string MasterName { get; set; }

        public bool MasterEnabled { get; set; }

        public int SuperId { get; set; }

        public string SuperName { get; set; }

        public bool SuperEnabled { get; set; }
    }
}
