import GlobalSpinner from 'components/spinner/GlobalSpinner';
import React, { useState } from 'react';
import { Alert, Modal, ModalBody, ModalHeader, Table } from 'reactstrap';
import ResultsModal from 'features/reports/results/Modal';
import { QueryData } from './types';
import './Table.scss';

type Props = {
  data: QueryData;
  isHappy5LinkedGame: boolean;
};

const TableComponent = ({ data, isHappy5LinkedGame }: Props) => {
  const [modal, setModal] = useState(false);
  const [sportType, setSportType] = useState(0);
  const [matchId, setMatchId] = useState(0);

  const handleToggle = () => setModal(!modal);

  window.ViewResult = async (
    matchId: number,
    race: number,
    betType: number,
    sportType: number,
    refNo: number,
    username: string,
    _winlostdate: string,
    _refno_mixparlay: string,
    _league: number,
    _is_outright: number,
    betId: number,
  ) => {
    setSportType(sportType);
    setMatchId(matchId);
    handleToggle();
  };

  const { Tickets, SumCommHtml, SumWinLossHtml, TotalHtml } = data;
  return (
    <>
      {isHappy5LinkedGame && <GlobalSpinner />}
      <Table bordered className="bet-list-table">
        <thead>
          <tr className="text-center">
            <th className="col-number align-middle">No</th>
            <th className="col-date align-middle">Date</th>
            <th className="align-middle">Choice</th>
            <th className="col-odds align-middle">Odds</th>
            <th className="col-state align-middle">State</th>
            <th className="col-winloss align-middle">Win Loss</th>
            <th className="col-status align-middle">Status</th>
            <th className="col-pt align-middle">
              Super
              <br />
              PT/Comm
            </th>
            <th className="col-pt align-middle">
              Master
              <br />
              PT/Comm
            </th>
            <th className="col-pt align-middle">
              Agent
              <br />
              PT/Comm
            </th>
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
              {Tickets.map((ticket, index: number) => (
                <tr key={index}>
                  <td className="text-center align-middle">{index + 1}</td>
                  <td
                    className="text-center align-middle"
                    dangerouslySetInnerHTML={{
                      __html: ticket.TransDateHtml,
                    }}
                  />
                  <td
                    className="text-right align-middle"
                    dangerouslySetInnerHTML={{
                      __html: ticket.ChoiceHtml,
                    }}
                  />
                  <td
                    className="text-right align-middle"
                    dangerouslySetInnerHTML={{
                      __html: ticket.OddHtml,
                    }}
                  />
                  <td
                    className="text-right align-middle"
                    dangerouslySetInnerHTML={{
                      __html: ticket.StakeHtml,
                    }}
                  />
                  <td
                    className="text-right font-weight-bold align-middle"
                    dangerouslySetInnerHTML={{
                      __html: ticket.WinLossHtml,
                    }}
                  />
                  <td
                    className="text-center align-middle"
                    dangerouslySetInnerHTML={{
                      __html: ticket.StatusHtml,
                    }}
                  />
                  <td
                    className="text-right bg-gray align-middle"
                    dangerouslySetInnerHTML={{
                      __html: ticket.SuperPTComHtml,
                    }}
                  />
                  <td
                    className="text-right bg-gray align-middle"
                    dangerouslySetInnerHTML={{
                      __html: ticket.MasterPTComHtml,
                    }}
                  />
                  <td
                    className="text-right bg-gray align-middle"
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
      <Alert color="secondary">
        <b>Note: </b>Com. is rounded for reference only. Therefore, Subtotal
        Com. amount may be different from the sum of Com. when it sums all the
        actual Com. amounts.
      </Alert>
      <Modal
        centered
        isOpen={modal}
        size="xl"
        toggle={handleToggle}
        fade={false}
      >
        <ModalHeader toggle={handleToggle}>RESULTS</ModalHeader>
        <ModalBody>
          <ResultsModal sportType={sportType} matchId={matchId} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default TableComponent;
