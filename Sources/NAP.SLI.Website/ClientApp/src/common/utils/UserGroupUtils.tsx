import { generateSelectOptions } from "./SelectUtils";

export const UserGroup = {
  User: 0,
  Admin: 1
};

export const getGroupName = (groupId: number) => {
  switch (groupId) {
    case UserGroup.User:
      return "User";
    case UserGroup.Admin:
      return "Admin";
    default:
      return '';
  }
};

export const UserGroupSelectOptions = generateSelectOptions(UserGroup, getGroupName);

export const UserGroupSelectOptionsWithAll: Array<SelectOption<number | undefined>> = [{ label: 'All Groups', value: undefined }].concat(UserGroupSelectOptions);