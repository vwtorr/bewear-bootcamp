import AuthTabs from "./components/auth-tabs";
import { Header } from "@/components/ui/common/header";
import Footer from "@/components/ui/common/footer";

const AuthPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <AuthTabs />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuthPage;
