"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const pathname = usePathname();
  const role = pathname.split("/")[1];

  function isActive(path: string) {
    return pathname === path;
  }

  return (
    <header className="px-4 sticky top-0 z-10 w-full flex justify-center bg-white">
      <div className="py-4 w-full max-w-7xl flex justify-between items-center border-b header-border-gradient">
        <Link className="flex flex-col" href={`/${role}`}>
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-secondary-yellow to-primary-green">
            ENADExp
          </span>
          <span className="text-xs text-zinc-400 font-medium">
            PAINEL DO {role.toUpperCase()}
          </span>
        </Link>
        <nav className="hidden lg:flex gap-4">
          <Link
            className={`font-medium border-b-2 hover:text-primary-green" ${
              isActive(`/${role}`)
                ? "text-primary-green border-primary-green"
                : "text-zinc-400 border-white"
            }`}
            href={`/${role}`}
          >
            INICIO
          </Link>
          <Link
            className={`font-medium border-b-2 hover:text-primary-green ${
              isActive(`/${role}/questoes`)
                ? "text-primary-green border-primary-green"
                : "text-zinc-400 border-white"
            }`}
            href={`/${role}/questoes`}
          >
            QUESTOES
          </Link>
          <Link
            className={`font-medium border-b-2 hover:text-primary-green ${
              isActive(`/${role}/listas`)
                ? "text-primary-green border-primary-green"
                : "text-zinc-400 border-white"
            }`}
            href={`/${role}/listas`}
          >
            LISTAS
          </Link>
          <Link
            className={`font-medium border-b-2 hover:text-primary-green ${
              isActive(`/${role}/simulados`)
                ? "text-primary-green border-primary-green"
                : "text-zinc-400 border-white"
            }`}
            href={`/${role}/simulados`}
          >
            SIMULADOS
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger className="ml-auto lg:hidden cursor-pointer">
            <Menu className="text-primary-green" size={32} />
          </SheetTrigger>
          <SheetContent className="px-8 py-16 w-60 bg-primary-green border-green-800">
            <SheetTitle className="flex flex-col gap-8">
              <Link
                className={`w-fit font-medium border-b-2 hover:text-secondary-yellow ${
                  isActive(`/${role}`)
                    ? "text-secondary-yellow border-secondary-yellow"
                    : "text-white border-primary-green"
                }`}
                href={`/${role}`}
              >
                INICIO
              </Link>
              <Link
                className={`w-fit font-medium border-b-2 hover:text-secondary-yellow ${
                  isActive(`/${role}/questoes`)
                    ? "text-secondary-yellow border-secondary-yellow"
                    : "text-white border-primary-green"
                }`}
                href={`/${role}/questoes`}
              >
                QUESTOES
              </Link>
              <Link
                className={`w-fit font-medium border-b-2 hover:text-secondary-yellow ${
                  isActive(`/${role}/listas`)
                    ? "text-secondary-yellow border-secondary-yellow"
                    : "text-white border-primary-green"
                }`}
                href={`/${role}/listas`}
              >
                LISTAS
              </Link>
              <Link
                className={`w-fit font-medium border-b-2 hover:text-secondary-yellow ${
                  isActive(`/${role}/simulados`)
                    ? "text-secondary-yellow border-secondary-yellow"
                    : "text-white border-primary-green"
                }`}
                href={`/${role}/simulados`}
              >
                SIMULADOS
              </Link>
            </SheetTitle>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
