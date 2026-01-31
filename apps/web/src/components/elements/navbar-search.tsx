import Image from "next/image";

import search from "../../public/search.svg";

export function NavbarSearch() {
  return (
    <div className="w-6 h-6.5">
      <Image src={search} alt="Search"></Image>
    </div>
  );
}
