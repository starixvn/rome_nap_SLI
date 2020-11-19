namespace NAP.SLI.Customer.Handlers
{
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.Customer.Models;
    using NAP.SLI.Customer.Requests;
    using NAP.SLI.Customer.Services;

    public class GetInformationHandler : IRequestHandler<GetInformationRequest, CustomerModel>
    {
        private readonly ICustomerService customerService;

        public GetInformationHandler(ICustomerService customerService)
        {
            this.customerService = customerService;
        }

        public async Task<CustomerModel> Handle(GetInformationRequest request, CancellationToken cancellationToken)
        {
            return await customerService.GetInformation(request.Username).ConfigureAwait(false);
        }
    }
}
