import { Link } from "wouter";
import { Compass, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-primary-400 mr-2">
                <Compass className="h-6 w-6" />
              </span>
              <span className="font-display font-bold text-xl">MigraGuía</span>
            </div>
            <p className="text-neutral-400 mb-4">
              Acompañando a migrantes en su camino hacia un mejor futuro, proporcionando información confiable y actualizada.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Guías por país</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Documentación legal</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Oportunidades laborales</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Servicios de salud</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Educación y formación</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Comunidad</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Foro de discusión</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Historias de migrantes</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Eventos y talleres</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Voluntariado</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Organizaciones aliadas</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Información legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Términos y condiciones</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Política de privacidad</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Aviso legal</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Cookies</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Contacto</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-neutral-800 text-center">
          <p className="text-neutral-500">
            © {new Date().getFullYear()} MigraGuía. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
