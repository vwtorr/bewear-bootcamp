"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./sign-in-form";
import SignUpForm from "./sign-up-form";

const AuthTabs = () => {
  return (
    <div>
      <Tabs defaultValue="signIn">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signIn">Entrar</TabsTrigger>
          <TabsTrigger value="signUp">Criar conta</TabsTrigger>
        </TabsList>
        <TabsContent value="signIn">
          <SignInForm />
        </TabsContent>
        <TabsContent value="signUp">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthTabs;