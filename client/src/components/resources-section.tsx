import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ResourceCategory } from "@shared/schema";
import { ChevronRight, Gavel, Briefcase, Heart, GraduationCap, Phone, Home, Landmark } from "lucide-react";
import { motion } from "framer-motion";

export default function ResourcesSection() {
  const { data: categories, isLoading, error } = useQuery<ResourceCategory[]>({
    queryKey: ["/api/resource-categories"],
  });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Mock data for when the API hasn't returned data yet
  const mockCategories = [
    { id: 1, name: "Procedimientos Legales", icon: "legal", description: "Guías, formularios y requisitos para solicitudes de asilo, visados y permisos." },
    { id: 2, name: "Trabajo y Empleo", icon: "work", description: "Portales de empleo, validación de títulos y derechos laborales para migrantes." },
    { id: 3, name: "Salud y Bienestar", icon: "health", description: "Acceso a servicios sanitarios, apoyo psicológico y emergencias médicas." },
    { id: 4, name: "Educación", icon: "education", description: "Información sobre escolarización, homologación de estudios y aprendizaje de idiomas." }
  ];

  const resourcesToShow = categories || mockCategories;

  // Map icon names to Lucide React components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "legal":
        return <Gavel className="h-6 w-6" />;
      case "work":
        return <Briefcase className="h-6 w-6" />;
      case "health":
        return <Heart className="h-6 w-6" />;
      case "education":
        return <GraduationCap className="h-6 w-6" />;
      default:
        return <Gavel className="h-6 w-6" />;
    }
  };

  const getIconColor = (id: number) => {
    const colors = [
      "bg-primary-100 text-primary-600 dark:bg-primary-800 dark:text-primary-300",
      "bg-amber-100 text-amber-600 dark:bg-amber-800 dark:text-amber-300",
      "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300",
      "bg-purple-100 text-purple-600 dark:bg-purple-800 dark:text-purple-300"
    ];
    return colors[(id - 1) % colors.length];
  };

  return (
    <section id="recursos" className="py-16 px-4 bg-gray-50 dark:bg-neutral-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-neutral-900 dark:text-white">
            Recursos Esenciales
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-600 dark:text-neutral-300">
            Información, guías y herramientas para facilitar tu proceso migratorio.
          </p>
        </div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {resourcesToShow.map((category) => (
            <motion.div
              key={category.id}
              className="bg-white dark:bg-neutral-700 rounded-lg shadow-md p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              variants={item}
            >
              <div className={`inline-flex items-center justify-center h-16 w-16 rounded-full ${getIconColor(category.id)} mb-4`}>
                {getIconComponent(category.icon)}
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-neutral-900 dark:text-white">
                {category.name}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                {category.description}
              </p>
              <Link 
                href={`/recursos?categoria=${category.id}`}
                className="text-primary hover:text-primary-700 dark:hover:text-primary-300 font-medium inline-flex items-center justify-center"
              >
                Acceder
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-white dark:bg-neutral-700 rounded-xl shadow-md overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-3/5 mb-6 md:mb-0 md:pr-6">
                  <h3 className="font-display font-semibold text-2xl mb-3 text-neutral-900 dark:text-white">
                    Contactos de Emergencia
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
                        <Home className="h-5 w-5" />
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
                      <Phone className="h-5 w-5 mr-2" />
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
        </motion.div>
      </div>
    </section>
  );
}
