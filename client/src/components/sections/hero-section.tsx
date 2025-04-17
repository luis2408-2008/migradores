import { motion } from "framer-motion";
import { Link } from "wouter";
import { Scale, Briefcase, Heart } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-800 dark:to-primary-900 text-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 mb-8 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 leading-tight">
              Navegando juntos hacia un nuevo comienzo
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-6">
              Información, recursos y apoyo para migrantes que buscan un mejor futuro.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <a
                href="#paises"
                className="bg-white text-primary-700 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-center"
              >
                Explorar por país
              </a>
              <a
                href="#recursos"
                className="bg-primary-400 bg-opacity-30 hover:bg-opacity-40 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-center"
              >
                Ver recursos
              </a>
            </div>
          </motion.div>
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1531983412531-1f49a365ffed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              alt="Diversas personas caminando juntas simbolizando el viaje migratorio"
              className="rounded-lg shadow-xl w-full h-auto max-w-md mx-auto"
            />
          </motion.div>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="text-secondary-300 mb-3">
              <Scale className="h-8 w-8" />
            </div>
            <h3 className="font-display font-semibold text-xl mb-2">Información Legal</h3>
            <p className="text-white text-opacity-80">
              Procedimientos de asilo, visas, reunificación familiar y requisitos legales actualizados.
            </p>
          </motion.div>

          <motion.div
            className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="text-secondary-300 mb-3">
              <Briefcase className="h-8 w-8" />
            </div>
            <h3 className="font-display font-semibold text-xl mb-2">Oportunidades Laborales</h3>
            <p className="text-white text-opacity-80">
              Sectores con demanda, cursos de formación, homologación de títulos y derechos laborales.
            </p>
          </motion.div>

          <motion.div
            className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="text-secondary-300 mb-3">
              <Heart className="h-8 w-8" />
            </div>
            <h3 className="font-display font-semibold text-xl mb-2">Salud y Bienestar</h3>
            <p className="text-white text-opacity-80">
              Acceso a servicios médicos, salud mental, vacunaciones y atención de emergencia.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
