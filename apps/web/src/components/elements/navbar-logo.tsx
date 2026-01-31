import Image from "next/image";
import Link from "next/link";

import logo from "../../public/logo.svg";

export function NavbarLogo() {
  return (
    <Link className="w-27 h-11.25" href="/">
      <Image alt="Jamb Logo" src={logo} width={108} height={45}></Image>
    </Link>
  );
}
