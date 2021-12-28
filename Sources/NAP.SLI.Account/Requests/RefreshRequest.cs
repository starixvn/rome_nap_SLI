namespace NAP.SLI.Account.Requests
{
    using MediatR;
    using NAP.SLI.Account.Models;

    public class RefreshRequest : IRequest<AuthenticationModel>
    {
    }
}
