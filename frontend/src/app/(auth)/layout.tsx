import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)), url("/hero.png")',
      }}
    >
      <div className="">{children}</div>
    </div>
  );
};

export default AuthLayout;
