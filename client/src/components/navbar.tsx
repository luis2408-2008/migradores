import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { Compass, Menu, Moon, Sun, User } from "lucide-react";

const NavLinks = [
  { name: "Inicio", href: "/" },
  { name: "Países", href: "/paises" },
  { name: "Recursos", href: "/recursos" },
  { name: "Comunidad", href: "/comunidad" },
  { name: "Ayuda", href: "/ayuda" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, logoutMutation } = useAuth();
  const [location] = useLocation();

  // Detectar scroll para añadir sombra
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Manejar el cierre de sesión
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // Obtener las iniciales del usuario
  const getUserInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <nav className={`fixed w-full z-50 bg-white dark:bg-neutral-900 transition-all duration-300 ${
      isScrolled ? "shadow-md" : ""
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Compass className="h-6 w-6 text-primary mr-2" />
              <span className="font-display font-bold text-xl">MigraGuía</span>
            </Link>
            
            <div className="hidden md:flex ml-10 space-x-4">
              {NavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location === link.href
                      ? "text-primary dark:text-primary"
                      : "text-neutral-700 hover:text-primary dark:text-neutral-300 dark:hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-neutral-700 dark:text-neutral-300"
              aria-label="Cambiar tema"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            
            <div className="hidden md:flex">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative rounded-full h-8 w-8 bg-primary text-white"
                    >
                      <span className="sr-only">Abrir menú de usuario</span>
                      {getUserInitials(user.fullName)}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/perfil">Perfil</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Cerrar sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex space-x-2">
                  <Button variant="ghost" asChild>
                    <Link href="/auth">Iniciar Sesión</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/auth">Registrarse</Link>
                  </Button>
                </div>
              )}
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  aria-label="Abrir menú"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col h-full">
                  <div className="py-4 space-y-4">
                    {NavLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          location === link.href
                            ? "text-primary dark:text-primary"
                            : "text-neutral-700 hover:text-primary dark:text-neutral-300 dark:hover:text-primary"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                    
                    <div className="pt-4 border-t border-gray-200 dark:border-neutral-700">
                      {user ? (
                        <div className="space-y-2">
                          <div className="flex items-center px-3 py-2">
                            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white mr-3">
                              {getUserInitials(user.fullName)}
                            </div>
                            <div className="text-sm font-medium">{user.fullName}</div>
                          </div>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={handleLogout}
                          >
                            Cerrar sesión
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col space-y-2 px-3">
                          <Button variant="outline" asChild className="w-full">
                            <Link href="/auth">Iniciar sesión</Link>
                          </Button>
                          <Button asChild className="w-full">
                            <Link href="/auth">Registrarse</Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
