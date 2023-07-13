import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import "@/styles/globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          pauseOnHover={false}
        />
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="relative z-10 flex justify-center items-center flex-col max-w-7xl mx-auto sm:px-16 px-6">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
