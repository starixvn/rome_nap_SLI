namespace NAP.SLI.Customer.Models
{
    using NAP.SLI.Common.Models;

    public class CustomerModel : ResultModel
    {
        public GeneralInformationModel GeneralInformation { get; set; }

        public HeadlineModel Headline { get; set; }
    }
}
