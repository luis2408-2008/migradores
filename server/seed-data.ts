import { db } from "./db";
import { countries, resourceCategories } from "@shared/schema";

async function seedDatabase() {
  console.log("Iniciando la carga de datos de muestra...");

  try {
    // Comprobar si ya existen países en la base de datos
    const existingCountries = await db.select().from(countries);
    
    if (existingCountries.length === 0) {
      console.log("Insertando países de muestra...");
      
      // Lista de países con banderas e imágenes reales
      const countriesToInsert = [
        {
          name: "España",
          flagUrl: "https://flagicons.lipis.dev/flags/4x3/es.svg",
          imageUrl: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          description: "Información sobre el sistema de asilo español, permisos de residencia y trabajo, homologación de títulos y más."
        },
        {
          name: "Colombia",
          flagUrl: "https://flagicons.lipis.dev/flags/4x3/co.svg",
          imageUrl: "https://images.unsplash.com/photo-1518638150340-f706e86654de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          description: "Guía sobre el Permiso Especial de Permanencia (PEP), acceso a servicios, trámites para migrantes venezolanos y más."
        },
        {
          name: "Chile",
          flagUrl: "https://flagicons.lipis.dev/flags/4x3/cl.svg",
          imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          description: "Información sobre visas de residencia, sistema de salud, educación y programas de apoyo a migrantes."
        },
        {
          name: "México",
          flagUrl: "https://flagicons.lipis.dev/flags/4x3/mx.svg",
          imageUrl: "https://images.unsplash.com/photo-1547995886-6dc09384c6e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          description: "Guía sobre trámites migratorios, programas de integración, opciones de empleo y acceso a servicios públicos."
        },
        {
          name: "Argentina",
          flagUrl: "https://flagicons.lipis.dev/flags/4x3/ar.svg",
          imageUrl: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          description: "Información sobre el proceso de residencia, convalidación de estudios, sistema de salud y derechos laborales."
        },
        {
          name: "Estados Unidos",
          flagUrl: "https://flagicons.lipis.dev/flags/4x3/us.svg",
          imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          description: "Requisitos de visas, procesos de asilo político, recursos para migrantes y comunidades de apoyo."
        }
      ];
      
      // Insertar los países en la base de datos
      await db.insert(countries).values(countriesToInsert);
      console.log(`Se han insertado ${countriesToInsert.length} países en la base de datos.`);
    } else {
      console.log(`Ya existen ${existingCountries.length} países en la base de datos. No se realizarán nuevas inserciones.`);
    }
    
    // Comprobar si ya existen categorías de recursos
    const existingCategories = await db.select().from(resourceCategories);
    
    if (existingCategories.length === 0) {
      console.log("Insertando categorías de recursos...");
      
      const categoriesToInsert = [
        { name: "Legal", icon: "scale", description: "Información sobre visas, permisos, asilo y documentación." },
        { name: "Trabajo", icon: "briefcase", description: "Recursos sobre empleo, derechos laborales y emprendimiento." },
        { name: "Salud", icon: "heart", description: "Guías sobre acceso a servicios médicos y salud mental." },
        { name: "Educación", icon: "graduation-cap", description: "Información sobre estudios, validación de títulos y becas." },
        { name: "Vivienda", icon: "home", description: "Recursos para encontrar alojamiento y conocer tus derechos." },
        { name: "Integración", icon: "users", description: "Información sobre comunidades y programas de adaptación cultural." }
      ];
      
      await db.insert(resourceCategories).values(categoriesToInsert);
      console.log(`Se han insertado ${categoriesToInsert.length} categorías de recursos.`);
    } else {
      console.log(`Ya existen ${existingCategories.length} categorías de recursos. No se realizarán nuevas inserciones.`);
    }
    
    console.log("Carga de datos completada exitosamente.");
    
  } catch (error) {
    console.error("Error al cargar datos de muestra:", error);
  }
}

export { seedDatabase };