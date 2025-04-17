import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ResourceCategory, Resource } from "@shared/schema";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Gavel, 
  Briefcase, 
  Heart, 
  GraduationCap, 
  Home, 
  Landmark, 
  Phone, 
  HandHelping, 
  ChevronRight, 
  Search 
} from "lucide-react";
import { motion } from "framer-motion";

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todos");

  // Consulta de categorías de recursos
  const { data: categories, isLoading: isLoadingCategories } = useQuery<ResourceCategory[]>({
    queryKey: ["/api/resource-categories"],
  });

  // Consulta de recursos
  const { data: resources, isLoading: isLoadingResources } = useQuery<Resource[]>({
    queryKey: ["/api/resources"],
  });

  // Datos simulados cuando la API no ha devuelto resultados
  const mockCategories = [
    { id: 1, name: "Procedimientos Legales", icon: "legal", description: "Guías, formularios y requisitos para solicitudes de asilo, visados y permisos." },
    { id: 2, name: "Trabajo y Empleo", icon: "work", description: "Portales de empleo, validación de títulos y derechos laborales para migrantes." },
    { id: 3, name: "Salud y Bienestar", icon: "health", description: "Acceso a servicios sanitarios, apoyo psicológico y emergencias médicas." },
    { id: 4, name: "Educación", icon: "education", description: "Información sobre escolarización, homologación de estudios y aprendizaje de idiomas." },
    { id: 5, name: "Vivienda", icon: "housing", description: "Ayudas para alquiler, derechos de inquilinos y centros de acogida temporal." },
    { id: 6, name: "Derechos Humanos", icon: "rights", description: "Información sobre tus derechos fundamentales como migrante o refugiado." }
  ];

  const mockResources = [
    {
      id: 1,
      title: "Guía del proceso de asilo en España",
      description: "Información detallada sobre el proceso de solicitud de asilo y protección internacional.",
      content: "El proceso de solicitud de asilo en España comienza con la manifestación de la voluntad de solicitar protección internacional. Esta solicitud debe realizarse en el plazo de 1 mes desde la entrada en territorio español o desde que se produzcan los hechos que justifiquen el temor de persecución...",
      categoryId: 1, // Legal
      countryId: 1 // España
    },
    {
      id: 2,
      title: "Regularización por arraigo social, laboral y familiar",
      description: "Procedimientos para obtener residencia legal a través de diferentes tipos de arraigo.",
      content: "El arraigo social es una autorización de residencia temporal por circunstancias excepcionales que se puede conceder a ciudadanos extranjeros que se encuentren en España y hayan permanecido en el país de forma continuada durante un periodo mínimo de 3 años...",
      categoryId: 1, // Legal
      countryId: 1 // España
    },
    {
      id: 3,
      title: "Homologación de títulos universitarios",
      description: "Guía completa para la homologación y convalidación de títulos académicos extranjeros.",
      content: "La homologación de un título extranjero a un título español es el reconocimiento oficial de la formación superada para la obtención de un título extranjero, como equivalente a la exigida para la obtención de un título español...",
      categoryId: 4, // Educación
      countryId: 1 // España
    },
    {
      id: 4,
      title: "Permiso Especial de Permanencia (PEP) en Colombia",
      description: "Todo lo que necesitas saber sobre el PEP para migrantes venezolanos.",
      content: "El Permiso Especial de Permanencia (PEP) es un mecanismo de regularización migratoria para los nacionales venezolanos en Colombia, que permite trabajar, estudiar y acceder al sistema de salud, pensión y bancario...",
      categoryId: 1, // Legal
      countryId: 2 // Colombia
    },
    {
      id: 5,
      title: "Acceso al sistema de salud chileno para migrantes",
      description: "Información sobre cómo acceder a la atención médica en Chile.",
      content: "En Chile, los migrantes tienen diferentes opciones para acceder a la atención de salud, dependiendo de su situación migratoria. Aquellos con residencia pueden afiliarse a FONASA (sistema público) o a una ISAPRE (seguro privado)...",
      categoryId: 3, // Salud
      countryId: 3 // Chile
    },
    {
      id: 6,
      title: "Derechos laborales de los migrantes en Argentina",
      description: "Información sobre el marco legal que protege a los trabajadores migrantes.",
      content: "En Argentina, la Ley de Migraciones garantiza la igualdad de derechos entre nacionales y extranjeros. Los trabajadores migrantes tienen los mismos derechos laborales que los argentinos, incluyendo salario mínimo, jornada laboral, descanso, vacaciones y seguridad social...",
      categoryId: 2, // Trabajo
      countryId: 5 // Argentina
    }
  ];

  // Datos a mostrar
  const displayCategories = categories || mockCategories;
  const displayResources = resources || mockResources;

  // Filtrar recursos por término de búsqueda y categoría
  const filteredResources = displayResources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      activeTab === "todos" || 
      resource.categoryId === parseInt(activeTab);
    
    return matchesSearch && matchesCategory;
  });

  // Obtener el ícono según la categoría
  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case "legal": return <Gavel className="h-6 w-6" />;
      case "work": return <Briefcase className="h-6 w-6" />;
      case "health": return <Heart className="h-6 w-6" />;
      case "education": return <GraduationCap className="h-6 w-6" />;
      case "housing": return <Home className="h-6 w-6" />;
      case "rights": return <Landmark className="h-6 w-6" />;
      default: return <Gavel className="h-6 w-6" />;
    }
  };

  // Obtener el color según la categoría
  const getCategoryColor = (id: number) => {
    const colors = [
      "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300", // Legal
      "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300", // Trabajo
      "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300", // Salud
      "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300", // Educación
      "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300", // Vivienda
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300" // Derechos
    ];
    return colors[(id - 1) % colors.length];
  };

  // Animaciones
  const container = {
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
      <main className="flex-grow py-24 px-4 bg-gray-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-neutral-900 dark:text-white">
              Recursos Esenciales
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-neutral-600 dark:text-neutral-300">
              Información, guías y herramientas para facilitar tu proceso migratorio y adaptación a tu nuevo país.
            </p>
          </div>

          {/* Buscador de recursos */}
          <div className="mb-10 max-w-lg mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar recursos por palabra clave..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Categorías destacadas */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {displayCategories.map((category) => (
              <motion.div
                key={category.id}
                className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                variants={item}
                onClick={() => setActiveTab(category.id.toString())}
              >
                <div className={`inline-flex items-center justify-center h-16 w-16 rounded-full ${getCategoryColor(category.id)} mb-4`}>
                  {getCategoryIcon(category.icon)}
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 text-neutral-900 dark:text-white">
                  {category.name}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  {category.description}
                </p>
                <Button variant="link" className="text-primary hover:text-primary-700 dark:hover:text-primary-300 font-medium inline-flex items-center justify-center">
                  Ver recursos
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Filtro de recursos por categoría */}
          <Tabs 
            defaultValue="todos" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="mb-8"
          >
            <TabsList className="w-full flex overflow-x-auto py-2 justify-start">
              <TabsTrigger value="todos" className="flex-shrink-0">Todos</TabsTrigger>
              {displayCategories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id.toString()}
                  className="flex-shrink-0"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Lista de recursos */}
          {isLoadingResources ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center py-12 text-neutral-600 dark:text-neutral-400">
              No se encontraron recursos que coincidan con tu búsqueda.
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {filteredResources.map((resource) => (
                <motion.div 
                  key={resource.id}
                  variants={item}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`p-2 rounded-full ${getCategoryColor(resource.categoryId)}`}>
                          {getCategoryIcon(displayCategories.find(c => c.id === resource.categoryId)?.icon || "legal")}
                        </div>
                        <CardTitle>{resource.title}</CardTitle>
                      </div>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                        {resource.content.slice(0, 200)}...
                      </p>
                      <Button variant="link" className="p-0 h-auto">
                        Leer más
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Sección de contactos de emergencia */}
          <div className="mt-16">
            <h2 className="text-2xl font-display font-semibold mb-6 text-neutral-900 dark:text-white text-center">
              Contactos de Emergencia
            </h2>
            
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden p-6">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-3/5 mb-6 md:mb-0 md:pr-6">
                  <h3 className="font-display font-semibold text-xl mb-3 text-neutral-900 dark:text-white">
                    Líneas de ayuda y organizaciones
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                    Listado actualizado de números de emergencia, líneas de ayuda y organizaciones que brindan apoyo inmediato a migrantes en situaciones de crisis.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-md bg-red-100 dark:bg-red-800 flex items-center justify-center text-red-600 dark:text-red-300">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-base font-medium text-neutral-900 dark:text-white">Emergencias</h4>
                        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                          Números de emergencia por país
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-md bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-300">
                        <HandHelping className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-base font-medium text-neutral-900 dark:text-white">Soporte</h4>
                        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                          Organizaciones de ayuda al migrante
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-md bg-green-100 dark:bg-green-800 flex items-center justify-center text-green-600 dark:text-green-300">
                        <Home className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-base font-medium text-neutral-900 dark:text-white">Albergues</h4>
                        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                          Refugios y alojamiento temporal
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-md bg-indigo-100 dark:bg-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-300">
                        <Landmark className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-base font-medium text-neutral-900 dark:text-white">Consulados</h4>
                        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                          Información de contacto consular
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/5">
                  <div className="bg-red-50 dark:bg-red-900 dark:bg-opacity-30 p-5 rounded-lg">
                    <h4 className="text-lg font-medium text-red-700 dark:text-red-300 mb-3 flex items-center">
                      <Phone className="mr-2 h-5 w-5" />
                      Línea de ayuda 24/7
                    </h4>
                    <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                      Si te encuentras en una situación de emergencia, contacta a nuestra línea gratuita de apoyo las 24 horas.
                    </p>
                    <div className="bg-white dark:bg-neutral-800 px-4 py-3 rounded-md text-center">
                      <span className="text-xl font-bold text-red-600 dark:text-red-400">
                        +1-800-MIGRATE (800-644-7283)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
