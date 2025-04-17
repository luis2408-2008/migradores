import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Country } from "@shared/schema";
import { ArrowRight, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function CountriesSection({ limit = 3 }: { limit?: number }) {
  const { data: countries, isLoading, error } = useQuery<Country[]>({
    queryKey: ["/api/countries"],
  });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const displayedCountries = countries?.slice(0, limit) || [];

  // Datos con banderas reales e imágenes icónicas de cada país
  const mockCountries = [
    {
      id: 1,
      name: "España",
      flagUrl: "https://flagicons.lipis.dev/flags/4x3/es.svg",
      imageUrl: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Información sobre el sistema de asilo español, permisos de residencia y trabajo, homologación de títulos y más."
    },
    {
      id: 2,
      name: "Colombia",
      flagUrl: "https://flagicons.lipis.dev/flags/4x3/co.svg",
      imageUrl: "https://images.unsplash.com/photo-1518638150340-f706e86654de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Guía sobre el Permiso Especial de Permanencia (PEP), acceso a servicios, trámites para migrantes venezolanos y más."
    },
    {
      id: 3,
      name: "Chile",
      flagUrl: "https://flagicons.lipis.dev/flags/4x3/cl.svg",
      imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Información sobre visas de residencia, sistema de salud, educación y programas de apoyo a migrantes."
    },
    {
      id: 4,
      name: "México",
      flagUrl: "https://flagicons.lipis.dev/flags/4x3/mx.svg",
      imageUrl: "https://images.unsplash.com/photo-1547995886-6dc09384c6e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Guía sobre trámites migratorios, programas de integración, opciones de empleo y acceso a servicios públicos."
    },
    {
      id: 5,
      name: "Argentina",
      flagUrl: "https://flagicons.lipis.dev/flags/4x3/ar.svg",
      imageUrl: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Información sobre el proceso de residencia, convalidación de estudios, sistema de salud y derechos laborales."
    },
    {
      id: 6,
      name: "Estados Unidos",
      flagUrl: "https://flagicons.lipis.dev/flags/4x3/us.svg",
      imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Requisitos de visas, procesos de asilo político, recursos para migrantes y comunidades de apoyo."
    }
  ];

  // Usamos los datos de la API si están disponibles, sino los datos de muestra
  const availableCountries = displayedCountries.length > 0 ? displayedCountries : mockCountries;
  // Limitamos a mostrar solo la cantidad especificada por el parámetro limit
  const countriesToDisplay = availableCountries.slice(0, limit);
  
  return (
    <section id="paises" className="py-16 px-4 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-neutral-900 dark:text-white">
            Información por País
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-600 dark:text-neutral-300">
            Selecciona un país para obtener información específica sobre procesos migratorios, requisitos legales, y recursos disponibles.
          </p>
        </div>
        
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {countriesToDisplay.map((country) => (
            <motion.div 
              key={country.id}
              className="bg-gray-50 dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              variants={item}
            >
              <img 
                src={country.imageUrl} 
                alt={`Paisaje icónico de ${country.name}`} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <img 
                    src={country.flagUrl} 
                    alt={`Bandera de ${country.name}`} 
                    className="w-8 h-6 object-cover rounded-sm shadow-sm"
                  />
                  <h3 className="font-display font-semibold text-xl text-neutral-900 dark:text-white">{country.name}</h3>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  {country.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-block bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 px-3 py-1 rounded-full text-xs font-medium">
                    Legal
                  </span>
                  <span className="inline-block bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 px-3 py-1 rounded-full text-xs font-medium">
                    Trabajo
                  </span>
                  <span className="inline-block bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-3 py-1 rounded-full text-xs font-medium">
                    Salud
                  </span>
                </div>
                <Link href={`/paises/${country.id}`} className="text-primary hover:text-primary-700 dark:hover:text-primary-300 font-medium inline-flex items-center">
                  Ver información
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-10 text-center">
          <Button asChild className="gap-2">
            <Link href="/paises">
              Ver todos los países
              <Globe className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
