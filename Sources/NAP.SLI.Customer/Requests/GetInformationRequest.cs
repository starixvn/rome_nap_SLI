namespace NAP.SLI.Customer.Requests
{
    using MediatR;
    using NAP.SLI.Customer.Models;

    public class GetInformationRequest : IRequest<CustomerModel>
    {
        /// <example>supertest1</example>
        public string Username { get; set; }
    }
}
