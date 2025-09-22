import type { DropdownMenuItem, NavigationMenuItem } from "@nuxt/ui";

export const links = ({
  signOut
}: {
  signOut: () => void;
}): NavigationMenuItem[][] => [
  [
    {
      label: "Home",
      type: "label"
    },
    {
      label: "Dashboard",
      icon: "i-lucide-house",
      to: "/admin"
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
      to: "/user/accounts"
    },
    {
      label: "Investment Plans",
      icon: "i-lucide-circle-dollar-sign",
      to: "/user/investment-plans"
    }
  ],
  [
    {
      label: "Settings",
      type: "label"
    },
    {
      label: "Users",
      icon: "lucide:users"
    },
    {
      label: "Transactions",
      icon: "lucide:arrow-left-right",
      to: "/admin/transactions"
    },
    {
      label: "Manage Accounts",
      icon: "lucide:square-user"
    },
    {
      label: "KYC Requests",
      icon: "lucide:user-check",
      to: "/admin/kyc-data"
    },
    {
      label: "Business Profiles",
      icon: "lucide:building-2",
      to: "/admin/business-profiles"
    },
    {
      label: "Currencies",
      icon: "lucide:coins",
      to: "/admin/currencies"
    },
    {
      label: "Manage Investment Plans",
      icon: "lucide:chart-no-axes-combined",
      to: "/admin/investment-plans"
    },
    {
      label: "Site Settings",
      icon: "lucide:settings",
      to: "/admin/settings"
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
      to: "/forgot-password"
    },
    {
      label: "Change Password",
      icon: "i-lucide-lock",
      to: "/user/change-password"
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
      to: "/user/profile"
    },
    {
      label: "Notifications",
      icon: "i-lucide-bell",
      to: "/user/notifications"
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
