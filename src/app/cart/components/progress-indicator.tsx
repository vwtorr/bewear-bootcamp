
"use client";

import { CheckCircledIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    name: "Sacola",
    href: "/cart",
  },
  {
    name: "Identificação",
    href: "/cart/identification",
  },
  {
    name: "Pagamento",
    href: "/cart/confirmation",
  },
];

const ProgressIndicator = () => {
  const pathname = usePathname();

  return (
    <Card className="rounded-none border-x-0 border-t-0 py-2 shadow-none md:rounded-lg md:border-x md:border-t md:shadow-sm">
      <CardContent className="px-5">
        <ol className="flex items-center justify-center gap-x-2 text-sm font-medium text-muted-foreground sm:gap-x-4">
          {STEPS.map((step, index) => (
            <li key={step.href} className="flex shrink-0 items-center gap-x-2">
              <div
                className={cn(
                  "flex items-center gap-x-2",
                  step.href === pathname && "text-primary",
                )}
              >
                {index < STEPS.indexOf(STEPS.find((s) => s.href === pathname)!) ? (
                  <CheckCircledIcon className="h-5 w-5 text-green-500" />
                ) : (
                  <div
                    className={cn(
                      "h-5 w-5 rounded-full border border-current text-center text-[10px]/5 font-semibold",
                      step.href === pathname
                        ? "border-primary text-primary"
                        : "border-muted-foreground text-muted-foreground",
                    )}
                  >
                    {index + 1}
                  </div>
                )}

                <span>{step.name}</span>
              </div>

              {index !== STEPS.length - 1 && (
                <div
                  className={cn(
                    "h-px w-8 bg-muted-foreground sm:w-10",
                    index < STEPS.indexOf(STEPS.find((s) => s.href === pathname)!) &&
                      "bg-primary",
                  )}
                />
              )}
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
};

export default ProgressIndicator; 