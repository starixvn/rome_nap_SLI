import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from 'app/store';
import GlobalSpinner from 'components/spinner/GlobalSpinner';
import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader, Table } from 'reactstrap';
import { SportTypes } from 'utils/ConstantUtils';
import { QueryData } from './types';
import './Table.scss';

type Props = {
  data: QueryData;
  isHappy5LinkedGame: boolean;
};

const TableComponent = ({ data, isHappy5LinkedGame }: Props) => {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(false);
  const [url, setUrl] = useState('');

  const handleToggle = () => setModal((prevModal) => !prevModal);

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
    betid: number,
  ) => {
    // Happy5 Linked Games
    if (sportType === SportTypes.Happy5_Linked_Game) {
      // const result = await dispatch(
      //   getHappy5LinkedGame({
      //     obCustId: betid,
      //     tranId3rd: refno,
      //     isDesktop: true,
      //   }),
      // );
      // const urlRes = unwrapResult(result);
      // setUrl(urlRes);
      handleToggle();
    }
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
      <Modal
        centered
        isOpen={modal}
        size="xl"
        toggle={handleToggle}
        fade={false}
      >
        <ModalHeader toggle={handleToggle}>Results </ModalHeader>
        <ModalBody>
          <iframe
            src={url}
            height="600px"
            width="100%"
            title="results"
            style={{ border: 'none' }}
          ></iframe>
        </ModalBody>
      </Modal>
    </>
  );
};

export default TableComponent;
