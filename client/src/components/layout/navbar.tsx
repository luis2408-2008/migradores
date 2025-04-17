import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Compass, Menu, User, LogOut } from "lucide-react";

const Navbar = () => {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const getUserInitials = () => {
    if (!user || !user.fullName) return "U";
    return user.fullName
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  };

  const routes = [
    { href: "/#inicio", label: "Inicio" },
    { href: "/#paises", label: "Países" },
    { href: "/#recursos", label: "Recursos" },
    { href: "/#comunidad", label: "Comunidad" },
    { href: "/#ayuda", label: "Ayuda" },
  ];

  const bgClass = isScrolled
    ? "bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm shadow-md"
    : "bg-white dark:bg-neutral-800";

  return (
    <nav className={`fixed w-full z-10 transition-all duration-300 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <span className="text-primary-600 dark:text-primary-400">
                  <Compass className="h-6 w-6 mr-2" />
                </span>
                <span className="font-display font-bold text-xl">MigraGuía</span>
              </a>
            </Link>

            <div className="hidden md:flex ml-10 space-x-4">
              {routes.map((route) => (
                <a
                  key={route.href}
                  href={route.href}
                  className="text-neutral-700 hover:text-primary-600 dark:text-neutral-200 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {route.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ModeToggle />

            <div className="hidden md:flex items-center">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary-500 text-white">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.fullName}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/perfil">
                        <a className="w-full cursor-pointer flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          <span>Mi perfil</span>
                        </a>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Cerrar sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link href="/auth">
                    <a className="text-neutral-700 hover:text-primary-600 dark:text-neutral-200 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                      Iniciar Sesión
                    </a>
                  </Link>
                  <Link href="/auth">
                    <a className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ml-2">
                      Registrarse
                    </a>
                  </Link>
                </>
              )}
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>MigraGuía</SheetTitle>
                  <SheetDescription>
                    Información y apoyo para migrantes
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4 flex flex-col gap-4">
                  {routes.map((route) => (
                    <SheetClose asChild key={route.href}>
                      <a
                        href={route.href}
                        className="text-neutral-700 hover:text-primary-600 dark:text-neutral-200 dark:hover:text-primary-400 py-2 rounded-md font-medium transition-colors duration-200"
                      >
                        {route.label}
                      </a>
                    </SheetClose>
                  ))}
                  <div className="border-t pt-4 mt-4">
                    {user ? (
                      <>
                        <div className="flex items-center gap-2 mb-4">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary-500 text-white">
                              {getUserInitials()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.fullName}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <SheetClose asChild>
                          <Link href="/perfil">
                            <Button variant="outline" className="w-full mb-2">
                              Mi perfil
                            </Button>
                          </Link>
                        </SheetClose>
                        <Button 
                          variant="destructive" 
                          className="w-full"
                          onClick={handleLogout}
                        >
                          Cerrar sesión
                        </Button>
                      </>
                    ) : (
                      <>
                        <SheetClose asChild>
                          <Link href="/auth">
                            <Button variant="outline" className="w-full mb-2">
                              Iniciar Sesión
                            </Button>
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link href="/auth">
                            <Button className="w-full">
                              Registrarse
                            </Button>
                          </Link>
                        </SheetClose>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
