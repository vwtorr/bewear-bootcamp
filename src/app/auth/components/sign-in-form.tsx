"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { on } from "events";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("E-mail inválido!"),
  password: z.string("Senha inválida!").min(8, "Senha inválida!"),
});

type FormValues = z.infer<typeof formSchema>;

const SignInForm = () => {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    const { data, error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          if (ctx.error.code === "USER_NOT_FOUND") {
            toast.error("Usuário não encontrado!");
            return form.setError("email", {
              message: "Usuário não encontrado!",
            });
          } else if (ctx.error.code === "INVALID_PASSWORD") {
            toast.error("Senha inválida!");
            return form.setError("password", {
              message: "Senha inválida!",
            });
          } else if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
            toast.error("E-mail ou senha inválidos!");
            form.setError("email", {
              message: "E-mail ou senha inválidos!",
            });
            form.setError("password", {
              message: "E-mail ou senha inválidos!",
            });
          }
        },
      },
    });
  }

  const HandleSignInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (

    <Card>
      <CardHeader>
        <CardTitle>Entrar</CardTitle>
        <CardDescription>Faça login para continuar.</CardDescription>
      </CardHeader>

 
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Form {...form}>
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o seu email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a sua senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-2 p-5">
            <Button type="submit" className="w-full">
              Entrar
            </Button>
            <Button
              onClick={HandleSignInWithGoogle}
              type="button"
              className="border-1 flex w-full items-center justify-center gap-2 border-solid bg-white font-normal text-slate-500 hover:bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#4285F4"
                  d="M24 9.5c3.94 0 6.64 1.71 8.16 3.14l5.96-5.96C34.29 3.62 29.51 1.5 24 1.5 14.7 1.5 6.76 7.97 3.66 16.44l7.34 5.7C12.42 15.79 17.7 9.5 24 9.5z"
                />
                <path
                  fill="#34A853"
                  d="M46.15 24.55c0-1.61-.15-3.14-.43-4.55H24v9.06h12.55c-.54 2.89-2.18 5.34-4.65 7l7.34 5.7c4.29-3.95 6.91-9.77 6.91-17.21z"
                />
                <path
                  fill="#FBBC05"
                  d="M11 28.09c-.48-1.42-.75-2.94-.75-4.59s.27-3.17.75-4.59l-7.34-5.7C1.35 16.69 0 20.22 0 23.5s1.35 6.81 3.66 9.29L11 28.09z"
                />
                <path
                  fill="#EA4335"
                  d="M24 47c5.51 0 10.15-1.82 13.53-4.95l-7.34-5.7c-2.03 1.37-4.63 2.17-7.56 2.17-6.3 0-11.58-6.29-12.99-12.64l-7.34 5.7C6.76 40.03 14.7 47 24 47z"
                />
              </svg>
              Entrar com Google
            </Button>
          </CardFooter>
        </Form>
      </form>
    </Card>
  );
};

export default SignInForm;
