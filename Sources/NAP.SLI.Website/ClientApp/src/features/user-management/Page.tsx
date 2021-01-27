import './Page.scss';
import React, { useEffect, useRef, useState } from 'react';
import {
  Label,
  Form,
  Input,
  Button,
  FormGroup,
  Table,
  Container,
  Spinner,
} from 'reactstrap';
import Icon from '@mdi/react';
import { mdiAccountPlus, mdiLockReset } from '@mdi/js';
import { useSelector, batch } from 'react-redux';
import { Formik, Field, FormikProps, FormikHelpers } from 'formik';
import {
  query,
  updateUserStatus,
  QueryProps,
  UserModel,
  patchUser,
} from './reducer';
import AddNewUserModal from './add-new-user/Modal';
import { toggleModal as toggleAddNewUserModel } from './add-new-user/reducer';
import AddExistingUserModal from './add-existing-user/Modal';
import { toggleModal as toggleAddExistingUserModel } from './add-existing-user/reducer';
import EditUserModal from './edit-user/Modal';
import { openModal as openEditUserModal } from './edit-user/reducer';
import ResetUserPasswordModal from './reset-user-password/Modal';
import { openModal as openResetUserPasswordModal } from './reset-user-password/reducer';
import {
  UserGroupSelectOptionsWithAll,
  getGroupName,
} from 'utils/UserGroupUtils';
import FormikSelect from 'components/select/FormikSelect';
import { formatDateTime } from 'utils/DateUtils';
import { useAppDispatch } from 'app/store';
import Confirmation from 'components/confirmation/Confirmation';
import { error, success } from 'components/toast/reducer';

const UserManagementPage = () => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<UserModel | undefined>(undefined);
  const formikRef = useRef<FormikProps<QueryProps>>(null);
  const { users, queryArg } = useSelector(
    (state: AppState) => state.userManagement,
  );

  useEffect(() => {
    if (formikRef.current && users === undefined) {
      formikRef.current.handleSubmit();
    }
  }, [users]);

  const handleQuery = async (
    values: QueryProps,
    { setSubmitting }: FormikHelpers<QueryProps>,
  ) => {
    if (
      values.groupId &&
      values.groupId === UserGroupSelectOptionsWithAll[0].value
    ) {
      values.groupId = undefined;
    }

    setSubmitting(true);
    await dispatch(query(values));
    setSubmitting(false);
  };

  const handleUpdateStatus = async (user: UserModel) => {
    const newClosed = !user.closed;
    const payload = {
      custId: user.custId,
      closed: newClosed,
    };
    const resultAction = await dispatch(updateUserStatus(payload));
    if (updateUserStatus.fulfilled.match(resultAction)) {
      const resultData = resultAction.payload;
      if (resultData.isSuccess) {
        closeConfirmation();
        batch(() => {
          dispatch(success('Updated successfully'));
          dispatch(patchUser({ data: payload }));
        });
      } else {
        dispatch(error(resultData.errMsg));
      }
    }
  };

  const closeConfirmation = () => {
    setUser(undefined);
  };

  const renderConfirmation = () => {
    if (!user) {
      return <></>;
    }

    const newClosed = !user.closed;
    const title = newClosed ? 'Deactivate User' : 'Activate User';
    const message = `Are you sure to ${
      newClosed ? 'deactivate' : 'activate'
    } user [${user.userName}]?`;
    return (
      <Confirmation
        title={title}
        message={message}
        onConfirm={async () => await handleUpdateStatus(user)}
        onCancel={closeConfirmation}
      />
    );
  };

  const renderTableBody = () => {
    if (!users) {
      return <></>;
    }

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
        {users.map((user) => (
          <tr key={`Row_${user.custId}`}>
            <td>
              <span
                className="text-link"
                onClick={() => dispatch(openEditUserModal({ user }))}
              >
                {user.userName}
              </span>
            </td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{getGroupName(user.groupId)}</td>
            <td>{user.creator}</td>
            <td className="text-center">{formatDateTime(user.createdDate)}</td>
            <td className="text-center">
              <Input
                type="checkbox"
                checked={!user.closed}
                onChange={() => setUser(user)}
              />
            </td>
            <td className="text-center">
              <span
                onClick={() => dispatch(openResetUserPasswordModal({ user }))}
              >
                <Icon className="cursor-pointer" path={mdiLockReset} />
              </span>
            </td>
          </tr>
        ))}
      </>
    );
  };

  const initialValues = queryArg;
  return (
    <div className="user-management-page">
      <div className="page-title">User Management</div>
      <Container fluid className="filter">
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          onSubmit={handleQuery}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <fieldset disabled={isSubmitting}>
                <div className="form-inline mb-3">
                  <FormGroup className="mr-2">
                    <Button
                      type="button"
                      className="btn-block"
                      onClick={() => dispatch(toggleAddNewUserModel())}
                    >
                      <Icon path={mdiAccountPlus} /> Add New User
                    </Button>
                  </FormGroup>
                  <FormGroup>
                    <Button
                      type="button"
                      className="btn-block"
                      onClick={() => dispatch(toggleAddExistingUserModel())}
                    >
                      <Icon path={mdiAccountPlus} /> Add Existing User
                    </Button>
                  </FormGroup>
                </div>
                <div className="form-inline">
                  <FormGroup className="mr-5">
                    <Label for="username" className="mr-2">
                      Username
                    </Label>
                    <Input
                      name="username"
                      type="text"
                      autoComplete="off"
                      tag={Field}
                    />
                  </FormGroup>
                  <FormGroup className="mr-5">
                    <FormikSelect
                      name="groupId"
                      options={UserGroupSelectOptionsWithAll}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button type="submit" color="primary">
                      {isSubmitting && <Spinner className="mr-3" />}
                      Search
                    </Button>
                  </FormGroup>
                </div>
              </fieldset>
            </Form>
          )}
        </Formik>
      </Container>
      {users && (
        <Table hover bordered striped>
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
          <tbody>{renderTableBody()}</tbody>
        </Table>
      )}
      <AddNewUserModal />
      <AddExistingUserModal />
      <EditUserModal />
      <ResetUserPasswordModal />
      {renderConfirmation()}
    </div>
  );
};

export default UserManagementPage;
