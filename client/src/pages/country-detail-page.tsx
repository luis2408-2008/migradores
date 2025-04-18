import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Country, Resource } from "@shared/schema";
import ResourceDetailModal from "@/components/resource-detail-modal";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Scale3d, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Home, 
  Phone, 
  FileText, 
  ArrowLeft, 
  MapPin,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";

export default function CountryDetailPage() {
  const { id } = useParams();
  const countryId = parseInt(id || "0");
  const [activeTab, setActiveTab] = useState("legal");

  // Consulta de datos del país
  const { data: country, isLoading: isLoadingCountry } = useQuery<Country>({
    queryKey: [`/api/countries/${countryId}`],
    enabled: !isNaN(countryId),
  });

  // Consulta de recursos por país
  const { data: resources, isLoading: isLoadingResources } = useQuery<Resource[]>({
    queryKey: [`/api/resources?countryId=${countryId}`],
    enabled: !isNaN(countryId),
  });

  // Eventos simulados para el país
  const mockEvents = [
    {
      id: 1,
      title: "Taller de Regularización Migratoria",
      description: "Aprende sobre los procesos de regularización y opciones de permanencia legal.",
      location: "Madrid, Centro Cultural (Presencial y Online)",
      date: "2023-05-15",
      time: "17:00 - 19:00",
      month: "MAY",
      day: "15"
    },
    {
      id: 2,
      title: "Feria de Empleo para Migrantes",
      description: "Conecta con empresas que ofrecen oportunidades laborales para personas migrantes.",
      location: "Barcelona, Centro Cívico",
      date: "2023-06-03",
      time: "10:00 - 16:00",
      month: "JUN",
      day: "03"
    }
  ];

  // Mock data cuando la API no ha devuelto datos
  const mockCountry = {
    id: countryId,
    name: "España",
    flagUrl: "https://images.unsplash.com/photo-1623777815243-65427924c10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    imageUrl: "https://images.unsplash.com/photo-1555990283-6fe8bfbec9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "España es uno de los países más acogedores de Europa para los migrantes, especialmente para aquellos que provienen de América Latina debido a los lazos culturales e idiomáticos. Aquí encontrarás información relevante sobre los distintos procesos migratorios, oportunidades laborales, acceso a servicios de salud, educación y vivienda."
  };

  const mockResources = [
    {
      id: 1,
      title: "Guía del proceso de asilo en España",
      description: "Información detallada sobre el proceso de solicitud de asilo y protección internacional.",
      content: "El proceso de solicitud de asilo en España comienza con la manifestación de la voluntad de solicitar protección internacional. Esta solicitud debe realizarse en el plazo de 1 mes desde la entrada en territorio español o desde que se produzcan los hechos que justifiquen el temor de persecución...",
      categoryId: 1, // Legal
      countryId: countryId
    },
    {
      id: 2,
      title: "Regularización por arraigo social, laboral y familiar",
      description: "Procedimientos para obtener residencia legal a través de diferentes tipos de arraigo.",
      content: "El arraigo social es una autorización de residencia temporal por circunstancias excepcionales que se puede conceder a ciudadanos extranjeros que se encuentren en España y hayan permanecido en el país de forma continuada durante un periodo mínimo de 3 años...",
      categoryId: 1, // Legal
      countryId: countryId
    },
    {
      id: 3,
      title: "Homologación de títulos universitarios",
      description: "Guía completa para la homologación y convalidación de títulos académicos extranjeros.",
      content: "La homologación de un título extranjero a un título español es el reconocimiento oficial de la formación superada para la obtención de un título extranjero, como equivalente a la exigida para la obtención de un título español...",
      categoryId: 4, // Educación
      countryId: countryId
    },
    {
      id: 4,
      title: "Acceso al sistema sanitario español",
      description: "Información sobre cómo acceder a la sanidad pública y obtener la tarjeta sanitaria.",
      content: "En España, el Sistema Nacional de Salud garantiza la asistencia sanitaria a todos los ciudadanos españoles y a los extranjeros que tengan establecida su residencia en territorio español. Para acceder a los servicios sanitarios es necesario obtener la Tarjeta Sanitaria Individual...",
      categoryId: 3, // Salud
      countryId: countryId
    },
    {
      id: 5,
      title: "Sectores con mayor demanda laboral",
      description: "Análisis de los sectores con mayores oportunidades de empleo para migrantes.",
      content: "En España, varios sectores presentan una alta demanda de trabajadores, ofreciendo buenas oportunidades para los migrantes. Entre estos sectores destacan: tecnología, turismo, hostelería, cuidado de personas mayores, agricultura...",
      categoryId: 2, // Trabajo
      countryId: countryId
    },
    {
      id: 6,
      title: "Guía de ayudas para el alquiler de vivienda",
      description: "Información sobre subsidios y ayudas disponibles para el acceso a la vivienda.",
      content: "El gobierno español y las comunidades autónomas ofrecen diversas ayudas para facilitar el acceso a la vivienda en alquiler. Entre ellas destacan el Bono Alquiler Joven, las ayudas al alquiler para colectivos vulnerables...",
      categoryId: 5, // Vivienda
      countryId: countryId
    }
  ];

  const displayCountry = country || mockCountry;
  const displayResources = resources || mockResources;

  // Filtrar recursos por categoría seleccionada
  const getResourcesByCategory = (categoryId: number) => {
    return displayResources.filter(resource => resource.categoryId === categoryId);
  };

  // Obtener el ícono según la categoría
  const getCategoryIcon = (categoryId: number) => {
    switch (categoryId) {
      case 1: return <Scale3d className="h-5 w-5" />;
      case 2: return <Briefcase className="h-5 w-5" />;
      case 3: return <Heart className="h-5 w-5" />;
      case 4: return <GraduationCap className="h-5 w-5" />;
      case 5: return <Home className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  // Animaciones
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {isLoadingCountry ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Hero */}
            <section className="relative h-72 md:h-96 overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${displayCountry.imageUrl})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              </div>
              <div className="relative h-full flex items-end">
                <div className="container mx-auto px-4 py-8">
                  <Button variant="outline" asChild className="mb-4 bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30">
                    <Link href="/paises">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Volver a países
                    </Link>
                  </Button>
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-white">{displayCountry.name}</h1>
                </div>
              </div>
            </section>

            {/* Contenido */}
            <section className="py-12 px-4">
              <div className="max-w-7xl mx-auto">
                <motion.div 
                  className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 mb-12"
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-2xl font-display font-semibold mb-4 text-neutral-900 dark:text-white">Sobre {displayCountry.name}</h2>
                  <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                    {displayCountry.description}
                  </p>
                </motion.div>

                {/* Tabs de categorías */}
                <Tabs defaultValue="legal" value={activeTab} onValueChange={setActiveTab} className="mb-12">
                  <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
                    <TabsTrigger value="legal" className="flex items-center gap-2">
                      <Scale3d className="h-4 w-4" />
                      <span className="hidden md:inline">Legal</span>
                    </TabsTrigger>
                    <TabsTrigger value="trabajo" className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      <span className="hidden md:inline">Trabajo</span>
                    </TabsTrigger>
                    <TabsTrigger value="salud" className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      <span className="hidden md:inline">Salud</span>
                    </TabsTrigger>
                    <TabsTrigger value="educacion" className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      <span className="hidden md:inline">Educación</span>
                    </TabsTrigger>
                    <TabsTrigger value="vivienda" className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      <span className="hidden md:inline">Vivienda</span>
                    </TabsTrigger>
                    <TabsTrigger value="emergencia" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span className="hidden md:inline">Emergencia</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="legal">
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                      className="grid md:grid-cols-2 gap-6"
                    >
                      {getResourcesByCategory(1).map(resource => (
                        <motion.div key={resource.id} variants={item}>
                          <Card>
                            <CardHeader>
                              <div className="flex items-center gap-2">
                                <div className="p-2 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                                  {getCategoryIcon(resource.categoryId)}
                                </div>
                                <CardTitle className="text-xl">{resource.title}</CardTitle>
                              </div>
                              <CardDescription>{resource.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-neutral-700 dark:text-neutral-300">
                                {resource.content.replace(/<[^>]*>/g, "").slice(0, 200)}...
                              </p>
                              <Button variant="link" className="p-0 mt-2 h-auto">
                                Leer más
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="trabajo">
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                      className="grid md:grid-cols-2 gap-6"
                    >
                      {getResourcesByCategory(2).map(resource => (
                        <motion.div key={resource.id} variants={item}>
                          <Card>
                            <CardHeader>
                              <div className="flex items-center gap-2">
                                <div className="p-2 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                                  {getCategoryIcon(resource.categoryId)}
                                </div>
                                <CardTitle className="text-xl">{resource.title}</CardTitle>
                              </div>
                              <CardDescription>{resource.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-neutral-700 dark:text-neutral-300">
                                {resource.content.replace(/<[^>]*>/g, "").slice(0, 200)}...
                              </p>
                              <Button variant="link" className="p-0 mt-2 h-auto">
                                Leer más
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="salud">
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                      className="grid md:grid-cols-2 gap-6"
                    >
                      {getResourcesByCategory(3).map(resource => (
                        <motion.div key={resource.id} variants={item}>
                          <Card>
                            <CardHeader>
                              <div className="flex items-center gap-2">
                                <div className="p-2 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                                  {getCategoryIcon(resource.categoryId)}
                                </div>
                                <CardTitle className="text-xl">{resource.title}</CardTitle>
                              </div>
                              <CardDescription>{resource.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-neutral-700 dark:text-neutral-300">
                                {resource.content.replace(/<[^>]*>/g, "").slice(0, 200)}...
                              </p>
                              <Button variant="link" className="p-0 mt-2 h-auto">
                                Leer más
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="educacion">
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                      className="grid md:grid-cols-2 gap-6"
                    >
                      {getResourcesByCategory(4).map(resource => (
                        <motion.div key={resource.id} variants={item}>
                          <Card>
                            <CardHeader>
                              <div className="flex items-center gap-2">
                                <div className="p-2 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                                  {getCategoryIcon(resource.categoryId)}
                                </div>
                                <CardTitle className="text-xl">{resource.title}</CardTitle>
                              </div>
                              <CardDescription>{resource.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-neutral-700 dark:text-neutral-300">
                                {resource.content.replace(/<[^>]*>/g, "").slice(0, 200)}...
                              </p>
                              <Button variant="link" className="p-0 mt-2 h-auto">
                                Leer más
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="vivienda">
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                      className="grid md:grid-cols-2 gap-6"
                    >
                      {getResourcesByCategory(5).map(resource => (
                        <motion.div key={resource.id} variants={item}>
                          <Card>
                            <CardHeader>
                              <div className="flex items-center gap-2">
                                <div className="p-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                                  {getCategoryIcon(resource.categoryId)}
                                </div>
                                <CardTitle className="text-xl">{resource.title}</CardTitle>
                              </div>
                              <CardDescription>{resource.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-neutral-700 dark:text-neutral-300">
                                {resource.content.replace(/<[^>]*>/g, "").slice(0, 200)}...
                              </p>
                              <Button variant="link" className="p-0 mt-2 h-auto">
                                Leer más
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="emergencia">
                    <motion.div
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                      className="bg-white dark:bg-neutral-800 rounded-xl p-6"
                    >
                      <h2 className="text-2xl font-display font-semibold mb-6 text-neutral-900 dark:text-white">
                        Contactos de Emergencia en {displayCountry.name}
                      </h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                          <CardHeader>
                            <CardTitle className="text-red-700 dark:text-red-300 flex items-center gap-2">
                              <Phone className="h-5 w-5" />
                              Emergencias Generales
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-3">
                              <li className="flex items-center justify-between border-b border-red-200 dark:border-red-800 pb-2">
                                <span className="font-medium">Emergencias</span>
                                <span className="text-lg font-bold">112</span>
                              </li>
                              <li className="flex items-center justify-between border-b border-red-200 dark:border-red-800 pb-2">
                                <span className="font-medium">Policía Nacional</span>
                                <span className="text-lg font-bold">091</span>
                              </li>
                              <li className="flex items-center justify-between border-b border-red-200 dark:border-red-800 pb-2">
                                <span className="font-medium">Emergencias Médicas</span>
                                <span className="text-lg font-bold">061</span>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <MapPin className="h-5 w-5" />
                              Organizaciones de Apoyo
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-3">
                              <li className="border-b pb-2">
                                <p className="font-medium">Cruz Roja - Atención al Inmigrante</p>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                  Tel: 900 221 122 (Gratuito)
                                </p>
                              </li>
                              <li className="border-b pb-2">
                                <p className="font-medium">ACNUR España</p>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                  Tel: +34 91 369 06 70
                                </p>
                              </li>
                              <li className="border-b pb-2">
                                <p className="font-medium">Servicio de Atención al Inmigrante</p>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                  Tel: +34 91 563 21 12
                                </p>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-lg border border-red-200 dark:border-red-800">
                        <h3 className="text-lg font-medium text-red-700 dark:text-red-300 mb-3 flex items-center">
                          <Phone className="h-5 w-5 mr-2" />
                          Línea de ayuda 24/7
                        </h3>
                        <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                          Si te encuentras en una situación de emergencia, contacta a nuestra línea gratuita de apoyo las 24 horas.
                        </p>
                        <div className="bg-white dark:bg-neutral-800 px-4 py-3 rounded-md text-center">
                          <span className="text-xl font-bold text-red-600 dark:text-red-400">
                            +1-800-MIGRATE (800-644-7283)
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>
                </Tabs>

                {/* Eventos en el país */}
                <div className="mb-12">
                  <h2 className="text-2xl font-display font-semibold mb-6 text-neutral-900 dark:text-white">
                    Próximos Eventos en {displayCountry.name}
                  </h2>
                  
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {mockEvents.map((event) => (
                      <motion.div 
                        key={event.id}
                        className="bg-gray-50 dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        variants={item}
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
                            <svg className="inline mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {Math.floor(Math.random() * 120) + 20} asistentes
                          </span>
                          <Button size="sm">
                            Inscribirse
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
