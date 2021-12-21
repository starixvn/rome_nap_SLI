import './Page.scss';
import React, { useEffect, useRef } from 'react';
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
import { mdiLockReset } from '@mdi/js';
import { useSelector } from 'react-redux';
import { Formik, Field, FormikProps, FormikHelpers } from 'formik';
import { query, QueryProps } from './reducer';
import EditUserModal from './edit-user/Modal';
import { openModal as openEditUserModal } from './edit-user/reducer';
import ResetUserPasswordModal from './reset-user-password/Modal';
import { openModal as openResetUserPasswordModal } from './reset-user-password/reducer';
import { formatDateTime } from 'utils/DateUtils';
import { useAppDispatch } from 'app/store';

const UserManagementPage = () => {
  const dispatch = useAppDispatch();
  const formikRef = useRef<FormikProps<QueryProps>>(null);
  const { users, queryArg } = useSelector(
    (state: AppState) => state.userManagement,
  );
  let promise: AppPromise | undefined;

  useEffect(() => {
    if (formikRef.current && users === undefined) {
      formikRef.current.handleSubmit();
    }

    return () => {
      if (promise) {
        promise.abort();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleQuery = (
    values: QueryProps,
    { setSubmitting }: FormikHelpers<QueryProps>,
  ) => {
    setSubmitting(true);
    promise = dispatch(query(values));
    promise.finally(() => {
      setSubmitting(false);
    });
  };

  const renderTableBody = () => {
    if (!users) {
      return <></>;
    }

    if (users.length === 0) {
      return (
        <tr>
          <td className="text-center" colSpan={7}>
            There is no information
          </td>
        </tr>
      );
    }

    return (
      <>
        {users.map((user) => (
          <tr key={`Row_${user.userId}`}>
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
            <td>{user.email}</td>
            <td>{user.creator}</td>
            <td className="text-center">{formatDateTime(user.createdDate)}</td>
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
      {users !== undefined && (
        <Table hover bordered striped>
          <thead>
            <tr>
              <th className="text-center">USER NAME</th>
              <th className="text-center">FIRST NAME</th>
              <th className="text-center">LAST NAME</th>
              <th className="text-center">EMAIL</th>
              <th className="text-center">CREATOR</th>
              <th className="text-center">CREATED DATE</th>
              <th className="text-center">PASSWORD</th>
            </tr>
          </thead>
          <tbody>{renderTableBody()}</tbody>
        </Table>
      )}
      <EditUserModal />
      <ResetUserPasswordModal />
    </div>
  );
};

export default UserManagementPage;
