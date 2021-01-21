export const CustomerLevels = {
  Member: 1,
  Agent: 2,
  Master: 3,
  Super: 4,
};

export const getLevelName = (levelId: number) => {
  switch (levelId) {
    case CustomerLevels.Member:
      return 'Member';
    case CustomerLevels.Agent:
      return 'Agent';
    case CustomerLevels.Master:
      return 'Master';
    case CustomerLevels.Super:
      return 'Super';
    default:
      return '';
  }
};

export const getDownlineLevel = (levelId: number) => {
  switch (levelId) {
    case CustomerLevels.Super:
      return CustomerLevels.Master;
    case CustomerLevels.Master:
      return CustomerLevels.Agent;
    case CustomerLevels.Agent:
      return CustomerLevels.Member;
    default:
      return -1;
  }
};

export const isDownlineLevel = (levelId: number, targetLevelId: number) => {
  return levelId < targetLevelId;
};

export const isUplineOrSameLevel = (levelId: number, targetLevelId: number) => {
  return levelId >= targetLevelId;
};
