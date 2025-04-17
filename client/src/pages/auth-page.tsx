import { useState, useEffect } from "react";
import { useLocation, useRouter } from "wouter";
import { useAuth, loginSchema, registerSchema } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Loader2 } from "lucide-react";

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const { user, loginMutation, registerMutation } = useAuth();
  const [location, navigate] = useLocation();
  
  // Si el usuario ya está autenticado, redirigir a la página de inicio
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Formulario de inicio de sesión
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Formulario de registro
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  // Manejar envío del formulario de inicio de sesión
  const onLoginSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  // Manejar envío del formulario de registro
  const onRegisterSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-16 px-4 bg-gray-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Card className="w-full max-w-md mx-auto">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-display font-bold text-center">
                  {activeTab === "login" ? "Iniciar sesión" : "Crear una cuenta"}
                </CardTitle>
                <CardDescription className="text-center">
                  {activeTab === "login" 
                    ? "Ingresa tus credenciales para acceder a tu cuenta"
                    : "Regístrate para acceder a todos los recursos y servicios"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")}>
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
                    <TabsTrigger value="register">Registrarse</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                        <FormField
                          control={loginForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Correo electrónico</FormLabel>
                              <FormControl>
                                <Input placeholder="tu@correo.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center justify-between">
                                <FormLabel>Contraseña</FormLabel>
                                <a href="#" className="text-sm text-primary hover:text-primary-700 dark:hover:text-primary-300">
                                  ¿Olvidaste tu contraseña?
                                </a>
                              </div>
                              <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex items-center space-x-2 mb-4">
                          <Checkbox id="remember" />
                          <label
                            htmlFor="remember"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Recordarme en este dispositivo
                          </label>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={loginMutation.isPending}
                        >
                          {loginMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Iniciando sesión...
                            </>
                          ) : (
                            "Iniciar sesión"
                          )}
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                  
                  <TabsContent value="register">
                    <Form {...registerForm}>
                      <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                        <FormField
                          control={registerForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre completo</FormLabel>
                              <FormControl>
                                <Input placeholder="Tu nombre y apellido" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre de usuario</FormLabel>
                              <FormControl>
                                <Input placeholder="usuario123" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Correo electrónico</FormLabel>
                              <FormControl>
                                <Input placeholder="tu@correo.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contraseña</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Mínimo 6 caracteres" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="passwordConfirm"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirmar contraseña</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Confirma tu contraseña" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex items-center space-x-2 mb-4">
                          <Checkbox id="terms" required />
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Acepto los{" "}
                            <a href="#" className="text-primary hover:text-primary-700 dark:hover:text-primary-300">
                              términos y condiciones
                            </a>{" "}
                            y la{" "}
                            <a href="#" className="text-primary hover:text-primary-700 dark:hover:text-primary-300">
                              política de privacidad
                            </a>
                          </label>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={registerMutation.isPending}
                        >
                          {registerMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Registrando...
                            </>
                          ) : (
                            "Registrarse"
                          )}
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="hidden md:block">
            <div className="bg-primary-500 rounded-lg p-8 text-white">
              <h2 className="text-3xl font-display font-bold mb-4">Bienvenido a MigraGuía</h2>
              <p className="text-lg mb-6">
                Tu portal de información y apoyo para migrantes que buscan un mejor futuro.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary-200 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Información legal actualizada sobre procedimientos migratorios</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary-200 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Guías sobre trabajo, educación, vivienda y salud</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary-200 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Comunidad para compartir experiencias y recibir apoyo</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary-200 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Eventos y recursos para ayudarte en tu proceso migratorio</span>
                </li>
              </ul>
              <div className="mt-8 text-center">
                <img
                  src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Personas de diferentes culturas"
                  className="rounded-lg mx-auto shadow-lg max-w-xs"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
