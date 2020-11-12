export const CustomerRole =
{
    Headline: 0,
    Member: 1,
    Agent: 2,
    Master: 3,
    Super: 4
};

export const getRoleName = (roleId) => {
    switch (roleId) {
        case CustomerRole.Headline:
            return "Headline";
        case CustomerRole.Member:
            return "Member";
        case CustomerRole.Agent:
            return "Agent";
        case CustomerRole.Master:
            return "Master";
        case CustomerRole.Super:
            return "Super";
    }
};