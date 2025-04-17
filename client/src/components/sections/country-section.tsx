import { useState } from "react";
import { motion } from "framer-motion";
import { Country } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type CountrySectionProps = {
  countries: Country[];
};

const CountrySection = ({ countries = [] }: CountrySectionProps) => {
  const [showAll, setShowAll] = useState(false);
  
  // Mostrar solo 3 países o todos si showAll es true
  const displayedCountries = showAll ? countries : countries.slice(0, 3);
  
  // Si no hay países, mostrar ejemplos para la UI
  const hasCountries = countries.length > 0;
  
  const sampleCountries = [
    {
      id: 1,
      name: "España",
      imageUrl: "https://images.unsplash.com/photo-1623777815243-65427924c10e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      description: "Información sobre el sistema de asilo español, permisos de residencia y trabajo, homologación de títulos y más.",
      tags: ["Legal", "Trabajo", "Salud"],
    },
    {
      id: 2,
      name: "Colombia",
      imageUrl: "https://images.unsplash.com/photo-1599413850737-5fd5ff448fb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      description: "Guía sobre el Permiso Especial de Permanencia (PEP), acceso a servicios, trámites para migrantes venezolanos y más.",
      tags: ["Asilo", "Educación", "Trabajo"],
    },
    {
      id: 3,
      name: "Chile",
      imageUrl: "https://images.unsplash.com/photo-1510253687831-9a0a16d2fafc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      description: "Información sobre visas de residencia, sistema de salud, educación y programas de apoyo a migrantes.",
      tags: ["Salud", "Vivienda", "Educación"],
    },
  ];

  const countriesToDisplay = hasCountries ? displayedCountries : sampleCountries;

  // Colores para las categorías
  const tagColors: Record<string, string> = {
    Legal: "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200",
    Trabajo: "bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-200",
    Salud: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Asilo: "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200",
    Educación: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    Vivienda: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  };

  const getTagClassName = (tag: string) => {
    return tagColors[tag] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  };

  return (
    <section
      id="paises"
      className="py-16 px-4 bg-white dark:bg-neutral-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-neutral-900 dark:text-white">
            Información por País
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-600 dark:text-neutral-300">
            Selecciona un país para obtener información específica sobre procesos migratorios, requisitos legales, y recursos disponibles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {countriesToDisplay.map((country, index) => (
            <motion.div
              key={country.id}
              className="bg-gray-50 dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden transition-colors duration-300 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img
                src={country.imageUrl}
                alt={`Bandera y paisaje de ${country.name}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-display font-semibold text-xl mb-2 text-neutral-900 dark:text-white">
                  {country.name}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  {country.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {country.tags?.map((tag, i) => (
                    <Badge key={i} variant="outline" className={getTagClassName(tag)}>
                      {tag}
                    </Badge>
                  ))}
                </div>
                <a
                  href={`/paises/${country.id}`}
                  className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium inline-flex items-center"
                >
                  Ver información
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
              </div>
            </motion.div>
          ))}
        </div>

        {(hasCountries && countries.length > 3) && (
          <div className="mt-10 text-center">
            <Button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center justify-center"
            >
              {showAll ? "Ver menos países" : "Ver todos los países"}
              <Globe className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CountrySection;
