import type { NavigationMenuItem } from "@nuxt/ui";
import { ref } from "vue";

const mainLinks = ref<NavigationMenuItem[]>([
  {
    label: "About",
    icon: "i-lucide-info",
    children: [
      {
        label: "Our Story",
        to: "/about/story",
        icon: "i-lucide-book-open",
        description: "Learn more about our journey and how we started.",
      },
      {
        label: "Our Mission",
        to: "/about/mission",
        icon: "i-lucide-target",
        description: "Discover our mission and core values.",
      },
      {
        label: "Careers",
        to: "/about/careers",
        icon: "i-lucide-briefcase",
        description: "Join our team and grow with us.",
      },
      {
        label: "Partnerships",
        to: "/about/partnerships",
        icon: "i-lucide-handshake",
        description: "Explore partnership opportunities with us.",
      },
    ],
  },
  {
    label: "Investments",
    icon: "i-lucide-line-chart",
    children: [
      {
        label: "Stocks (Equities)",
        to: "/investments/stocks",
        icon: "i-lucide-trending-up",
        description: "Invest in company shares and equities.",
      },
      {
        label: "Cryptocurrencies",
        to: "/investments/cryptocurrencies",
        icon: "i-lucide-bitcoin",
        description: "Trade and hold digital currencies.",
      },
      {
        label: "Forex (Foreign Exchange)",
        to: "/investments/forex",
        icon: "i-lucide-dollar-sign",
        description: "Trade global currency pairs.",
      },
      {
        label: "Commodities",
        to: "/investments/commodities",
        icon: "i-lucide-diamond",
        description: "Invest in gold, oil, and other commodities.",
      },
      {
        label: "Bonds (Fixed Income)",
        to: "/investments/bonds",
        icon: "i-lucide-file-text",
        description: "Earn interest through fixed income securities.",
      },
      {
        label: "REITs (Real Estate Investment Trusts)",
        to: "/investments/reits",
        icon: "i-lucide-home",
        description: "Invest in real estate via REITs.",
      },
      {
        label: "Derivatives",
        to: "/investments/derivatives",
        icon: "i-lucide-activity",
        description: "Trade options, futures, and other derivatives.",
      },
    ],
  },
  {
    label: "Resources",
    icon: "i-lucide-book",
    children: [
      {
        label: "Market Insights",
        to: "/resources/market-insights",
        icon: "i-lucide-bar-chart",
        description: "Stay updated with our market insights.",
      },
      {
        label: "Investor Education",
        to: "/resources/investor-education",
        icon: "i-lucide-graduation-cap",
        description: "Learn the fundamentals of investing.",
      },
      {
        label: "Platform Walkthroughs",
        to: "/resources/walkthroughs",
        icon: "i-lucide-monitor",
        description: "Guided walkthroughs for our platform.",
      },
      {
        label: "Risk Disclosure",
        to: "/resources/risk-disclosure",
        icon: "i-lucide-alert-triangle",
        description: "Understand the risks before investing.",
      },
      {
        label: "Investment Strategies",
        to: "/resources/strategies",
        icon: "i-lucide-layers",
        description: "Explore proven investment strategies.",
      },
    ],
  },
  {
    label: "Impact",
    icon: "i-lucide-heart",
    children: [
      {
        label: "Reviews",
        to: "/impact/reviews",
        icon: "i-lucide-star",
        description: "Read what our customers have to say.",
      },
      {
        label: "Sustainability",
        to: "/impact/sustainability",
        icon: "i-lucide-leaf",
        description: "See how we promote sustainable investing.",
      },
      {
        label: "Track Record",
        to: "/impact/track-record",
        icon: "i-lucide-clock",
        description: "View our historical performance.",
      },
      {
        label: "Social Responsibility",
        to: "/impact/social-responsibility",
        icon: "i-lucide-users",
        description: "Learn about our social initiatives.",
      },
    ],
  },
  {
    label: "Legal",
    icon: "i-lucide-scale",
    children: [
      {
        label: "Terms of Use",
        to: "/legal/terms-of-use",
        icon: "i-lucide-file-text",
        description: "Review our terms of service.",
      },
      {
        label: "Privacy Policy",
        to: "/legal/privacy-policy",
        icon: "i-lucide-lock",
        description: "Understand how we protect your data.",
      },
    ],
  },
]);

export default mainLinks;
