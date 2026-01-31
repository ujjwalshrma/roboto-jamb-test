import Image from "next/image";

import mail from "../../public/mail.svg";

export function NavbarMail() {
  return (
    <div className="w-8 h-5.75">
      <Image src={mail} alt="Contact by Email"></Image>
    </div>
  );
}
