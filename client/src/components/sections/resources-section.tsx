import { motion } from "framer-motion";
import { Resource } from "@shared/schema";
import { 
  Gavel, Briefcase, Heart, GraduationCap, 
  Home, Phone, HandHelping, Building, MapPin, 
  Clock, AlertTriangle
} from "lucide-react";

// Mapeo de iconos basado en la categoría
const categoryIcons: Record<string, React.ReactNode> = {
  legal: <Gavel className="h-6 w-6" />,
  trabajo: <Briefcase className="h-6 w-6" />,
  salud: <Heart className="h-6 w-6" />,
  educacion: <GraduationCap className="h-6 w-6" />,
  vivienda: <Home className="h-6 w-6" />,
};

// Colores por categoría
const categoryColors: Record<string, string> = {
  legal: "bg-primary-100 text-primary-600 dark:bg-primary-800 dark:text-primary-300",
  trabajo: "bg-secondary-100 text-secondary-600 dark:bg-secondary-800 dark:text-secondary-300",
  salud: "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300",
  educacion: "bg-purple-100 text-purple-600 dark:bg-purple-800 dark:text-purple-300",
  vivienda: "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300",
};

// Obtener icono por categoría
const getIconByCategory = (category: string) => {
  return categoryIcons[category.toLowerCase()] || <Briefcase className="h-6 w-6" />;
};

// Obtener clase de color por categoría
const getColorByCategory = (category: string) => {
  return categoryColors[category.toLowerCase()] || "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
};

type ResourcesSectionProps = {
  resources: Resource[];
};

const ResourcesSection = ({ resources = [] }: ResourcesSectionProps) => {
  // Si no hay recursos, mostrar ejemplos para la UI
  const hasResources = resources.length > 0;

  const defaultResources = [
    {
      id: 1,
      title: "Procedimientos Legales",
      description: "Guías, formularios y requisitos para solicitudes de asilo, visados y permisos.",
      category: "legal",
      icon: "Gavel",
    },
    {
      id: 2,
      title: "Trabajo y Empleo",
      description: "Portales de empleo, validación de títulos y derechos laborales para migrantes.",
      category: "trabajo",
      icon: "Briefcase",
    },
    {
      id: 3,
      title: "Salud y Bienestar",
      description: "Acceso a servicios sanitarios, apoyo psicológico y emergencias médicas.",
      category: "salud",
      icon: "Heart",
    },
    {
      id: 4,
      title: "Educación",
      description: "Información sobre escolarización, homologación de estudios y aprendizaje de idiomas.",
      category: "educacion",
      icon: "GraduationCap",
    },
  ];

  const resourcesToDisplay = hasResources ? resources : defaultResources;

  return (
    <section
      id="recursos"
      className="py-16 px-4 bg-gray-50 dark:bg-neutral-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-neutral-900 dark:text-white">
            Recursos Esenciales
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-600 dark:text-neutral-300">
            Información, guías y herramientas para facilitar tu proceso migratorio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resourcesToDisplay.map((resource, index) => (
            <motion.div
              key={resource.id}
              className="bg-white dark:bg-neutral-700 rounded-lg shadow-md p-6 text-center transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={`inline-flex items-center justify-center h-16 w-16 rounded-full ${getColorByCategory(resource.category)} mb-4`}>
                {getIconByCategory(resource.category)}
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-neutral-900 dark:text-white">
                {resource.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                {resource.description}
              </p>
              <a
                href={`/recursos/${resource.id}`}
                className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium inline-flex items-center justify-center"
              >
                Acceder
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <motion.div
            className="bg-white dark:bg-neutral-700 rounded-xl shadow-md overflow-hidden transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            data-aos="fade-up"
            data-aos-delay="300"
          >
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
                        <Building className="h-5 w-5" />
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
                    <h4 className="text-lg font-medium text-red-700 dark:text-red-300 mb-3">
                      <AlertTriangle className="inline-block mr-2 h-5 w-5" />
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
