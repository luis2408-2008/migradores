import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Scale3d, Briefcase, Heart } from "lucide-react";

export default function HeroSection() {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } },
  };

  const staggerCards = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.6,
      },
    },
  };

  const cardItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="inicio" className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-800 dark:to-primary-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-8 md:mb-0"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 leading-tight">
              Navegando juntos hacia un nuevo comienzo
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-6">
              Información, recursos y apoyo para migrantes que buscan un mejor futuro.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button asChild size="lg" variant="default" className="bg-white text-primary-700 hover:bg-gray-100">
                <Link href="/paises">
                  Explorar por país
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-primary-400 bg-opacity-30 hover:bg-opacity-40 text-white border-white">
                <Link href="/recursos">
                  Ver recursos
                </Link>
              </Button>
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/2"
            initial="hidden"
            animate="visible"
            variants={slideUp}
          >
            <img 
              src="https://images.unsplash.com/photo-1531983412531-1f49a365ffed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
              alt="Diversas personas caminando juntas simbolizando el viaje migratorio" 
              className="rounded-lg shadow-xl w-full h-auto max-w-md mx-auto"
            />
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerCards}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={cardItem} className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg">
            <div className="text-amber-300 mb-3">
              <Scale3d className="h-8 w-8" />
            </div>
            <h3 className="font-display font-semibold text-xl mb-2">Información Legal</h3>
            <p className="text-white text-opacity-80">
              Procedimientos de asilo, visas, reunificación familiar y requisitos legales actualizados.
            </p>
          </motion.div>
          
          <motion.div variants={cardItem} className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg">
            <div className="text-amber-300 mb-3">
              <Briefcase className="h-8 w-8" />
            </div>
            <h3 className="font-display font-semibold text-xl mb-2">Oportunidades Laborales</h3>
            <p className="text-white text-opacity-80">
              Sectores con demanda, cursos de formación, homologación de títulos y derechos laborales.
            </p>
          </motion.div>
          
          <motion.div variants={cardItem} className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg">
            <div className="text-amber-300 mb-3">
              <Heart className="h-8 w-8" />
            </div>
            <h3 className="font-display font-semibold text-xl mb-2">Salud y Bienestar</h3>
            <p className="text-white text-opacity-80">
              Acceso a servicios médicos, salud mental, vacunaciones y atención de emergencia.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
