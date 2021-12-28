namespace NAP.SLI.Customer.Requests
{
    using System.ComponentModel.DataAnnotations;
    using MediatR;
    using NAP.SLI.Customer.Models;

    public class GetInformationRequest : IRequest<CustomerModel>
    {
        /// <example>supertest1</example>
        [Required]
        public string Username { get; set; }
    }
}
