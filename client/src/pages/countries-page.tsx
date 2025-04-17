import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Country } from "@shared/schema";
import { Link } from "wouter";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CountriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: countries, isLoading, error } = useQuery<Country[]>({
    queryKey: ["/api/countries"],
  });

  // Mock data for when the API hasn't returned data yet
  const mockCountries = [
    {
      id: 1,
      name: "España",
      flagUrl: "https://images.unsplash.com/photo-1623777815243-65427924c10e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      imageUrl: "https://images.unsplash.com/photo-1623777815243-65427924c10e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      description: "Información sobre el sistema de asilo español, permisos de residencia y trabajo, homologación de títulos y más."
    },
    {
      id: 2,
      name: "Colombia",
      flagUrl: "https://images.unsplash.com/photo-1599413850737-5fd5ff448fb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      imageUrl: "https://images.unsplash.com/photo-1599413850737-5fd5ff448fb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      description: "Guía sobre el Permiso Especial de Permanencia (PEP), acceso a servicios, trámites para migrantes venezolanos y más."
    },
    {
      id: 3,
      name: "Chile",
      flagUrl: "https://images.unsplash.com/photo-1510253687831-9a0a16d2fafc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      imageUrl: "https://images.unsplash.com/photo-1510253687831-9a0a16d2fafc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      description: "Información sobre visas de residencia, sistema de salud, educación y programas de apoyo a migrantes."
    },
    {
      id: 4,
      name: "México",
      flagUrl: "https://images.unsplash.com/photo-1518638150340-f706e86654de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      imageUrl: "https://images.unsplash.com/photo-1518638150340-f706e86654de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      description: "Información sobre visas humanitarias, trámites de residencia, servicios de salud y oportunidades laborales."
    },
    {
      id: 5,
      name: "Argentina",
      flagUrl: "https://images.unsplash.com/photo-1588696616894-a5c4c11715d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      imageUrl: "https://images.unsplash.com/photo-1588696616894-a5c4c11715d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      description: "Guía sobre el programa de regularización migratoria, DNI para extranjeros, sistema educativo y servicios públicos."
    },
    {
      id: 6,
      name: "Perú",
      flagUrl: "https://images.unsplash.com/photo-1580750882617-8c96b63a7060?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      imageUrl: "https://images.unsplash.com/photo-1580750882617-8c96b63a7060?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      description: "Información sobre el PTP (Permiso Temporal de Permanencia), acceso a salud, educación y oportunidades de trabajo."
    }
  ];

  const displayCountries = countries || mockCountries;

  // Filtrar países según el término de búsqueda
  const filteredCountries = displayCountries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              Información por País
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-neutral-600 dark:text-neutral-300">
              Explora información específica sobre procedimientos migratorios, requisitos legales, y recursos disponibles en diferentes países.
            </p>
          </div>

          <div className="mb-8 max-w-lg mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar país o información específica..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-10 py-2"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              Error al cargar los datos. Por favor, intenta de nuevo más tarde.
            </div>
          ) : filteredCountries.length === 0 ? (
            <div className="text-center py-12 text-neutral-600 dark:text-neutral-400">
              No se encontraron países que coincidan con tu búsqueda.
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {filteredCountries.map((country) => (
                <motion.div
                  key={country.id}
                  className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  variants={item}
                >
                  <img
                    src={country.imageUrl}
                    alt={`Bandera y paisaje de ${country.name}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-display font-semibold text-xl mb-2 text-neutral-900 dark:text-white">{country.name}</h3>
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
                    <Link
                      href={`/paises/${country.id}`}
                      className="text-primary hover:text-primary-700 dark:hover:text-primary-300 font-medium inline-flex items-center"
                    >
                      Ver información
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
