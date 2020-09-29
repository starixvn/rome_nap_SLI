export const Role =
{
    Null: -9999,
    Headline: 0,
    Member: 1,
    Agent: 2,
    Master: 3,
    Super: 4
};

export const GetRole = (roleValue) => {
    switch (roleValue) {
        case Role.Null:
            return "Null";
        case Role.Headline:
            return "Headline";
        case Role.Member:
            return "Member";
        case Role.Agent:
            return "Agent";
        case Role.Master:
            return "Master";
        case Role.Super:
            return "Super";
        default:
            return "";
    }
}