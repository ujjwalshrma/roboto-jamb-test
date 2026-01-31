"use client";

// import { env } from "@workspace/env/client";
// import { ChevronDown } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import useSWR from "swr";

import { NavbarButton } from "./elements/navbar-button";
// import type { ColumnLink, NavColumn, NavigationData } from "@/types";
// import { MenuLink } from "./elements/menu-link";
// import { NavbarButton } from "./elements/navbar-button";
// import { SanityButtons } from "./elements/sanity-buttons";
// import { Logo } from "./logo";
// import { MobileMenu } from "./mobile-menu";
// import { ModeToggle } from "./mode-toggle";
import { NavbarLogo } from "./elements/navbar-logo";
import { NavbarMail } from "./elements/navbar-mail";
import { NavbarSearch } from "./elements/navbar-search";

// Fetcher function
// const fetcher = async (url: string): Promise<NavigationData> => {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error("Failed to fetch navigation data");
//   }
//   return response.json();
// };

// function DesktopColumnDropdown({
//   column,
// }: {
//   column: Extract<NavColumn, { type: "column" }>;
// }) {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleMouseEnter = () => {
//     setIsOpen(true);
//   };

//   const handleMouseLeave = () => {
//     setIsOpen(false);
//   };

//   return (
//     <div className="group relative">
//       <button
//         aria-expanded={isOpen}
//         aria-haspopup="menu"
//         className="flex items-center gap-1 px-3 py-2 font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         type="button"
//       >
//         {column.title}
//         <ChevronDown className="size-3 transition-transform group-hover:rotate-180" />
//       </button>
//       {isOpen ? (
//         <div
//           className="fade-in-0 zoom-in-95 absolute top-full left-0 z-50 min-w-[280px] animate-in rounded-lg border bg-popover p-2 shadow-lg"
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//           role="menu"
//         >
//           <div className="grid gap-1">
//             {column.links?.map((link: ColumnLink) => (
//               <MenuLink
//                 description={link.description || ""}
//                 href={link.href || ""}
//                 icon={link.icon}
//                 key={link._key}
//                 name={link.name || ""}
//               />
//             ))}
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// }

// function DesktopColumnLink({
//   column,
// }: {
//   column: Extract<NavColumn, { type: "link" }>;
// }) {
//   if (!column.href) return null;

//   return (
//     <Link
//       className="px-3 py-2 font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
//       href={column.href}
//     >
//       {column.name}
//     </Link>
//   );
// }

// function NavbarSkeleton() {
//   return (
//     <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
//       <div className="container mx-auto px-4">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo skeleton - matches Logo component dimensions: width={120} height={40} */}
//           {/* <div className="flex items-center">
//             <div className="h-10 w-[120px] rounded bg-muted/50 animate-pulse" />
//           </div> */}
//           <div className="flex h-10 w-40 items-center">
//             <div className="h-10 w-40 animate-pulse rounded bg-muted/50" />
//           </div>

//           {/* Desktop nav skeleton - matches nav gap-1 and px-3 py-2 buttons */}
//           {/* <nav className="hidden md:flex items-center gap-1">
//             {Array.from({ length: 2 }).map((_, i) => (
//               <div
//                 key={`nav-${i}`}
//                 className="h-9 px-3 py-2 rounded bg-muted/50 animate-pulse min-w-[60px]"
//               />
//             ))}
//           </nav> */}

//           {/* Desktop actions skeleton - matches gap-4, ModeToggle (icon button) + SanityButtons */}
//           {/* <div className="hidden md:flex items-center gap-4">
//             <div className="h-9 w-9 rounded bg-muted/50 animate-pulse" />
//             <div className="h-9 px-4 rounded-lg bg-muted/50 animate-pulse min-w-[80px]" />
//           </div> */}

//           {/* Mobile menu button skeleton - matches Button size="icon" */}
//           <div className="h-10 w-10 animate-pulse rounded bg-muted/50 md:hidden" />
//         </div>
//       </div>
//     </header>
//   );
// }

export function Navbar() {
  // const { data, error, isLoading } = useSWR<NavigationData>(
  //   "/api/navigation",
  //   fetcher,
  //   {
  //     fallbackData: {
  //       navbarData: initialNavbarData,
  //       settingsData: initialSettingsData,
  //     },
  //     revalidateOnFocus: false,
  //     revalidateOnMount: false,
  //     revalidateOnReconnect: true,
  //     refreshInterval: 30_000,
  //     errorRetryCount: 3,
  //     errorRetryInterval: 5000,
  //   }
  // );

  // const navigationData = data || {
  //   navbarData: initialNavbarData,
  //   settingsData: initialSettingsData,
  // };
  // const { navbarData, settingsData } = navigationData;
  // const { columns, buttons } = navbarData || {};
  // const { logo, siteTitle } = settingsData || {};

  // Show skeleton only on initial mount when no fallback data is available
  // if (isLoading && !data && !(initialNavbarData && initialSettingsData)) {
  //   return <NavbarSkeleton />;
  // }

  return (
    <nav className="nav pt-8 pb-8.25 bg-background w-full">
      <div className="wrapper flex items-center justify-between">
        <NavbarLogo />
        <div className="flex items-center">
          <div className="mr-[29.05px]">
            <NavbarSearch />
          </div>
          <div className="mr-[27.86px]">
            <NavbarMail />
          </div>
          <NavbarButton />
        </div>
      </div>
    </nav>
  );
}
