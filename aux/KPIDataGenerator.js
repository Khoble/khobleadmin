let scenario = "majors"
let outputArrayName = "studentsByMajorData";
let keyName1 = "major";
let keyName2 = "students";
let minVal = 20;
let maxVal = 500;
let n = 50
let randomize = true

var valueList = []
for (let i = 0; i < n; i++) {
    valueList.push(Math.floor(Math.random() * (maxVal - minVal + 1) + minVal))
}
if (!randomize) valueList.sort((a, b) => a - b);

console.log(`const ${outputArrayName} = [`);
switch (scenario) {
    case "timestamps":
        for (let i = 0; i < n; i++) {
            let obj = `
{
    ${keyName1}: "2023/02/${i + 1} 12:32:03",
    ${keyName2}: ${valueList[i]},
}${i < n - 1 ? ',' : ''}
            `
            console.log(obj);
        }
        break;
    case "industries":
        let industriesInEnglish = ["Wholesale and retail sales",
            "Telecommunications",
            "Human Resources",
            "Finance",
            "Information Technology",
            "Administration and consulting",
            "Manufacturing",
            "Restaurants and food services",
            "Transport and logistics",
            "Health",
            "Audiovisual and media",
            "Education",
            "Tourism and lodging",
            "Construction, repair and maintenance services",
            "Pharmaceutical and biotechnology",
            "Personal consumer services",
            "Insurance",
            "Legal",
            "Real estate",
            "Energy, mining and public infrastructure",
            "NGOs and non-profit organizations",
            "Government and public administration",
            "Arts and entertainment",
            "Aerospace and defense",
            "Call center / telemarketing",
            "Customer service",
            "Administration / office",
            "Accounting / finance",
            "Medicine / health",
            "Warehouse / logistics / transport",
            "Human resources",
            "General services, cleaning and security",
            "Marketing",
            "Advertising",
            "Communication",
            "Technical maintenance and repairs",
            "Production / operators / manufacturing",
            "Information technology - systems",
            "Accounting - finance",
            "Manufacturing - production - operation",
            "Logistics - transport - distribution - warehouse",
            "Administrative",
            "Engineering",
            "Marketing - Advertising - Public Relations"]
        let industriesInSpanish = [
            "Ventas al mayoreo y menudeo",
            "Telecomunicaciones",
            "Recursos humanos",
            "Finanzas",
            "Tecnologías de la información",
            "Administración y consultoría",
            "Manufactura",
            "Restaurantes y servicios de comidas",
            "Transporte y logística",
            "Salud",
            "Audiovisual y medios de comunicación",
            "Educación",
            "Turismo y hospedaje",
            "Servicios de construcción, reparación y mantenimiento",
            "Farmacéutica y biotecnología",
            "Servicios personales al consumidor",
            "Seguros",
            "Legal",
            "Bienes raíces",
            "Energía, minería e infraestructura pública",
            "ONG y Organizaciones sin fines de lucro",
            "Gobierno y administración pública",
            "Artes y entretenimiento",
            "Aeroespacial y defensa",
            "CallCenter / Telemercadeo",
            "Atención a clientes",
            "Administración / Oficina",
            "Contabilidad / Finanzas",
            "Medicina / Salud",
            "Almacén / Logística / Transporte",
            "Recursos Humanos",
            "Servicios Generales, Aseo y Seguridad",
            "Mercadotecnia",
            "Publicidad",
            "Comunicación",
            "Mantenimiento y reparaciones técnicas",
            "Producción / Operarios / Manufactura",
            "Tecnologías de la Información - Sistemas",
            "Contabilidad - Finanzas",
            "Manufactura - Producción - Operación",
            "Logística - Transporte - Distribución - Almacén",
            "Administrativo",
            "Ingeniería",
            "Mercadotecnia - Publicidad - Relaciones Públicas"
        ]

        for (let i = 0; i < industriesInSpanish.length; i++) {
            let obj = `
{
    ${keyName1}:
        language==="english"?
    "${industriesInEnglish[i]}" :
        language==="español"?
    "${industriesInSpanish[i]}" :
        "",
    ${keyName2}: ${valueList[i]}
}${i < industriesInSpanish.length - 1 ? ',' : ''}
            `
            console.log(obj);
        }
        break;
    case "semesters":
        const semestersInEnglish = ["First", "Second", "Thrid", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth"];
        const semestersInSpanish = ["Primero", "Segundo", "Tercero", "Cuarto", "Quinto", "Sexto", "Séptimo", "Octavo", "Noveno", "Décimo"];

        for (let i = 0; i < semestersInSpanish.length; i++) {
            let obj = `
{
    ${keyName1}:
        language==="english"?
    "${semestersInEnglish[i]}" :
        language==="español"?
    "${semestersInSpanish[i]}" :
        "",
    ${keyName2}: ${valueList[i]}
}${i < semestersInSpanish.length - 1 ? ',' : ''}
            `
            console.log(obj);
        }
        break;
    case "majors":
        const majorsInEnglish = [
            "Business Administration and Management",
            "Industrial Engineering",
            "Mechanical Engineering",
            "Electrical Engineering",
            "Civil Engineering",
            "Computer Science and Information Technology",
            "Accounting",
            "Medicine",
            "Architecture",
            "Law",
            "Economics",
            "Psychology",
            "International Relations",
            "Marketing",
            "Communications"
        ];
        const majorsInSpanish = [
            "Administración de Empresas",
            "Ingeniería Industrial",
            "Ingeniería Mecánica",
            "Ingeniería Eléctrica",
            "Ingeniería Civil",
            "Ciencias de la Computación y Tecnología de la Información",
            "Contabilidad",
            "Medicina",
            "Arquitectura",
            "Derecho",
            "Economía",
            "Psicología",
            "Relaciones Internacionales",
            "Mercadotecnia",
            "Comunicación"
        ];

        for (let i = 0; i < majorsInSpanish.length; i++) {
            let obj = `
{
    ${keyName1}:
        language==="english"?
    "${majorsInEnglish[i]}" :
        language==="español"?
    "${majorsInSpanish[i]}" :
        "",
    ${keyName2}: ${valueList[i]}
}${i < majorsInSpanish.length - 1 ? ',' : ''}
            `
            console.log(obj);
        }
        break;

}
console.log(`]`);