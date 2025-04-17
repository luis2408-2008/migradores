import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import { insertUserSchema, User } from "@shared/schema";
import { getQueryFn, apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

type AuthContextType = {
  user: Omit<User, "password"> | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: ReturnType<typeof useLoginMutation>;
  logoutMutation: ReturnType<typeof useLogoutMutation>;
  registerMutation: ReturnType<typeof useRegisterMutation>;
};

// Schemas de validación
const loginSchema = z.object({
  email: z.string().email("Ingresa un correo electrónico válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const registerSchema = insertUserSchema.extend({
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  passwordConfirm: z.string(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Las contraseñas no coinciden",
  path: ["passwordConfirm"],
});

type LoginData = z.infer<typeof loginSchema>;
type RegisterData = z.infer<typeof registerSchema>;

const useLoginMutation = () => {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      return await res.json();
    },
    onSuccess: (user: Omit<User, "password">) => {
      queryClient.setQueryData(["/api/user"], user);
      toast({
        title: "Inicio de sesión exitoso",
        description: `¡Bienvenido de nuevo, ${user.fullName}!`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al iniciar sesión",
        description: error.message || "Credenciales incorrectas",
        variant: "destructive",
      });
    },
  });
};

const useRegisterMutation = () => {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (userData: RegisterData) => {
      // Eliminar passwordConfirm antes de enviar al servidor
      const { passwordConfirm, ...registerData } = userData;
      const res = await apiRequest("POST", "/api/register", registerData);
      return await res.json();
    },
    onSuccess: (user: Omit<User, "password">) => {
      queryClient.setQueryData(["/api/user"], user);
      toast({
        title: "Registro exitoso",
        description: `¡Bienvenido a MigraGuía, ${user.fullName}!`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al registrarse",
        description: error.message || "No se pudo completar el registro",
        variant: "destructive",
      });
    },
  });
};

const useLogoutMutation = () => {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al cerrar sesión",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<Omit<User, "password"> | null, Error>({
    queryKey: ["/api/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();
  const logoutMutation = useLogoutMutation();

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}

export { loginSchema, registerSchema };
export type { LoginData, RegisterData };
