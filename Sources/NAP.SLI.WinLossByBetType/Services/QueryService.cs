using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Fanex.Data.Repository;
using NAP.SLI.Common.Services;
using NAP.SLI.WinLossByBetType.Criteria;
using NAP.SLI.WinLossByBetType.Models;
using NAP.SLI.WinLossByBetType.Requests;

namespace NAP.SLI.WinLossByBetType.Services
{
    public interface IQueryService
    {
        Task<SuperData> QuerySuper(QueryRequest request);

        Task<MasterData> QueryMaster(QueryRequest request);

        Task<AgentData> QueryAgent(QueryRequest request);
    }

    public class QueryService : IQueryService
    {
        private readonly IReportService reportService;
        private readonly IDynamicRepository dynamicRepository;
        private readonly IMapper mapper;

        public QueryService(IReportService reportService, IDynamicRepository dynamicRepository, IMapper mapper)
            => (this.reportService, this.dynamicRepository, this.mapper) = (reportService, dynamicRepository, mapper);

        public async Task<SuperData> QuerySuper(QueryRequest request)
        {
            var records = await Query<SuperRecord>(request).ConfigureAwait(false);
            return new SuperData(mapper.Map<IEnumerable<SuperRecord>, IEnumerable<SuperRecordEx>>(records));
        }

        public async Task<MasterData> QueryMaster(QueryRequest request)
        {
            var records = await Query<MasterRecord>(request).ConfigureAwait(false);
            return new MasterData(mapper.Map<IEnumerable<MasterRecord>, IEnumerable<MasterRecordEx>>(records));
        }

        public async Task<AgentData> QueryAgent(QueryRequest request)
        {
            var records = await Query<AgentRecord>(request).ConfigureAwait(false);
            return new AgentData(mapper.Map<IEnumerable<AgentRecord>, IEnumerable<AgentRecordEx>>(records));
        }

        private async Task<IEnumerable<T>> Query<T>(QueryRequest request)
        {
            var balanceUpDayModel = await reportService.GetBalanceUpDay().ConfigureAwait(false);
            var criteria = new QueryCriteria(balanceUpDayModel)
            {
                CustId = request.CustId,
                RoleId = request.RoleId,
                FromDate = request.FromDate,
                ToDate = request.ToDate
            };
            return await dynamicRepository.FetchAsync<T>(criteria).ConfigureAwait(false);
        }
    }
}