import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Country } from "@shared/schema";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ArrowRight, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function CountriesSearchPage() {
  const [location, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Obtener todos los países de la API
  const { data: countries = [], isLoading } = useQuery<Country[]>({
    queryKey: ["/api/countries"],
  });

  // Países más buscados para mostrar como alternativa
  const popularCountries = [
    "España", "México", "Colombia", "Chile", 
    "Argentina", "Estados Unidos", "Canadá", "Alemania",
    "Francia", "Italia", "Perú", "Ecuador"
  ];

  // Filtrar países según el término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCountries([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const searchResults = countries.filter(country => 
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredCountries(searchResults);
  }, [searchTerm, countries]);

  // Función para manejar la búsqueda
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Actualizar la URL con el término de búsqueda
    if (searchTerm.trim()) {
      setLocation(`/paises/buscar?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Manejar resultado vacío - Mostrar países populares como alternativa
  const handleEmptyResults = () => {
    // Filtramos los países reales que coinciden con los nombres populares
    const suggestedCountries = countries.filter(country => 
      popularCountries.includes(country.name)
    );
    
    // Si no hay suficientes países en la base de datos, mostrar al menos los que tenemos
    return suggestedCountries.length > 0 ? suggestedCountries : countries;
  };

  // Los países a mostrar: resultados de búsqueda o alternativas
  const countriesToDisplay = (filteredCountries.length > 0 || !isSearching) 
    ? filteredCountries 
    : handleEmptyResults();

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
      
      <main className="flex-grow bg-gray-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 text-neutral-900 dark:text-white">
              Buscar Información por País
            </h1>
            <p className="max-w-2xl mx-auto text-neutral-600 dark:text-neutral-300">
              Encuentra guías, recursos y datos específicos para el país que te interesa.
            </p>
          </div>
          
          {/* Formulario de búsqueda */}
          <div className="max-w-2xl mx-auto mb-12">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <Input
                  type="text"
                  placeholder="Nombre del país (España, Colombia, Chile...)"
                  className="pl-10 h-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button type="submit" className="h-12 px-6">Buscar</Button>
            </form>
          </div>
          
          {/* Área de resultados */}
          <div className="mb-8">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                <p className="mt-4 text-neutral-600 dark:text-neutral-300">Cargando países...</p>
              </div>
            ) : (
              <>
                {/* Encabezado de resultados */}
                <div className="mb-6">
                  {isSearching && (
                    <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                      {filteredCountries.length > 0
                        ? `Resultados para "${searchTerm}"`
                        : `No se encontraron países que coincidan con "${searchTerm}"`}
                    </h2>
                  )}
                  
                  {isSearching && filteredCountries.length === 0 && (
                    <p className="text-neutral-600 dark:text-neutral-300 mb-8">
                      Te mostramos algunos de los países más consultados:
                    </p>
                  )}
                </div>
                
                {/* Cuadrícula de países */}
                {countriesToDisplay.length > 0 ? (
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={container}
                    initial="hidden"
                    animate="visible"
                  >
                    {countriesToDisplay.map((country) => (
                      <motion.div
                        key={country.id}
                        className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
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
                            <h3 className="font-display font-semibold text-xl text-neutral-900 dark:text-white">
                              {country.name}
                            </h3>
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
                ) : (
                  <div className="text-center py-12">
                    <Globe className="mx-auto h-16 w-16 text-neutral-300 dark:text-neutral-600 mb-4" />
                    <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
                      No hay países disponibles
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Por favor, inténtalo de nuevo más tarde o contacta con el administrador.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}