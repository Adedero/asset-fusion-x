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
      to: "/user",
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
    /* {
      label: "Investment Advisor",
      icon: "i-lucide-hand-coins",
    }, */
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
      to: "/user/change-email",
      onSelect: () => close()
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
