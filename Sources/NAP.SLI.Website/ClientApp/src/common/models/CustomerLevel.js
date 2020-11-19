export const CustomerLevels =
{
    Member: 1,
    Agent: 2,
    Master: 3,
    Super: 4
};

export const getLevelName = (levelId) => {
    switch (levelId) {
        case CustomerLevels.Member:
            return "Member";
        case CustomerLevels.Agent:
            return "Agent";
        case CustomerLevels.Master:
            return "Master";
        case CustomerLevels.Super:
            return "Super";
    }
};