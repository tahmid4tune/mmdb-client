import { FC, ReactNode } from "react";
import GuestNavbar from "../navbars/guestNavbar";

interface ChildProps {
  children: ReactNode;
}

const GuestLayout: FC<ChildProps> = ({ children }) => {
  return (
    <>
      <GuestNavbar />
      <main>
        <div className="content">{children}</div>
      </main>
    </>
  );
};

export default GuestLayout;
