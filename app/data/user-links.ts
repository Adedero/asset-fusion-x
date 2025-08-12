import type { DropdownMenuItem, NavigationMenuItem } from "@nuxt/ui";

export const links = ({
  signOut,
}: {
  signOut: () => void;
}): NavigationMenuItem[][] => [
  [
    {
      label: "Home",
      type: "label",
    },
    {
      label: "Dashboard",
      icon: "i-lucide-house",
      to: "/user",
    },
  ],
  [
    {
      label: "Finances",
      type: "label",
    },
    {
      label: "Accounts",
      icon: "i-lucide-book-user",
      to: "/user/accounts",
    },
    {
      label: "Investment Plans",
      icon: "i-lucide-circle-dollar-sign",
      to: "/user/investment-plans",
    },
    /* {
      label: "Investment Advisor",
      icon: "i-lucide-hand-coins",
    }, */
  ],
  [
    {
      label: "Security",
      type: "label",
    },
    {
      label: "Forgot Password",
      icon: "i-lucide-lock-open",
      to: "/forgot-password",
    },
    {
      label: "Change Password",
      icon: "i-lucide-lock",
      to: "/user/change-password",
    },
    {
      label: "Change Email",
      icon: "i-lucide-mail-warning",
      to: "/user/change-email",
    },
  ],
  [
    {
      label: "User",
      type: "label",
    },
    {
      label: "Profile",
      icon: "i-lucide-circle-user-round",
      to: "/user/profile",
    },
    {
      label: "Notifications",
      icon: "i-lucide-bell",
      to: "/user/notifications",
    },
    /*   {
      label: "Settings",
      icon: "i-lucide-settings",
    }, */
  ],
  [
    {
      label: "Sign out",
      icon: "i-lucide-log-out",
      onSelect: () => signOut(),
    },
  ],
];

export const secondaryLinks = ({
  name,
  image,
  signOut,
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
          alt: name,
        },
        type: "label",
      },
    ],
    [
      {
        label: "Accounts",
        icon: "i-lucide-book-user",
        to: "/user/accounts",
      },
      {
        label: "Profile",
        icon: "i-lucide-circle-user-round",
        to: "/user/profile",
      },
    ],
    [
     /*  {
        label: "Investment Advisor",
        icon: "i-lucide-hand-coins",
      }, */
      {
        label: "Sign out",
        icon: "i-lucide-log-out",
        onSelect: () => signOut(),
      },
    ],
  ];
};
