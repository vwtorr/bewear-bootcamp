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

const formSchema = z.object({
  name: z.string("Nome inválido").trim().min(1, "Nome é obrigatório!"),
  email: z.string().email("E-mail inválido!"),
  password: z.string("Senha inválida!").min(8, "Senha inválida!"),
  passwordConfirmation: z.string("Senha inválida!").min(8, "Senha inválida!"),
}).refine((data) => {
  return data.password === data.passwordConfirmation;
}, {
error: "As senhas não coincidem!",
path: ["passwordConfirmation"],
}); 

type FormValues = z.infer<typeof formSchema>;

const SignUpForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.log("FORMULÁRIO VÁLIDO E ENVIADO!");
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar Conta</CardTitle>
        <CardDescription>Crie sua conta para continuar.</CardDescription>
      </CardHeader>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Form {...form}>
          <CardContent className="grid gap-6">

          <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a sua senha novamente"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="p-5">
            <Button type="submit">Criar conta</Button>
          </CardFooter>
        </Form>
      </form>
    </Card>
  );
};

export default SignUpForm;
