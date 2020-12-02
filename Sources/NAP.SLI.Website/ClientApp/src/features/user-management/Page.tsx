// @ts-nocheck
import './Page.scss';
import React from 'react';
import { Label, Form, Input, Button, FormGroup, Table, Container, Spinner } from 'reactstrap';
import Icon from '@mdi/react';
import { mdiAccountPlus, mdiLockReset } from '@mdi/js';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field } from 'formik';
import { query, updateUserStatus } from './reducer';
import AddNewUserModal from './add-new-user/Modal';
import { toggleModal as toggleAddNewUserModel } from './add-new-user/reducer';
import AddExistingUserModal from './add-existing-user/Modal';
import { toggleModal as toggleAddExistingUserModel } from './add-existing-user/reducer';
import EditUserModal from './edit-user/Modal';
import { toggleModal as toggleEditUserModal } from './edit-user/reducer';
import ResetUserPasswordModal from './reset-user-password/Modal';
import { toggleModal as toggleResetUserPasswordModal } from './reset-user-password/reducer';
import { UserGroupSelectOptionsWithAll, getGroupName } from '../../common/utils/UserGroupUtils';
import FormikSelect from '../../common/components/select/FormikSelect';
import { confirm } from '../../common/components/confirmation/reducer';
import { formatDateTime } from '../../common/utils/DateUtils';

const UserManagementPage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.userManagement);

  const handleStatusClick = (user) => {
    const newClosed = !user.closed;
    const title = newClosed ? "Deactivate User" : "Activate User";
    const message = `Are you sure to ${newClosed ? 'deactivate' : 'activate'} user [${user.userName}]?`;
    dispatch(confirm({
      title,
      message
    }, () => {
      dispatch(updateUserStatus({
        custId: user.custId,
        closed: newClosed
      }))
    }));
  };

  const renderTableBody = () => {
    if (users.length === 0) {
      return (
        <tr>
          <td className="text-center" colSpan={8}>
            There is no information
          </td>
        </tr>
      );
    }

    return (
      <>
        {users.map(user =>
          <tr key={`Row_${user.custId}`}>
            <td>
              <span className="text-link" onClick={() => dispatch(toggleEditUserModal({ user }))}>{user.userName}</span>
            </td>
            <td>
              {user.firstName}
            </td>
            <td>
              {user.lastName}
            </td>
            <td>
              {getGroupName(user.groupId)}
            </td>
            <td>
              {user.creator}
            </td>
            <td className="text-center">
              {formatDateTime(user.createdDate)}
            </td>
            <td className="text-center">
              <Input type="checkbox" checked={!user.closed} onChange={e => handleStatusClick(user)} />
            </td>
            <td className="text-center">
              <Icon className="cursor-pointer" path={mdiLockReset} onClick={() => dispatch(toggleResetUserPasswordModal({ user }))} />
            </td>
          </tr>
        )}
      </>
    );
  };

  return (
    <div className="user-management-page">
      <div className="page-title">User Management</div>
      <Container fluid className="filter">
        <Form inline className="mb-3">
          <FormGroup className="mr-2">
            <Button type="button" className="btn-block" onClick={() => dispatch(toggleAddNewUserModel())}>
              <Icon path={mdiAccountPlus} /> Add New User
          </Button>
          </FormGroup>
          <FormGroup>
            <Button type="button" className="btn-block" onClick={() => dispatch(toggleAddExistingUserModel())}>
              <Icon path={mdiAccountPlus} /> Add Existing User
          </Button>
          </FormGroup>
        </Form>
        <Formik
          initialValues={{
            userName: '',
            groupId: UserGroupSelectOptionsWithAll[0].value
          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(query(values, () => setSubmitting(false)));
          }}
        >
          {({
            handleSubmit,
            isSubmitting
          }) => (
              <Form className="mb-3" onSubmit={handleSubmit}>
                <fieldset disabled={isSubmitting} className="form-inline">
                  <FormGroup className="mr-5">
                    <Label for="userName" className="mr-2">Username</Label>
                    <Input name="userName" type="text" autoComplete="off" tag={Field} />
                  </FormGroup>
                  <FormGroup className="mr-5">
                    <FormikSelect name="groupId" options={UserGroupSelectOptionsWithAll} />
                  </FormGroup>
                  <FormGroup>
                    <Button type="submit" color="primary">
                      {isSubmitting && <Spinner className='mr-3' />}
                      Search
                    </Button>
                  </FormGroup>
                </fieldset>
              </Form>
            )}
        </Formik>
      </Container>
      {users && <Table hover bordered striped>
        <thead>
          <tr>
            <th className="text-center">USER NAME</th>
            <th className="text-center">FIRST NAME</th>
            <th className="text-center">LAST NAME</th>
            <th className="text-center">GROUP NAME</th>
            <th className="text-center">CREATOR</th>
            <th className="text-center">CREATED DATE</th>
            <th className="text-center">ACTIVE</th>
            <th className="text-center">PASSWORD</th>
          </tr>
        </thead>
        <tbody>
          {renderTableBody()}
        </tbody>
      </Table>}
      <AddNewUserModal />
      <AddExistingUserModal />
      <EditUserModal />
      <ResetUserPasswordModal />
    </div>
  );
};

export default UserManagementPage;
