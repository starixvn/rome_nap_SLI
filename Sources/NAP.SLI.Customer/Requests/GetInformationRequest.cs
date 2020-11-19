namespace NAP.SLI.Customer.Requests
{
    using MediatR;
    using NAP.SLI.Customer.Models;

    public class GetInformationRequest : IRequest<CustomerModel>
    {
        public string Username { get; set; }
    }
}
