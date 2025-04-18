import { db } from "./db";
import { countries, resourceCategories, resources } from "@shared/schema";

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
    
    // Comprobar si ya existen recursos
    const existingResources = await db.select().from(resources);
    
    if (existingResources.length === 0) {
      console.log("Insertando recursos específicos por país y categoría...");
      
      // Obtener IDs de países y categorías
      const allCountries = await db.select().from(countries);
      const allCategories = await db.select().from(resourceCategories);
      
      // Mapas para búsqueda rápida
      const countryMap = new Map(allCountries.map(c => [c.name, c.id]));
      const categoryMap = new Map(allCategories.map(c => [c.name, c.id]));
      
      // Recursos específicos por país y categoría
      const resourcesToInsert = [
        // ESPAÑA - LEGAL
        {
          title: "Sistema de asilo en España",
          description: "Información completa sobre el proceso de solicitud de asilo y protección internacional en España.",
          content: `<h3>Solicitud de Asilo en España</h3>
          <p>El derecho de asilo está reconocido en el artículo 13.4 de la Constitución Española. La Ley 12/2009 regula el derecho de asilo y la protección subsidiaria.</p>
          <h4>Pasos para solicitar asilo:</h4>
          <ol>
            <li><strong>Manifestar la voluntad</strong>: Puede hacerse en frontera, CIE, Oficina de Asilo y Refugio (OAR), comisarías de policía autorizadas o embajadas españolas.</li>
            <li><strong>Formalización de la solicitud</strong>: Se realiza mediante entrevista personal donde se explican los motivos de persecución.</li>
            <li><strong>Documentación provisional</strong>: Tras la admisión a trámite, se entrega un documento que acredita la condición de solicitante.</li>
            <li><strong>Resolución</strong>: El plazo legal es de 6 meses, aunque suele extenderse. La resolución puede ser favorable (estatuto de refugiado o protección subsidiaria) o desfavorable.</li>
          </ol>
          <h4>Derechos del solicitante:</h4>
          <ul>
            <li>No ser devuelto al país de origen mientras se tramita la solicitud</li>
            <li>Asistencia jurídica gratuita e intérprete</li>
            <li>Atención sanitaria</li>
            <li>Autorización de trabajo a los 6 meses desde la solicitud</li>
          </ul>
          <p>Para más información, consulta la <a href="https://www.inclusion.gob.es/es/sede_electronica_menu/index.htm" target="_blank">web del Ministerio de Inclusión</a> o acude a organizaciones como ACNUR o CEAR.</p>`,
          categoryId: categoryMap.get("Legal")!,
          countryId: countryMap.get("España")!
        },
        
        // ESPAÑA - TRABAJO
        {
          title: "Oportunidades laborales para migrantes en España",
          description: "Guía sobre permisos de trabajo, búsqueda de empleo y derechos laborales para extranjeros.",
          content: `<h3>Trabajo para Migrantes en España</h3>
          <p>El acceso al mercado laboral español depende de tu situación legal. Aquí encontrarás información esencial:</p>
          
          <h4>Tipos de autorizaciones de trabajo:</h4>
          <ul>
            <li><strong>Autorización inicial</strong>: Duración de 1 año, limitada a una ocupación y área geográfica.</li>
            <li><strong>Primera renovación</strong>: Duración de 2 años, sin restricciones de actividad ni ámbito.</li>
            <li><strong>Segunda renovación</strong>: Duración de 2 años más.</li>
            <li><strong>Residencia de larga duración</strong>: Tras 5 años de residencia legal.</li>
          </ul>
          
          <h4>Búsqueda de empleo:</h4>
          <ul>
            <li><strong>Servicio Público de Empleo Estatal (SEPE)</strong>: Regístrate como demandante de empleo.</li>
            <li><strong>Portales de empleo</strong>: InfoJobs, LinkedIn, Indeed, Adecco, etc.</li>
            <li><strong>Redes de apoyo</strong>: ONGs como Red Acoge, Fundación CEPAIM o Cáritas ofrecen orientación laboral.</li>
          </ul>
          
          <h4>Derechos laborales:</h4>
          <p>En España, todos los trabajadores, independientemente de su nacionalidad, tienen los mismos derechos laborales:</p>
          <ul>
            <li>Salario mínimo interprofesional (SMI): 1.080€ mensuales en 2023</li>
            <li>Jornada máxima de 40 horas semanales</li>
            <li>30 días naturales de vacaciones al año</li>
            <li>Protección frente a riesgos laborales</li>
            <li>Afiliación sindical</li>
          </ul>
          
          <p>Para denunciar abusos laborales, contacta con la <a href="https://www.mites.gob.es/itss/web/index.html" target="_blank">Inspección de Trabajo</a> o sindicatos como CCOO o UGT.</p>`,
          categoryId: categoryMap.get("Trabajo")!,
          countryId: countryMap.get("España")!
        },
        
        // ESPAÑA - SALUD
        {
          title: "Sistema sanitario español para migrantes",
          description: "Información sobre el acceso al sistema de salud público, tarjeta sanitaria y servicios disponibles.",
          content: `<h3>Acceso a la Sanidad Pública en España</h3>
          <p>España cuenta con un Sistema Nacional de Salud (SNS) de cobertura universal. Desde el RDL 7/2018, se garantiza el acceso a la sanidad pública a todas las personas extranjeras, independientemente de su situación administrativa.</p>
          
          <h4>¿Cómo obtener la tarjeta sanitaria?</h4>
          <ol>
            <li><strong>Empadronamiento</strong>: Necesitas estar empadronado en el municipio donde resides.</li>
            <li><strong>Centro de salud</strong>: Acude al centro de salud que te corresponda según tu domicilio.</li>
            <li><strong>Documentación</strong>: Presenta tu documento de identidad (pasaporte), certificado de empadronamiento y, si lo tienes, permiso de residencia.</li>
          </ol>
          
          <h4>Servicios cubiertos:</h4>
          <ul>
            <li>Atención primaria (médico de familia, pediatría)</li>
            <li>Atención especializada</li>
            <li>Atención de urgencias</li>
            <li>Prestación farmacéutica (con copago según situación)</li>
            <li>Atención a embarazadas, parto y postparto</li>
            <li>Atención a menores</li>
          </ul>
          
          <h4>Situaciones especiales:</h4>
          <ul>
            <li><strong>Situación irregular</strong>: Derecho a atención sanitaria básica tras 90 días en España.</li>
            <li><strong>Solicitantes de asilo</strong>: Acceso completo desde el momento de la solicitud.</li>
            <li><strong>Menores y embarazadas</strong>: Atención sin restricciones en cualquier situación.</li>
          </ul>
          
          <p>Si te deniegan la asistencia sanitaria, organizaciones como Médicos del Mundo o SOS Racismo pueden orientarte y ayudarte a reclamar tus derechos.</p>`,
          categoryId: categoryMap.get("Salud")!,
          countryId: countryMap.get("España")!
        },
        
        // COLOMBIA - LEGAL
        {
          title: "Permisos migratorios en Colombia",
          description: "Información sobre el Permiso Especial de Permanencia (PEP), visas y otros trámites para migrantes.",
          content: `<h3>Sistema Migratorio Colombiano</h3>
          <p>Colombia ha implementado diferentes mecanismos para regularizar a la población migrante, especialmente a ciudadanos venezolanos:</p>
          
          <h4>Estatuto Temporal de Protección para Migrantes Venezolanos (ETPV):</h4>
          <p>Vigente desde 2021, permite la regularización y la integración de ciudadanos venezolanos. Consta de:</p>
          <ul>
            <li><strong>Registro Único de Migrantes Venezolanos (RUMV)</strong>: Inscripción en línea obligatoria.</li>
            <li><strong>Permiso por Protección Temporal (PPT)</strong>: Documento que permite trabajar, estudiar y acceder a servicios por 10 años.</li>
          </ul>
          
          <h4>Tipos de visas:</h4>
          <ul>
            <li><strong>Visa de Visitante (V)</strong>: Para estancias cortas, turismo, actividades culturales o negocios.</li>
            <li><strong>Visa de Migrante (M)</strong>: Para quienes desean establecerse temporalmente (cónyuges de colombianos, estudiantes, trabajadores).</li>
            <li><strong>Visa de Residente (R)</strong>: Para establecerse permanentemente (inversores, familiares de colombianos, pensionados).</li>
          </ul>
          
          <h4>Otros permisos:</h4>
          <ul>
            <li><strong>Permiso de Ingreso y Permanencia (PIP)</strong>: Para estancias cortas sin visa.</li>
            <li><strong>Permiso Temporal de Permanencia (PTP)</strong>: Prórroga del PIP.</li>
            <li><strong>Salvoconducto</strong>: Documento temporal mientras se resuelve una solicitud de visa o asilo.</li>
          </ul>
          
          <p>Los trámites se realizan a través de <a href="https://www.migracioncolombia.gov.co" target="_blank">Migración Colombia</a> o del <a href="https://www.cancilleria.gov.co" target="_blank">Ministerio de Relaciones Exteriores</a>.</p>`,
          categoryId: categoryMap.get("Legal")!,
          countryId: countryMap.get("Colombia")!
        },
        
        // COLOMBIA - SALUD
        {
          title: "Acceso a servicios de salud en Colombia para migrantes",
          description: "Guía sobre el sistema de salud colombiano y cómo acceder a sus servicios siendo extranjero.",
          content: `<h3>Sistema de Salud para Migrantes en Colombia</h3>
          <p>El sistema de salud colombiano funciona a través del Sistema General de Seguridad Social en Salud (SGSSS) con dos regímenes principales:</p>
          
          <h4>Acceso al sistema de salud:</h4>
          <ul>
            <li><strong>Régimen Contributivo</strong>: Para quienes tienen capacidad de pago (empleados, independientes).</li>
            <li><strong>Régimen Subsidiado</strong>: Para población vulnerable sin capacidad de pago.</li>
          </ul>
          
          <h4>Requisitos para migrantes:</h4>
          <ol>
            <li><strong>Regularización</strong>: Contar con un documento válido (PPT, visa, etc.).</li>
            <li><strong>Afiliación</strong>: Inscribirse en una Entidad Promotora de Salud (EPS).</li>
            <li><strong>Documentación</strong>: Documento de identidad, comprobante de domicilio.</li>
          </ol>
          
          <h4>Servicios para migrantes en situación irregular:</h4>
          <ul>
            <li><strong>Atención de urgencias</strong>: Garantizada a todas las personas.</li>
            <li><strong>Atención a gestantes</strong>: Control prenatal, parto y posparto.</li>
            <li><strong>Vacunación</strong>: Acceso al Plan Ampliado de Inmunizaciones (PAI).</li>
          </ul>
          
          <h4>Organizaciones de apoyo:</h4>
          <ul>
            <li>Cruz Roja Colombiana</li>
            <li>Médicos Sin Fronteras</li>
            <li>ACNUR y OIM operan puntos de atención para migrantes vulnerables</li>
          </ul>
          
          <p>Para más información, consulta la web del <a href="https://www.minsalud.gov.co" target="_blank">Ministerio de Salud</a> o acude a las Secretarías de Salud municipales o departamentales.</p>`,
          categoryId: categoryMap.get("Salud")!,
          countryId: countryMap.get("Colombia")!
        },
        
        // ARGENTINA - EDUCACIÓN
        {
          title: "Sistema educativo argentino para migrantes",
          description: "Información sobre acceso a educación primaria, secundaria y universitaria para extranjeros en Argentina.",
          content: `<h3>Educación para Migrantes en Argentina</h3>
          <p>Argentina garantiza el acceso a la educación pública y gratuita a todas las personas, independientemente de su condición migratoria, según la Ley de Migraciones N° 25.871 y la Ley de Educación Nacional N° 26.206.</p>
          
          <h4>Niveles educativos:</h4>
          <ul>
            <li><strong>Inicial</strong>: De 45 días a 5 años. Obligatorio desde los 4 años.</li>
            <li><strong>Primaria</strong>: 6/7 años de duración, obligatoria.</li>
            <li><strong>Secundaria</strong>: 5/6 años de duración, obligatoria.</li>
            <li><strong>Superior</strong>: Universitaria y no universitaria. Gratuita en instituciones públicas.</li>
          </ul>
          
          <h4>Inscripción de menores extranjeros:</h4>
          <ol>
            <li><strong>Documentación</strong>: Partida de nacimiento, documento de identidad, certificados de estudios previos.</li>
            <li><strong>Convalidación</strong>: Los estudios primarios y secundarios pueden convalidarse siguiendo el procedimiento establecido por el Ministerio de Educación.</li>
            <li><strong>Inscripción provisional</strong>: Si no se cuenta con toda la documentación, se permite la inscripción provisoria hasta regularizar la situación.</li>
          </ol>
          
          <h4>Educación universitaria:</h4>
          <ul>
            <li><strong>Documentación</strong>: DNI argentino o certificado de residencia en trámite, título secundario convalidado.</li>
            <li><strong>Convalidación de títulos</strong>: Trámite ante el Ministerio de Educación para títulos de nivel secundario y superior.</li>
            <li><strong>Universidades públicas</strong>: Gratuitas para residentes, algunas cobran aranceles diferenciales a extranjeros no residentes.</li>
          </ul>
          
          <h4>Apoyo para estudiantes migrantes:</h4>
          <ul>
            <li>Clases de español para no hispanohablantes</li>
            <li>Programas de integración multicultural</li>
            <li>Becas específicas para población migrante</li>
          </ul>
          
          <p>Para más información, visita el <a href="https://www.argentina.gob.ar/educacion" target="_blank">Ministerio de Educación</a> o las secretarías de educación provinciales.</p>`,
          categoryId: categoryMap.get("Educación")!,
          countryId: countryMap.get("Argentina")!
        },
        
        // MÉXICO - VIVIENDA
        {
          title: "Opciones de vivienda para migrantes en México",
          description: "Guía para encontrar alojamiento, comprender el mercado inmobiliario y conocer tus derechos como inquilino extranjero.",
          content: `<h3>Vivienda para Migrantes en México</h3>
          <p>Encontrar un lugar para vivir es uno de los primeros pasos al llegar a México. Aquí te presentamos información útil para diferentes situaciones:</p>
          
          <h4>Opciones de alojamiento temporal:</h4>
          <ul>
            <li><strong>Albergues para migrantes</strong>: Operados por organizaciones religiosas y civiles. Ofrecen estancia limitada.</li>
            <li><strong>Hostales y pensiones</strong>: Opción económica para estancias cortas.</li>
            <li><strong>Airbnb y plataformas similares</strong>: Buena opción inicial mientras te estableces.</li>
          </ul>
          
          <h4>Renta de vivienda:</h4>
          <p>Para arrendar una vivienda a largo plazo generalmente se requiere:</p>
          <ul>
            <li><strong>Documentación</strong>: Identificación oficial, comprobantes de ingresos, referencias.</li>
            <li><strong>Depósito</strong>: Habitualmente equivalente a un mes de renta.</li>
            <li><strong>Fiador o aval</strong>: Persona con propiedad en México que respalde el contrato.</li>
            <li><strong>Alternativas al fiador</strong>: Pólizas de fianza, depósitos mayores, pago adelantado.</li>
          </ul>
          
          <h4>Zonas recomendadas según presupuesto:</h4>
          <p>Los precios varían enormemente según la ciudad y la zona:</p>
          <ul>
            <li><strong>Ciudad de México</strong>: Desde $3,000 MXN en zonas periféricas hasta $15,000+ MXN en zonas céntricas o exclusivas.</li>
            <li><strong>Guadalajara</strong>: Desde $2,500 MXN en zonas populares hasta $10,000+ MXN en zonas residenciales.</li>
            <li><strong>Monterrey</strong>: Similar a CDMX con alta demanda en zonas comerciales.</li>
            <li><strong>Ciudades fronterizas</strong>: Precios variables, con alta demanda debido al flujo migratorio.</li>
          </ul>
          
          <h4>Derechos como inquilino:</h4>
          <ul>
            <li>Contrato escrito que especifique condiciones y duración</li>
            <li>Recibos por los pagos realizados</li>
            <li>Mantenimiento adecuado de la vivienda</li>
            <li>No discriminación por nacionalidad o estatus migratorio</li>
          </ul>
          
          <p>Para asesoría legal en caso de problemas, contacta a la Procuraduría Federal del Consumidor (PROFECO) o busca apoyo en organizaciones como Sin Fronteras o la Red de Documentación de Organizaciones Defensoras de Migrantes.</p>`,
          categoryId: categoryMap.get("Vivienda")!,
          countryId: countryMap.get("México")!
        },
        
        // CHILE - TRABAJO
        {
          title: "Empleo para migrantes en Chile",
          description: "Información sobre permisos de trabajo, búsqueda de empleo y derechos laborales para extranjeros en Chile.",
          content: `<h3>Trabajar en Chile como Migrante</h3>
          <p>Chile cuenta con un mercado laboral dinámico que ofrece oportunidades para extranjeros en diversos sectores.</p>
          
          <h4>Permisos de trabajo:</h4>
          <ul>
            <li><strong>Visa sujeta a contrato</strong>: Requiere un contrato firmado con empleador chileno.</li>
            <li><strong>Visa temporaria</strong>: Permite trabajar sin estar vinculado a un empleador específico.</li>
            <li><strong>Permiso para trabajar con visa en trámite</strong>: Autorización mientras se procesa la visa.</li>
            <li><strong>Visa de responsabilidad democrática</strong>: Específica para venezolanos.</li>
          </ul>
          
          <h4>Búsqueda de empleo:</h4>
          <ul>
            <li><strong>Bolsas de trabajo online</strong>: Laborum.cl, ChileTrabajos, CompuTrabajo, LinkedIn.</li>
            <li><strong>OMIL</strong>: Oficinas Municipales de Intermediación Laboral.</li>
            <li><strong>Redes de apoyo</strong>: Organizaciones como Servicio Jesuita a Migrantes o Fundación Fré.</li>
            <li><strong>Sectores con mayor demanda</strong>: Servicios, construcción, comercio, tecnología, agricultura.</li>
          </ul>
          
          <h4>Derechos laborales:</h4>
          <p>Los trabajadores migrantes con situación regular tienen los mismos derechos que los chilenos:</p>
          <ul>
            <li>Contrato escrito</li>
            <li>Salario mínimo (aproximadamente 460.000 CLP mensuales en 2023)</li>
            <li>Jornada máxima de 45 horas semanales</li>
            <li>15 días hábiles de vacaciones al año</li>
            <li>Afiliación al sistema de seguridad social (AFP, Fonasa o Isapre)</li>
            <li>Protección ante accidentes laborales</li>
            <li>Derecho a sindicalización</li>
          </ul>
          
          <h4>Para denunciar abusos laborales:</h4>
          <p>Puedes acudir a la Dirección del Trabajo (DT) o a organizaciones como el Instituto Nacional de Derechos Humanos (INDH).</p>
          
          <p>Para más información, visita el sitio del <a href="https://www.dt.gob.cl" target="_blank">Ministerio del Trabajo</a> o <a href="https://www.extranjeria.gob.cl" target="_blank">Extranjería</a>.</p>`,
          categoryId: categoryMap.get("Trabajo")!,
          countryId: countryMap.get("Chile")!
        }
      ];
      
      await db.insert(resources).values(resourcesToInsert);
      console.log(`Se han insertado ${resourcesToInsert.length} recursos específicos.`);
    } else {
      console.log(`Ya existen ${existingResources.length} recursos en la base de datos. No se realizarán nuevas inserciones.`);
    }
    
    console.log("Carga de datos completada exitosamente.");
    
  } catch (error) {
    console.error("Error al cargar datos de muestra:", error);
  }
}

export { seedDatabase };