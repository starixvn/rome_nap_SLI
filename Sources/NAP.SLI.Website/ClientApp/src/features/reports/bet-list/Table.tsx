import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { Ticket } from './reducer';
import './Table.scss';

const TableComponent = () => {
  const { queryData, queryCustomer } = useSelector(
    (state: AppState) => state.betList,
  );

  if (!queryData || !queryCustomer) {
    return <></>;
  }

  const { Tickets, SumCommHtml, SumWinLossHtml, TotalHtml } = queryData;

  return (
    <Table bordered className="bet-list-table">
      <thead>
        <tr className="text-center">
          <th className="col-number">No</th>
          <th className="col-date">Date</th>
          <th>Choice</th>
          <th className="col-odds">Odds</th>
          <th className="col-state">State</th>
          <th className="col-winloss">Win Loss</th>
          <th className="col-status">Status</th>
          <th className="col-pt">SuperPT/Comm</th>
          <th className="col-pt">MasterPT/Comm</th>
          <th className="col-pt">AgentPT/Comm</th>
        </tr>
      </thead>
      <tbody>
        {Tickets.length === 0 ? (
          <tr>
            <td className="text-center" colSpan={10}>
              There is no information
            </td>
          </tr>
        ) : (
          <>
            {Tickets.map((ticket: Ticket, index: number) => (
              <tr key={index}>
                <td className="text-right">{index + 1}</td>
                <td
                  className="text-center"
                  dangerouslySetInnerHTML={{
                    __html: ticket.TransDateHtml,
                  }}
                />
                <td
                  className="text-right"
                  dangerouslySetInnerHTML={{
                    __html: ticket.ChoiceHtml,
                  }}
                />
                <td
                  className="text-right"
                  dangerouslySetInnerHTML={{
                    __html: ticket.OddHtml,
                  }}
                />
                <td
                  className="text-right"
                  dangerouslySetInnerHTML={{
                    __html: ticket.StakeHtml,
                  }}
                />
                <td
                  className="text-right font-weight-bold"
                  dangerouslySetInnerHTML={{
                    __html: ticket.WinLossHtml,
                  }}
                />
                <td
                  className="text-center"
                  dangerouslySetInnerHTML={{
                    __html: ticket.StatusHtml,
                  }}
                />
                <td
                  className="text-right bg-gray"
                  dangerouslySetInnerHTML={{
                    __html: ticket.SuperPTComHtml,
                  }}
                />
                <td
                  className="text-right bg-gray"
                  dangerouslySetInnerHTML={{
                    __html: ticket.MasterPTComHtml,
                  }}
                />
                <td
                  className="text-right bg-gray"
                  dangerouslySetInnerHTML={{
                    __html: ticket.AgentPTComHtml,
                  }}
                />
              </tr>
            ))}
            <tr className="total text-right">
              <td colSpan={5}>Subtotal(winlost):</td>
              <td dangerouslySetInnerHTML={{ __html: SumWinLossHtml }} />
              <td colSpan={4} />
            </tr>
            <tr className="total text-right">
              <td colSpan={5}>Subtotal(Com.):</td>
              <td dangerouslySetInnerHTML={{ __html: SumCommHtml }} />
              <td colSpan={4} />
            </tr>
            <tr className="total text-right">
              <td colSpan={5}>Total:</td>
              <td dangerouslySetInnerHTML={{ __html: TotalHtml }} />
              <td colSpan={4} />
            </tr>
          </>
        )}
      </tbody>
    </Table>
  );
};

export default TableComponent;
