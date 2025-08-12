const getNavList = (params) => {
  const { id, type, status, ownership } = params;
  const navList = [
    {
      label: "Overview",
      to: `/user/accounts/${id}`,
      requiresActiveAccount: false,
      requiresBusinessAccount: false
    },
    {
      label: "Users",
      to: `/user/accounts/${id}/account-users`,
      requiresActiveAccount: false,
      requiresBusinessAccount: false
    },
    {
      label: "Requests",
      to: `/user/accounts/${id}/requests`,
      requiresActiveAccount: false,
      requiresJointAccount: true
    },
    {
      label: "Profile",
      to: `/user/accounts/${id}/business-profile`,
      requiresActiveAccount: true,
      requiresBusinessAccount: true
    },
    {
      label: "Deposit",
      to: `/user/accounts/${id}/deposit`,
      requiresActiveAccount: true,
      requiresBusinessAccount: false
    },
    {
      label: "Withdraw",
      to: `/user/accounts/${id}/withdraw`,
      requiresActiveAccount: true,
      requiresBusinessAccount: false
    },
    /*  {
      label: "Transfer",
      to: `/user/accounts/${id}/transfer`,
      requiresActiveAccount: true,
      requiresBusinessAccount: false,
    }, */
    {
      label: "Transactions",
      to: `/user/accounts/${id}/transactions`,
      requiresActiveAccount: false,
      requiresBusinessAccount: false
    },
    {
      label: "Investments",
      to: `/user/accounts/${id}/investments`,
      requiresActiveAccount: false,
      requiresBusinessAccount: false
    },
    {
      label: "Notifications",
      to: `/user/accounts/${id}/notifications`,
      requiresActiveAccount: false,
      requiresBusinessAccount: false
    },
    {
      label: "Settings",
      to: `/user/accounts/${id}/settings`,
      requiresActiveAccount: true,
      requiresBusinessAccount: false
    }
  ];
  return navList.filter((item) => {
    if (item.requiresActiveAccount && status !== "active") return false;
    if (item.requiresBusinessAccount && type !== "business") return false;
    if (item.requiresJointAccount && ownership !== "joint") return false;
    return true;
  });
};

export { getNavList };
//# sourceMappingURL=nav-list-ceUvdrXM.mjs.map
