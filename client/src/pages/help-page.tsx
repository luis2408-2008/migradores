import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { HelpCircle, MessageSquare, Mail, MapPin, Phone, RectangleEllipsis, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

// Esquema para el formulario de contacto
const contactFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un correo electrónico válido"),
  subject: z.string().min(1, "Selecciona un tema"),
  message: z.string().min(10, "Tu mensaje debe tener al menos 10 caracteres"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function HelpPage() {
  const { toast } = useToast();
  
  // Configuración del formulario con React Hook Form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Mutación para enviar mensaje de contacto
  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Mensaje enviado",
        description: "Hemos recibido tu mensaje. Te responderemos a la brevedad.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error al enviar mensaje",
        description: error.message || "Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  // Manejar envío del formulario
  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data);
  };

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
      <main className="flex-grow pt-24">
        <section id="ayuda" className="py-16 px-4 bg-gray-50 dark:bg-neutral-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 text-neutral-900 dark:text-white">
                ¿Necesitas Ayuda?
              </h1>
              <p className="max-w-2xl mx-auto text-neutral-600 dark:text-neutral-300">
                Estamos aquí para ayudarte. Encuentra respuestas a tus preguntas o contacta con nuestro equipo.
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
                  <HelpCircle className="h-8 w-8" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 text-neutral-900 dark:text-white">Preguntas Frecuentes</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Encuentra respuestas a las dudas más comunes sobre migración, trámites y servicios.
                </p>
                <Button variant="link" className="text-primary hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium inline-flex items-center justify-center">
                  Ver FAQ
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Button>
              </motion.div>
              
              <motion.div 
                className="bg-white dark:bg-neutral-700 rounded-lg shadow-md p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                variants={item}
              >
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300 mb-4">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 text-neutral-900 dark:text-white">Chat de Soporte</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Conversa con nuestros asesores en línea para obtener ayuda inmediata sobre tus inquietudes.
                </p>
                <Button variant="link" className="text-primary hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium inline-flex items-center justify-center">
                  Iniciar chat
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Button>
              </motion.div>
              
              <motion.div 
                className="bg-white dark:bg-neutral-700 rounded-lg shadow-md p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                variants={item}
              >
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300 mb-4">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 text-neutral-900 dark:text-white">Contacto Directo</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Envíanos tus consultas específicas y nos pondremos en contacto contigo lo antes posible.
                </p>
                <Button variant="link" className="text-primary hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium inline-flex items-center justify-center">
                  Contactar
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Formulario de contacto */}
            <motion.div 
              className="bg-white dark:bg-neutral-700 rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="md:flex">
                <div className="md:w-1/2 p-6 md:p-8">
                  <h3 className="font-display font-semibold text-xl mb-4 text-neutral-900 dark:text-white">
                    Envíanos un mensaje
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                    Completa este formulario y nuestro equipo te responderá a la brevedad posible.
                  </p>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre completo</FormLabel>
                            <FormControl>
                              <Input placeholder="Tu nombre completo" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Correo electrónico</FormLabel>
                            <FormControl>
                              <Input placeholder="tu@correo.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Asunto</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecciona un tema" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="legal">Asesoría legal</SelectItem>
                                <SelectItem value="work">Empleo y trabajo</SelectItem>
                                <SelectItem value="health">Salud y bienestar</SelectItem>
                                <SelectItem value="education">Educación</SelectItem>
                                <SelectItem value="housing">Vivienda</SelectItem>
                                <SelectItem value="other">Otro tema</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mensaje</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="¿En qué podemos ayudarte?" 
                                className="resize-none" 
                                rows={4}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={contactMutation.isPending}
                      >
                        {contactMutation.isPending ? "Enviando..." : "Enviar mensaje"}
                      </Button>
                    </form>
                  </Form>
                </div>
                
                <div className="md:w-1/2 bg-primary-600 dark:bg-primary-800 p-6 md:p-8 text-white">
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
                          +34 912 456 789 (España)<br/>
                          +57 601 234 5678 (Colombia)
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-md bg-white bg-opacity-20 flex items-center justify-center">
                        <RectangleEllipsis className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-base font-medium">Correo electrónico</h4>
                        <p className="mt-1 text-sm opacity-90">
                          info@migraguia.org<br/>
                          ayuda@migraguia.org
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-base font-medium mb-3">Síguenos en redes sociales</h4>
                    <div className="flex space-x-4">
                      <a href="#" className="h-10 w-10 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-colors duration-200" aria-label="Facebook">
                        <Facebook className="h-5 w-5" />
                      </a>
                      <a href="#" className="h-10 w-10 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-colors duration-200" aria-label="Twitter">
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a href="#" className="h-10 w-10 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-colors duration-200" aria-label="Instagram">
                        <Instagram className="h-5 w-5" />
                      </a>
                      <a href="#" className="h-10 w-10 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-colors duration-200" aria-label="Youtube">
                        <Youtube className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Sección de preguntas frecuentes */}
            <div className="mt-16">
              <h2 className="text-2xl font-display font-semibold mb-8 text-neutral-900 dark:text-white text-center">
                Preguntas Frecuentes
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white dark:bg-neutral-700 rounded-lg p-6 shadow-md">
                    <h3 className="font-display font-semibold text-lg mb-2 text-neutral-900 dark:text-white">
                      ¿Cómo solicito asilo en un país extranjero?
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      El proceso de solicitud de asilo varía según el país, pero generalmente debes presentarte ante las autoridades migratorias y expresar tu temor de regresar a tu país de origen. Se recomienda buscar asesoría legal especializada antes de iniciar el proceso.
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-neutral-700 rounded-lg p-6 shadow-md">
                    <h3 className="font-display font-semibold text-lg mb-2 text-neutral-900 dark:text-white">
                      ¿Qué documentos necesito para homologar mi título universitario?
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      Generalmente necesitarás: título original legalizado/apostillado, certificado de notas, plan de estudios, documento de identidad y, en algunos casos, traducciones oficiales. Los requisitos específicos dependen del país de destino y la profesión.
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-neutral-700 rounded-lg p-6 shadow-md">
                    <h3 className="font-display font-semibold text-lg mb-2 text-neutral-900 dark:text-white">
                      ¿Puedo acceder a servicios de salud como migrante irregular?
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      En muchos países, las personas migrantes en situación irregular tienen derecho a atención médica de emergencia. Algunos países ofrecen servicios adicionales. Consulta en centros de salud comunitarios u ONGs que brindan atención independientemente del estatus migratorio.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white dark:bg-neutral-700 rounded-lg p-6 shadow-md">
                    <h3 className="font-display font-semibold text-lg mb-2 text-neutral-900 dark:text-white">
                      ¿Cómo puedo regularizar mi situación migratoria?
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      Las vías para regularizar tu situación dependen del país donde te encuentres. Opciones comunes incluyen: solicitud de asilo, permisos por arraigo, reunificación familiar, ofertas de trabajo, estudios o programas especiales de regularización. Consulta con las autoridades migratorias o asesores legales.
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-neutral-700 rounded-lg p-6 shadow-md">
                    <h3 className="font-display font-semibold text-lg mb-2 text-neutral-900 dark:text-white">
                      ¿Mis hijos pueden acceder a educación pública?
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      En la mayoría de los países, los niños y adolescentes tienen derecho a la educación independientemente de su estatus migratorio. La Convención sobre los Derechos del Niño garantiza este derecho. Acércate a las instituciones educativas locales para conocer el proceso de inscripción.
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-neutral-700 rounded-lg p-6 shadow-md">
                    <h3 className="font-display font-semibold text-lg mb-2 text-neutral-900 dark:text-white">
                      ¿Dónde puedo encontrar ayuda legal gratuita?
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      Puedes buscar asistencia en ONGs especializadas en migración, consultorios jurídicos de universidades, servicios públicos de orientación legal, organizaciones religiosas y asociaciones de migrantes. En nuestra sección de recursos encontrarás un directorio por país.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 text-center">
                <Button>Ver todas las preguntas frecuentes</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
