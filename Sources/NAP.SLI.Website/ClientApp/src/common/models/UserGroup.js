import { generateSelectOptions } from "../utils/helper";

export const AllGroupsId = -1;
export const UserGroup = {
  User: 0,
  Admin: 1
};

export const getGroupName = (groupId) => {
  switch (groupId) {
    case UserGroup.User:
      return "User";
    case UserGroup.Admin:
      return "Admin";
  }
};

export const UserGroupSelectOptions = generateSelectOptions(UserGroup, getGroupName);

export const UserGroupSelectOptionsWithAll = [{ label: 'All Groups', value: AllGroupsId }].concat(UserGroupSelectOptions);