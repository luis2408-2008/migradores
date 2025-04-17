import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Post, Comment, InsertPost, InsertComment } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart, MessageSquare, Calendar, MapPin, Clock, Filter, Search } from "lucide-react";
import { motion } from "framer-motion";
import { z } from "zod";

export default function CommunityPage() {
  const [postContent, setPostContent] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [activePostId, setActivePostId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTab, setFilterTab] = useState("recientes");
  
  const { user } = useAuth();
  const { toast } = useToast();

  // Consulta de publicaciones
  const { data: posts, isLoading: isLoadingPosts } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  // Consulta de comentarios para un post específico
  const { data: comments, isLoading: isLoadingComments } = useQuery<Comment[]>({
    queryKey: [`/api/posts/${activePostId}/comments`],
    enabled: activePostId !== null,
  });

  // Mutación para crear una publicación
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

  // Mutación para dar me gusta a una publicación
  const likePostMutation = useMutation({
    mutationFn: async (postId: number) => {
      const res = await apiRequest("POST", `/api/posts/${postId}/like`, {});
      return res.json();
    },
    onSuccess: () => {
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

  // Mutación para crear un comentario
  const createCommentMutation = useMutation({
    mutationFn: async ({ postId, content }: { postId: number; content: string }) => {
      const res = await apiRequest("POST", `/api/posts/${postId}/comments`, {
        content,
        postId,
        userId: user!.id
      });
      return res.json();
    },
    onSuccess: () => {
      setCommentContent("");
      queryClient.invalidateQueries({ queryKey: [`/api/posts/${activePostId}/comments`] });
      toast({
        title: "Comentario publicado",
        description: "Tu comentario ha sido publicado correctamente.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al comentar",
        description: error.message || "No se pudo publicar el comentario. Inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  // Datos simulados cuando la API no ha devuelto resultados
  const mockPosts = [
    {
      id: 1,
      content: "Después de 6 meses en España, finalmente conseguí homologar mi título de enfermería. El proceso fue largo pero valió la pena. Recomiendo iniciar los trámites antes de salir del país de origen y apostillar todos los documentos. Si alguien necesita orientación sobre este proceso, ¡estoy aquí para ayudar!",
      userId: 1,
      originCountry: "Colombia",
      destinationCountry: "España",
      likes: 24,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 días atrás
      user: { fullName: "María González", username: "mariagonzalez" }
    },
    {
      id: 2,
      content: "¿Alguien puede darme información sobre el proceso para obtener la visa de responsabilidad democrática en Chile? He escuchado que han cambiado los requisitos recientemente y estoy un poco confundido con la documentación necesaria.",
      userId: 2,
      originCountry: "Venezuela",
      destinationCountry: "Chile",
      likes: 12,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 días atrás
      user: { fullName: "Juan Rodríguez", username: "juanrodriguez" }
    },
    {
      id: 3,
      content: "Acabo de llegar a Argentina y estoy impresionado con la facilidad para hacer trámites migratorios en comparación con otros países. El DNI para extranjeros se tramita rápidamente y te permite acceder a todos los servicios. Si alguien necesita ayuda con el proceso, puedo orientarles.",
      userId: 3,
      originCountry: "Colombia",
      destinationCountry: "Argentina",
      likes: 18,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 días atrás
      user: { fullName: "Carlos Medina", username: "carlosmedina" }
    },
    {
      id: 4,
      content: "Busco recomendaciones sobre zonas económicas para alquilar en Madrid. Somos una familia de 4 personas y necesitamos algo accesible pero seguro. ¿Alguien tiene experiencia reciente?",
      userId: 4,
      originCountry: "Ecuador",
      destinationCountry: "España",
      likes: 9,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 día atrás
      user: { fullName: "Ana Suárez", username: "anasuarez" }
    }
  ];

  // Datos de comentarios simulados
  const mockComments = [
    {
      id: 1,
      content: "Yo también pasé por ese proceso. Te recomiendo que visites la oficina de extranjería directamente, te ahorrarás mucho tiempo.",
      userId: 5,
      postId: activePostId || 1,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      user: { fullName: "Laura Pérez", username: "lauraperez" }
    },
    {
      id: 2,
      content: "¿Podrías compartir qué documentos exactamente te pidieron? Estoy por iniciar el mismo trámite.",
      userId: 6,
      postId: activePostId || 1,
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      user: { fullName: "Roberto Díaz", username: "robertodiaz" }
    }
  ];

  // Eventos simulados
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
    },
    {
      id: 3,
      title: "Charla: Derechos de los Migrantes",
      description: "Informate sobre tus derechos como migrante y los recursos disponibles para defenderlos.",
      location: "Online (Zoom)",
      date: "2023-06-10",
      time: "18:00 - 20:00 GMT-3",
      attendees: 65,
      month: "JUN",
      day: "10"
    }
  ];

  // Datos a mostrar
  const displayPosts = posts || mockPosts;
  const displayComments = comments || mockComments;

  // Filtrar y ordenar publicaciones
  const getFilteredPosts = () => {
    let filtered = [...displayPosts];
    
    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.user?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.originCountry?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.destinationCountry?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Ordenar según la pestaña seleccionada
    if (filterTab === "recientes") {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (filterTab === "populares") {
      filtered.sort((a, b) => b.likes - a.likes);
    }
    
    return filtered;
  };

  // Funciones de manejo
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
      originCountry: "Venezuela", // Esto se podría obtener del perfil del usuario
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

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Inicia sesión",
        description: "Debes iniciar sesión para comentar.",
        variant: "destructive",
      });
      return;
    }

    if (!commentContent.trim()) {
      toast({
        title: "Comentario vacío",
        description: "Por favor escribe un comentario.",
        variant: "destructive",
      });
      return;
    }

    if (activePostId) {
      createCommentMutation.mutate({
        postId: activePostId,
        content: commentContent
      });
    }
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

  // Extraer las iniciales del nombre
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-24 px-4 bg-gray-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-neutral-900 dark:text-white">
              Nuestra Comunidad
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-neutral-600 dark:text-neutral-300">
              Conecta con otros migrantes, comparte experiencias y encuentra apoyo en nuestra comunidad.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
            {/* Columna principal - Publicaciones */}
            <div className="lg:col-span-5">
              {/* Formulario para compartir publicación */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Comparte tu experiencia</CardTitle>
                  <CardDescription>
                    Tus historias y consejos pueden ayudar a otros migrantes en su proceso.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePostSubmit}>
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
                </CardContent>
              </Card>

              {/* Filtro y búsqueda de publicaciones */}
              <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-grow max-w-md">
                  <Input
                    type="text"
                    placeholder="Buscar publicaciones..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <Tabs defaultValue="recientes" value={filterTab} onValueChange={setFilterTab}>
                  <TabsList>
                    <TabsTrigger value="recientes" className="flex items-center gap-1">
                      Recientes
                    </TabsTrigger>
                    <TabsTrigger value="populares" className="flex items-center gap-1">
                      Populares
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Lista de publicaciones */}
              {isLoadingPosts ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : getFilteredPosts().length === 0 ? (
                <div className="text-center py-12 text-neutral-600 dark:text-neutral-400">
                  No se encontraron publicaciones que coincidan con tu búsqueda.
                </div>
              ) : (
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  {getFilteredPosts().map((post) => (
                    <motion.div key={post.id} variants={item}>
                      <Card className="overflow-hidden">
                        <CardHeader className="pb-3">
                          <div className="flex items-start">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {getInitials(post.user?.fullName || "Usuario")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium text-lg">{post.user?.fullName || "Usuario"}</h3>
                              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                {formatDate(post.createdAt)} · {post.originCountry} → {post.destinationCountry}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                            {post.content}
                          </p>
                          <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                            <button 
                              className="inline-flex items-center hover:text-primary mr-6"
                              onClick={() => handleLikePost(post.id)}
                            >
                              <Heart className="mr-1 h-4 w-4" /> {post.likes} me gusta
                            </button>
                            <button 
                              className="inline-flex items-center hover:text-primary"
                              onClick={() => setActivePostId(post.id)}
                            >
                              <MessageSquare className="mr-1 h-4 w-4" /> {Math.floor(Math.random() * 15) + 1} comentarios
                            </button>
                          </div>
                        </CardContent>
                        
                        {activePostId === post.id && (
                          <div className="px-6 pt-2 pb-6 border-t">
                            <h4 className="font-medium mb-3">Comentarios</h4>
                            
                            {isLoadingComments ? (
                              <div className="flex justify-center py-4">
                                <div className="animate-spin h-5 w-5 border-b-2 border-primary"></div>
                              </div>
                            ) : displayComments.length === 0 ? (
                              <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                                No hay comentarios aún. Sé el primero en comentar.
                              </p>
                            ) : (
                              <div className="space-y-4 mb-4">
                                {displayComments.map((comment) => (
                                  <div key={comment.id} className="flex gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarFallback className="text-xs">
                                        {getInitials(comment.user?.fullName || "User")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="bg-gray-100 dark:bg-neutral-800 rounded-lg p-3">
                                        <div className="font-medium text-sm mb-1">{comment.user?.fullName || "Usuario"}</div>
                                        <p className="text-sm">{comment.content}</p>
                                      </div>
                                      <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                                        {formatDate(comment.createdAt)}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {/* Formulario para comentar */}
                            <form onSubmit={handleCommentSubmit} className="flex gap-2 items-start mt-4">
                              <Avatar className="h-8 w-8 mt-1">
                                <AvatarFallback className="text-xs">
                                  {user ? getInitials(user.fullName) : "?"}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <Textarea
                                  value={commentContent}
                                  onChange={(e) => setCommentContent(e.target.value)}
                                  placeholder="Escribe un comentario..."
                                  className="resize-none text-sm mb-2"
                                  rows={2}
                                />
                                <Button 
                                  type="submit" 
                                  size="sm"
                                  disabled={createCommentMutation.isPending}
                                >
                                  {createCommentMutation.isPending ? "Enviando..." : "Comentar"}
                                </Button>
                              </div>
                            </form>
                          </div>
                        )}
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Columna lateral - Eventos y recursos */}
            <div className="lg:col-span-2">
              {/* Próximos eventos */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Próximos Eventos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div key={event.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <div className="flex gap-3">
                          <div className="bg-primary-50 dark:bg-primary-900 p-2 rounded text-center min-w-16">
                            <span className="block text-xs font-medium text-primary-800 dark:text-primary-200">{event.month}</span>
                            <span className="block text-xl font-bold text-primary-600 dark:text-primary-300">{event.day}</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-base text-neutral-900 dark:text-white">{event.title}</h4>
                            <div className="flex items-center text-xs text-neutral-500 dark:text-neutral-400 mb-1 mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center text-xs text-neutral-500 dark:text-neutral-400">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{event.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <Button size="sm" variant="outline" className="w-full">Ver detalles</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="link">Ver todos los eventos</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Comunidades populares */}
              <Card>
                <CardHeader>
                  <CardTitle>Categorías populares</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      #TrabajoEnElExtranjero
                      <span className="ml-auto text-xs text-neutral-500">128 posts</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      #HomologaciónDeTítulos
                      <span className="ml-auto text-xs text-neutral-500">87 posts</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      #BuscandoVivienda
                      <span className="ml-auto text-xs text-neutral-500">76 posts</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      #TrámitesMigratorios
                      <span className="ml-auto text-xs text-neutral-500">62 posts</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      #AprendiendoElIdioma
                      <span className="ml-auto text-xs text-neutral-500">59 posts</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
