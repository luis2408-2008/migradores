import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleHelp, BookOpen, GraduationCap, Landmark, Heart, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function HelpSection() {
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
    <section id="recursos" className="py-16 px-4 bg-gray-50 dark:bg-neutral-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-neutral-900 dark:text-white">
            Recursos Útiles
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-600 dark:text-neutral-300">
            Información recopilada para facilitar tu proceso migratorio. Estas son guías informativas que pueden servirte de referencia.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div 
            className="bg-white dark:bg-neutral-700 rounded-lg shadow-md p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            variants={item}
          >
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-800 dark:text-purple-300 mb-4">
              <CircleHelp className="h-8 w-8" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2 text-neutral-900 dark:text-white">Preguntas Frecuentes</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mb-4">
              Respuestas a consultas comunes sobre trámites migratorios, documentación necesaria y procesos legales.
            </p>
            <Button variant="link" className="text-primary hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium inline-flex items-center justify-center">
              Ver información
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Button>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-neutral-700 rounded-lg shadow-md p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            variants={item}
          >
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300 mb-4">
              <BookOpen className="h-8 w-8" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2 text-neutral-900 dark:text-white">Guías de Procedimientos</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mb-4">
              Información detallada sobre procedimientos legales, solicitud de asilo y regularización en diferentes países.
            </p>
            <Button variant="link" className="text-primary hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium inline-flex items-center justify-center">
              Ver guías
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Button>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-neutral-700 rounded-lg shadow-md p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            variants={item}
          >
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300 mb-4">
              <Landmark className="h-8 w-8" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2 text-neutral-900 dark:text-white">Recursos Legales</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mb-4">
              Enlaces a leyes, regulaciones y documentos oficiales sobre derechos y obligaciones de los migrantes.
            </p>
            <Button variant="link" className="text-primary hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium inline-flex items-center justify-center">
              Ver recursos
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Tarjetas de recursos adicionales */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-800 dark:text-amber-300">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <CardTitle>Educación y Formación</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                Información sobre validación de títulos académicos, cursos gratuitos de idiomas y 
                oportunidades educativas para migrantes en distintos países. Incluye enlaces a 
                plataformas de aprendizaje y recursos educativos abiertos.
              </p>
              <Button variant="outline" className="mt-2">Explorar recursos educativos</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300">
                  <Heart className="h-6 w-6" />
                </div>
                <CardTitle>Salud y Bienestar</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                Guías sobre acceso a sistemas de salud, atención médica de emergencia y apoyo 
                psicológico. Esta sección incluye información sobre derechos sanitarios y
                recursos de autoayuda para el cuidado integral de la salud física y mental.
              </p>
              <Button variant="outline" className="mt-2">Ver guías de salud</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}