import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Post } from "@shared/schema";
import { CommentForm } from "@/components/forms/comment-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, ThumbsUp, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const postSchema = z.object({
  content: z.string().min(5, { message: "El mensaje debe tener al menos 5 caracteres" }),
  fromCountry: z.string().optional(),
  toCountry: z.string().optional(),
});

type PostFormData = z.infer<typeof postSchema>;

type CommunitySectionProps = {
  posts: Post[];
};

const CommunitySection = ({ posts = [] }: CommunitySectionProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");

  const createPostMutation = useMutation({
    mutationFn: async (data: PostFormData) => {
      const res = await apiRequest("POST", "/api/posts", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      setMessage("");
      setFromCountry("");
      setToCountry("");
      toast({
        title: "Publicación realizada",
        description: "Tu mensaje ha sido publicado exitosamente.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al publicar",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Inicio de sesión requerido",
        description: "Por favor inicia sesión para compartir tu experiencia.",
        variant: "destructive",
      });
      return;
    }

    try {
      const validatedData = postSchema.parse({
        content: message,
        fromCountry: fromCountry || undefined,
        toCountry: toCountry || undefined,
      });
      
      await createPostMutation.mutateAsync(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Error de validación",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    }
  };

  // Si no hay publicaciones, mostrar ejemplos para la UI
  const hasPosts = posts.length > 0;
  
  const samplePosts = [
    {
      id: 1,
      content: "Después de 6 meses en España, finalmente conseguí homologar mi título de enfermería. El proceso fue largo pero valió la pena. Recomiendo iniciar los trámites antes de salir del país de origen y apostillar todos los documentos. Si alguien necesita orientación sobre este proceso, ¡estoy aquí para ayudar!",
      userId: 1,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 días atrás
      fromCountry: "Colombia",
      toCountry: "España",
      user: {
        id: 1,
        fullName: "María González",
        username: "mariag",
      },
    },
    {
      id: 2,
      content: "¿Alguien puede darme información sobre el proceso para obtener la visa de responsabilidad democrática en Chile? He escuchado que han cambiado los requisitos recientemente y estoy un poco confundido con la documentación necesaria.",
      userId: 2,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 días atrás
      fromCountry: "Venezuela",
      toCountry: "Chile",
      user: {
        id: 2,
        fullName: "Juan Rodríguez",
        username: "juanr",
      },
    },
  ];

  const postsToDisplay = hasPosts ? posts : samplePosts;

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `Hace ${diffInSeconds} segundos`;
    if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} minutos`;
    if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} horas`;
    if (diffInSeconds < 604800) return `Hace ${Math.floor(diffInSeconds / 86400)} días`;
    if (diffInSeconds < 2592000) return `Hace ${Math.floor(diffInSeconds / 604800)} semanas`;
    
    return date.toLocaleDateString('es-ES');
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  };

  return (
    <section
      id="comunidad"
      className="py-16 px-4 bg-white dark:bg-neutral-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-neutral-900 dark:text-white">
            Nuestra Comunidad
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-600 dark:text-neutral-300">
            Conecta con otros migrantes, comparte experiencias y encuentra apoyo en nuestra comunidad.
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-neutral-800 rounded-xl p-6 md:p-8 mb-10 transition-colors duration-300">
          <div className="mb-6">
            <h3 className="font-display font-semibold text-xl mb-4 text-neutral-900 dark:text-white">
              Historias y Experiencias
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Compartir tus experiencias puede ayudar a otros. ¿Tienes un consejo o una historia que contar?
            </p>
          </div>

          {/* Formulario para compartir historia */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="mb-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Comparte tu experiencia, pregunta o consejo para otros migrantes..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                rows={4}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <select
                  value={fromCountry}
                  onChange={(e) => setFromCountry(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                >
                  <option value="">País de origen (opcional)</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Chile">Chile</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="Cuba">Cuba</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="El Salvador">El Salvador</option>
                  <option value="España">España</option>
                  <option value="Guatemala">Guatemala</option>
                  <option value="Honduras">Honduras</option>
                  <option value="México">México</option>
                  <option value="Nicaragua">Nicaragua</option>
                  <option value="Panamá">Panamá</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Perú">Perú</option>
                  <option value="Puerto Rico">Puerto Rico</option>
                  <option value="República Dominicana">República Dominicana</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Venezuela">Venezuela</option>
                </select>
              </div>
              <div>
                <select
                  value={toCountry}
                  onChange={(e) => setToCountry(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                >
                  <option value="">País de destino (opcional)</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Chile">Chile</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="Cuba">Cuba</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="El Salvador">El Salvador</option>
                  <option value="España">España</option>
                  <option value="Guatemala">Guatemala</option>
                  <option value="Honduras">Honduras</option>
                  <option value="México">México</option>
                  <option value="Nicaragua">Nicaragua</option>
                  <option value="Panamá">Panamá</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Perú">Perú</option>
                  <option value="Puerto Rico">Puerto Rico</option>
                  <option value="República Dominicana">República Dominicana</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Venezuela">Venezuela</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={createPostMutation.isPending || !message.trim()}
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
              >
                {createPostMutation.isPending ? "Compartiendo..." : "Compartir"}
              </Button>
            </div>
          </form>

          {/* Historias publicadas */}
          <div>
            <h4 className="font-medium text-lg mb-4 text-neutral-900 dark:text-white">
              Historias recientes
            </h4>

            {postsToDisplay.map((post, index) => (
              <motion.div
                key={post.id}
                className="mb-6 pb-6 border-b border-gray-200 dark:border-neutral-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-start mb-3">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarFallback className="bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-300">
                      {getUserInitials((post as any).user?.fullName || "Usuario")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <h5 className="font-medium text-neutral-900 dark:text-white">
                      {(post as any).user?.fullName || "Usuario"}
                    </h5>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 flex flex-wrap items-center gap-1">
                      <Calendar className="inline h-3 w-3" />
                      {formatTimeAgo(new Date(post.createdAt))}
                      {post.fromCountry && post.toCountry && (
                        <>
                          <span>·</span>
                          <span className="flex items-center">
                            <MapPin className="inline h-3 w-3 mr-1" />
                            {post.fromCountry} → {post.toCountry}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <div className="pl-13 ml-13">
                  <p className="text-neutral-700 dark:text-neutral-300 mb-3">
                    {post.content}
                  </p>
                  <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                    <button className="inline-flex items-center hover:text-primary-600 dark:hover:text-primary-400 mr-4">
                      <ThumbsUp className="mr-1 h-4 w-4" /> 24 me gusta
                    </button>
                    <button className="inline-flex items-center hover:text-primary-600 dark:hover:text-primary-400">
                      <MessageCircle className="mr-1 h-4 w-4" /> 8 comentarios
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="text-center mt-8">
              <a
                href="/comunidad"
                className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium inline-flex items-center"
              >
                Ver más historias
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Próximos eventos */}
        <div className="mt-12">
          <h3 className="font-display font-semibold text-xl mb-6 text-neutral-900 dark:text-white text-center">
            Próximos Eventos
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="bg-gray-50 dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <div className="mb-4 sm:mb-0 sm:mr-6 bg-primary-50 dark:bg-primary-900 p-3 rounded-lg text-center sm:w-24">
                    <span className="block text-sm font-medium text-primary-800 dark:text-primary-200">MAY</span>
                    <span className="block text-3xl font-bold text-primary-600 dark:text-primary-300">15</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1 text-neutral-900 dark:text-white">
                      Taller de Regularización Migratoria
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-300 mb-2">
                      Aprende sobre los procesos de regularización y opciones de permanencia legal en España.
                    </p>
                    <div className="flex flex-wrap items-center text-sm text-neutral-500 dark:text-neutral-400">
                      <span className="inline-flex items-center mr-4 mb-2">
                        <MapPin className="mr-1 h-4 w-4 text-primary-500 dark:text-primary-400" />
                        Madrid, España (Presencial y Online)
                      </span>
                      <span className="inline-flex items-center mb-2">
                        <Clock className="mr-1 h-4 w-4 text-primary-500 dark:text-primary-400" />
                        17:00 - 19:00 CEST
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-3 bg-gray-100 dark:bg-neutral-700 flex justify-between items-center transition-colors duration-300">
                <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                  <i className="fas fa-users mr-1"></i>
                  120 asistentes
                </span>
                <Button>
                  Inscribirse
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-50 dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <div className="mb-4 sm:mb-0 sm:mr-6 bg-secondary-50 dark:bg-secondary-900 p-3 rounded-lg text-center sm:w-24">
                    <span className="block text-sm font-medium text-secondary-800 dark:text-secondary-200">JUN</span>
                    <span className="block text-3xl font-bold text-secondary-600 dark:text-secondary-300">03</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1 text-neutral-900 dark:text-white">
                      Feria de Empleo para Migrantes
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-300 mb-2">
                      Conecta con empresas que ofrecen oportunidades laborales para personas migrantes.
                    </p>
                    <div className="flex flex-wrap items-center text-sm text-neutral-500 dark:text-neutral-400">
                      <span className="inline-flex items-center mr-4 mb-2">
                        <MapPin className="mr-1 h-4 w-4 text-secondary-500 dark:text-secondary-400" />
                        Santiago, Chile (Centro Cultural)
                      </span>
                      <span className="inline-flex items-center mb-2">
                        <Clock className="mr-1 h-4 w-4 text-secondary-500 dark:text-secondary-400" />
                        10:00 - 16:00 CLT
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-3 bg-gray-100 dark:bg-neutral-700 flex justify-between items-center transition-colors duration-300">
                <span className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                  <i className="fas fa-users mr-1"></i>
                  85 asistentes
                </span>
                <Button variant="secondary">
                  Inscribirse
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
