import type { DropdownMenuItem, NavigationMenuItem } from "@nuxt/ui";

export const links = ({
  signOut,
  close
}: {
  signOut: () => void;
  close: () => void;
}): NavigationMenuItem[][] => [
  [
    {
      label: "Home",
      type: "label"
    },
    {
      label: "Dashboard",
      icon: "i-lucide-house",
      to: "/admin",
      onSelect: () => close()
    }
  ],
  [
    {
      label: "Finances",
      type: "label"
    },
    {
      label: "Accounts",
      icon: "i-lucide-book-user",
      to: "/user/accounts",
      onSelect: () => close()
    },
    {
      label: "Investment Plans",
      icon: "i-lucide-circle-dollar-sign",
      to: "/user/investment-plans",
      onSelect: () => close()
    }
  ],
  [
    {
      label: "Settings",
      type: "label"
    },
    {
      label: "Users",
      icon: "lucide:users",
      to: "/admin/users",
      onSelect: () => close()
    },
    {
      label: "Banned IPs",
      icon: "lucide:shield-ban",
      to: "/admin/banned-ips",
      onSelect: () => close()
    },
    {
      label: "Transactions",
      icon: "lucide:arrow-left-right",
      to: "/admin/transactions",
      onSelect: () => close()
    },
    {
      label: "Manage Investments",
      icon: "lucide:pie-chart",
      to: "/admin/investments",
      onSelect: () => close()
    },
    {
      label: "Manage Accounts",
      icon: "lucide:square-user",
      to: "/admin/financial-accounts",
      onSelect: () => close()
    },
    {
      label: "KYC Requests",
      icon: "lucide:user-check",
      to: "/admin/kyc-data",
      onSelect: () => close()
    },
    {
      label: "Business Profiles",
      icon: "lucide:building-2",
      to: "/admin/business-profiles",
      onSelect: () => close()
    },
    {
      label: "Currencies",
      icon: "lucide:coins",
      to: "/admin/currencies",
      onSelect: () => close()
    },
    {
      label: "Manage Investment Plans",
      icon: "lucide:chart-no-axes-combined",
      to: "/admin/investment-plans",
      onSelect: () => close()
    },
    {
      label: "Site Settings",
      icon: "lucide:settings",
      to: "/admin/settings",
      onSelect: () => close()
    }
  ],
  [
    {
      label: "Security",
      type: "label"
    },
    {
      label: "Forgot Password",
      icon: "i-lucide-lock-open",
      to: "/forgot-password",
      onSelect: () => close()
    },
    {
      label: "Change Password",
      icon: "i-lucide-lock",
      to: "/user/change-password",
      onSelect: () => close()
    },
    {
      label: "Change Email",
      icon: "i-lucide-mail-warning",
      to: "/user/change-email"
    }
  ],
  [
    {
      label: "User",
      type: "label"
    },
    {
      label: "Profile",
      icon: "i-lucide-circle-user-round",
      to: "/user/profile",
      onSelect: () => close()
    },
    {
      label: "Notifications",
      icon: "i-lucide-bell",
      to: "/user/notifications",
      onSelect: () => close()
    }
    /*   {
      label: "Settings",
      icon: "i-lucide-settings",
    }, */
  ],
  [
    {
      label: "Sign out",
      icon: "i-lucide-log-out",
      onSelect: () => signOut()
    }
  ]
];

export const secondaryLinks = ({
  name,
  image,
  signOut
}: {
  name: string;
  image: string | undefined;
  signOut: () => void;
}): DropdownMenuItem[][] => {
  return [
    [
      {
        label: name,
        avatar: {
          src: image,
          size: "xl",
          alt: name
        },
        type: "label"
      }
    ],
    [
      {
        label: "Accounts",
        icon: "i-lucide-book-user",
        to: "/user/accounts"
      },
      {
        label: "Profile",
        icon: "i-lucide-circle-user-round",
        to: "/user/profile"
      }
    ],
    [
      /*  {
        label: "Investment Advisor",
        icon: "i-lucide-hand-coins",
      }, */
      {
        label: "Sign out",
        icon: "i-lucide-log-out",
        onSelect: () => signOut()
      }
    ]
  ];
};
