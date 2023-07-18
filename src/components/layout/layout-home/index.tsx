import { FC, ReactNode } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface Props {
  children: ReactNode;
}

const LayoutHome: FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <>{children}</>
      <Footer />
    </div>
  );
};
export default LayoutHome;
