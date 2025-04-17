import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Post, InsertPost } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, ArrowRight, Clock, Heart, MessageSquare, MapPin } from "lucide-react";
import { Link } from "wouter";
import { z } from "zod";
import { motion } from "framer-motion";

export default function CommunitySection({ limit = 2 }: { limit?: number }) {
  const [postContent, setPostContent] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: posts, isLoading: isLoadingPosts } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  const createPostMutation = useMutation({
    mutationFn: async (post: InsertPost) => {
      const res = await apiRequest("POST", "/api/posts", post);
      return res.json();
    },
    onSuccess: () => {
      setPostContent("");
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({
        title: "Publicación creada",
        description: "Tu experiencia ha sido compartida con la comunidad.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al publicar",
        description: error.message || "No se pudo crear la publicación. Inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  const likePostMutation = useMutation({
    mutationFn: async (postId: number) => {
      const res = await apiRequest("POST", `/api/posts/${postId}/like`, {});
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "No se pudo dar me gusta a la publicación.",
        variant: "destructive",
      });
    },
  });

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Inicia sesión",
        description: "Debes iniciar sesión para compartir tu experiencia.",
        variant: "destructive",
      });
      return;
    }

    if (!postContent.trim()) {
      toast({
        title: "Contenido vacío",
        description: "Por favor escribe algo para compartir.",
        variant: "destructive",
      });
      return;
    }

    createPostMutation.mutate({
      content: postContent,
      userId: user.id,
      originCountry: "Venezuela",  // Esto se podría obtener del perfil del usuario
      destinationCountry: "España" // Esto se podría obtener del perfil del usuario
    });
  };

  const handleLikePost = (postId: number) => {
    if (!user) {
      toast({
        title: "Inicia sesión",
        description: "Debes iniciar sesión para dar me gusta.",
        variant: "destructive",
      });
      return;
    }
    
    likePostMutation.mutate(postId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return "Hoy";
    } else if (diffInDays === 1) {
      return "Ayer";
    } else {
      return `Hace ${diffInDays} días`;
    }
  };

  // Eventos simulados para la sección
  const events = [
    {
      id: 1,
      title: "Taller de Regularización Migratoria",
      description: "Aprende sobre los procesos de regularización y opciones de permanencia legal en España.",
      location: "Madrid, España (Presencial y Online)",
      date: "2023-05-15",
      time: "17:00 - 19:00 CEST",
      attendees: 120,
      month: "MAY",
      day: "15"
    },
    {
      id: 2,
      title: "Feria de Empleo para Migrantes",
      description: "Conecta con empresas que ofrecen oportunidades laborales para personas migrantes.",
      location: "Santiago, Chile (Centro Cultural)",
      date: "2023-06-03",
      time: "10:00 - 16:00 CLT",
      attendees: 85,
      month: "JUN",
      day: "03"
    }
  ];

  // Mock posts for when API hasn't returned data yet
  const mockPosts = [
    {
      id: 1,
      content: "Después de 6 meses en España, finalmente conseguí homologar mi título de enfermería. El proceso fue largo pero valió la pena. Recomiendo iniciar los trámites antes de salir del país de origen y apostillar todos los documentos. Si alguien necesita orientación sobre este proceso, ¡estoy aquí para ayudar!",
      userId: 1,
      originCountry: "Colombia",
      destinationCountry: "España",
      likes: 24,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 días atrás
      user: { fullName: "María González" }
    },
    {
      id: 2,
      content: "¿Alguien puede darme información sobre el proceso para obtener la visa de responsabilidad democrática en Chile? He escuchado que han cambiado los requisitos recientemente y estoy un poco confundido con la documentación necesaria.",
      userId: 2,
      originCountry: "Venezuela",
      destinationCountry: "Chile",
      likes: 12,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 días atrás
      user: { fullName: "Juan Rodríguez" }
    }
  ];

  // Determinar qué posts mostrar
  const displayPosts = posts?.slice(0, limit) || mockPosts;

  // Animaciones
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="comunidad" className="py-16 px-4 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-neutral-900 dark:text-white">
            Nuestra Comunidad
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-600 dark:text-neutral-300">
            Conecta con otros migrantes, comparte experiencias y encuentra apoyo en nuestra comunidad.
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-neutral-800 rounded-xl p-6 md:p-8 mb-10">
          <div className="mb-6">
            <h3 className="font-display font-semibold text-xl mb-4 text-neutral-900 dark:text-white">Historias y Experiencias</h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Compartir tus experiencias puede ayudar a otros. ¿Tienes un consejo o una historia que contar?
            </p>
          </div>
          
          {/* Formulario para compartir historia */}
          <form className="mb-8" onSubmit={handlePostSubmit}>
            <div className="mb-4">
              <Textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Comparte tu experiencia, pregunta o consejo para otros migrantes..."
                className="w-full px-4 py-3 rounded-lg"
                rows={4}
              />
            </div>
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={createPostMutation.isPending}
              >
                {createPostMutation.isPending ? "Enviando..." : "Compartir"}
              </Button>
            </div>
          </form>
          
          {/* Historias publicadas */}
          <div>
            <h4 className="font-medium text-lg mb-4 text-neutral-900 dark:text-white">Historias recientes</h4>
            
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {displayPosts.map((post) => {
                // Extraer las iniciales del nombre
                const initials = post.user?.fullName
                  ? post.user.fullName.split(' ').map(name => name[0]).join('').toUpperCase().substring(0, 2)
                  : 'XX';
                
                return (
                  <motion.div 
                    key={post.id} 
                    className="mb-6 pb-6 border-b border-gray-200 dark:border-neutral-700"
                    variants={item}
                  >
                    <div className="flex items-start mb-3">
                      <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center text-primary-600 dark:text-primary-300 flex-shrink-0">
                        <span>{initials}</span>
                      </div>
                      <div className="ml-3">
                        <h5 className="font-medium text-neutral-900 dark:text-white">
                          {post.user?.fullName || "Usuario"}
                        </h5>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          {formatDate(post.createdAt)} · {post.originCountry} → {post.destinationCountry}
                        </p>
                      </div>
                    </div>
                    <div className="pl-13 ml-13">
                      <p className="text-neutral-700 dark:text-neutral-300 mb-3">
                        {post.content}
                      </p>
                      <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                        <button 
                          className="inline-flex items-center hover:text-primary-600 dark:hover:text-primary-400 mr-4"
                          onClick={() => handleLikePost(post.id)}
                        >
                          <Heart className="mr-1 h-4 w-4" /> {post.likes} me gusta
                        </button>
                        <button className="inline-flex items-center hover:text-primary-600 dark:hover:text-primary-400">
                          <MessageSquare className="mr-1 h-4 w-4" /> {Math.floor(Math.random() * 15) + 1} comentarios
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
            
            <div className="text-center mt-8">
              <Link href="/comunidad" className="text-primary hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium inline-flex items-center">
                Ver más historias
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Próximos eventos */}
        <div className="mt-12">
          <h3 className="font-display font-semibold text-xl mb-6 text-neutral-900 dark:text-white text-center">
            Próximos Eventos
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <div 
                key={event.id}
                className="bg-gray-50 dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className="mb-4 sm:mb-0 sm:mr-6 bg-primary-50 dark:bg-primary-900 p-3 rounded-lg text-center sm:w-24">
                      <span className="block text-sm font-medium text-primary-800 dark:text-primary-200">{event.month}</span>
                      <span className="block text-3xl font-bold text-primary-600 dark:text-primary-300">{event.day}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-lg mb-1 text-neutral-900 dark:text-white">
                        {event.title}
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-300 mb-2">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap items-center text-sm text-neutral-500 dark:text-neutral-400">
                        <span className="inline-flex items-center mr-4 mb-2">
                          <MapPin className="mr-1 h-4 w-4 text-primary-500 dark:text-primary-400" />
                          {event.location}
                        </span>
                        <span className="inline-flex items-center mb-2">
                          <Clock className="mr-1 h-4 w-4 text-primary-500 dark:text-primary-400" />
                          {event.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-3 bg-gray-100 dark:bg-neutral-700 flex justify-between items-center">
                  <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                    <Calendar className="inline mr-1 h-4 w-4" />
                    {event.attendees} asistentes
                  </span>
                  <Button size="sm">
                    Inscribirse
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
