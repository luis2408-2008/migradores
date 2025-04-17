import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const contactFormSchema = z.object({
  name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  email: z.string().email({ message: "Ingresa un correo electrónico válido" }),
  subject: z.string().min(1, { message: "Por favor selecciona un tema" }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres" }).max(500, { message: "El mensaje no puede exceder los 500 caracteres" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulando un envío de formulario
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Mensaje enviado",
        description: "¡Gracias por tu mensaje! Te responderemos lo antes posible.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error al enviar",
        description: "Hubo un problema al enviar tu mensaje. Por favor intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre completo</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Tu nombre completo" 
                  {...field} 
                  className="px-4 py-2 rounded-md border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-600 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                />
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
                <Input 
                  type="email" 
                  placeholder="tu@correo.com" 
                  {...field} 
                  className="px-4 py-2 rounded-md border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-600 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                />
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
                  <SelectTrigger className="px-4 py-2 rounded-md border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-600 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200">
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
                  {...field} 
                  rows={4}
                  className="px-4 py-2 rounded-md border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-600 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar mensaje"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
