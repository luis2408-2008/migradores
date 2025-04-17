import { motion } from "framer-motion";
import { useState } from "react";
import ContactForm from "@/components/forms/contact-form";
import {
  CircleHelp,
  MessageSquare,
  Mail,
  MapPin,
  Phone,
  Globe,
} from "lucide-react";

const HelpSection = () => {
  return (
    <section
      id="ayuda"
      className="py-16 px-4 bg-gray-50 dark:bg-neutral-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-neutral-900 dark:text-white">
            ¿Necesitas Ayuda?
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-600 dark:text-neutral-300">
            Estamos aquí para ayudarte. Encuentra respuestas a tus preguntas o contacta con nuestro equipo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div
            className="bg-white dark:bg-neutral-700 rounded-lg shadow-md p-6 text-center transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-800 dark:text-purple-300 mb-4">
              <CircleHelp className="h-8 w-8" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2 text-neutral-900 dark:text-white">Preguntas Frecuentes</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mb-4">
              Encuentra respuestas a las dudas más comunes sobre migración, trámites y servicios.
            </p>
            <a href="/faq" className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium inline-flex items-center justify-center">
              Ver FAQ
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

          <motion.div
            className="bg-white dark:bg-neutral-700 rounded-lg shadow-md p-6 text-center transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300 mb-4">
              <MessageSquare className="h-8 w-8" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2 text-neutral-900 dark:text-white">Chat de Soporte</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mb-4">
              Conversa con nuestros asesores en línea para obtener ayuda inmediata sobre tus inquietudes.
            </p>
            <a href="/chat" className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium inline-flex items-center justify-center">
              Iniciar chat
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

          <motion.div
            className="bg-white dark:bg-neutral-700 rounded-lg shadow-md p-6 text-center transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300 mb-4">
              <Mail className="h-8 w-8" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2 text-neutral-900 dark:text-white">Contacto Directo</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mb-4">
              Envíanos tus consultas específicas y nos pondremos en contacto contigo lo antes posible.
            </p>
            <a href="#contactForm" className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium inline-flex items-center justify-center">
              Contactar
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
        </div>

        {/* Formulario de contacto */}
        <motion.div
          id="contactForm"
          className="bg-white dark:bg-neutral-700 rounded-xl shadow-md overflow-hidden transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="md:flex">
            <div className="md:w-1/2 p-6 md:p-8">
              <h3 className="font-display font-semibold text-xl mb-4 text-neutral-900 dark:text-white">
                Envíanos un mensaje
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                Completa este formulario y nuestro equipo te responderá a la brevedad posible.
              </p>

              <ContactForm />
            </div>

            <div className="md:w-1/2 bg-primary-600 dark:bg-primary-800 p-6 md:p-8 text-white transition-colors duration-300">
              <h3 className="font-display font-semibold text-xl mb-4">
                Conecta con nosotros
              </h3>
              <p className="opacity-90 mb-6">
                Nuestro equipo está disponible para ayudarte en tu proceso migratorio y responder todas tus dudas.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-white bg-opacity-20 flex items-center justify-center">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-base font-medium">Oficina principal</h4>
                    <p className="mt-1 text-sm opacity-90">
                      Calle Gran Vía 28, 28013 Madrid, España
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-white bg-opacity-20 flex items-center justify-center">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-base font-medium">Teléfono</h4>
                    <p className="mt-1 text-sm opacity-90">
                      +34 912 456 789 (España)<br />
                      +57 601 234 5678 (Colombia)
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-white bg-opacity-20 flex items-center justify-center">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-base font-medium">Correo electrónico</h4>
                    <p className="mt-1 text-sm opacity-90">
                      info@migraguia.org<br />
                      ayuda@migraguia.org
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-base font-medium mb-3">Síguenos en redes sociales</h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-colors duration-200"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-colors duration-200"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-colors duration-200"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a 
                    href="https://youtube.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-colors duration-200"
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HelpSection;
