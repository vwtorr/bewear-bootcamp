
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/ui/common/header";

const CheckoutCancelPage = () => {
  return (
    <div>
      <Header />
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="text-center">
          <Image
            src="/illustration.svg"
            alt="Error"
            width={300}
            height={300}
            className="mx-auto"
          />
          <DialogTitle className="mt-4 text-2xl">Transação cancelada!</DialogTitle>
          <DialogDescription className="font-medium">
            Houve um erro ao processar seu pedido. Por favor, tente novamente.
          </DialogDescription>

          <DialogFooter>
            <Button className="rounded-full" size="lg" asChild>
              <Link href="/cart">
                Voltar para o carrinho
              </Link>
            </Button>
            <Button
              className="rounded-full"
              variant="outline"
              size="lg"
              asChild
            >
              <Link href="/">
                Voltar para a loja
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutCancelPage; 