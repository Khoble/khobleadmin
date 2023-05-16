import KPICard from "../../organisms/KPICard";
import { Grid } from '@mui/material';

const colors = {
    red: "#d88484",
    orange: "#d89f84",
    yellow: "#d8d184",
    green: "#9fd884",
    turquoise: "#84d8bc",
    lile: "#8c84d8",
    magenta: "#d884ce",

}

// Functions:
// Get latest value of a data set given a key
function getLatestValue(data: any, key: any) {
    let object = data[data.length - 1];
    let value = object[key]

    return value;
}
// Get sum of values of a data set given a key
function getSumOfValues(data: any, key: any) {
    let sum = 0;

    for (let i = 0; i < data.length; i++) {
        let obj = data[i];
        sum += obj[key];
    }

    return sum;
}



export default function CompanyKPIs({ language }: any) {
    // Dummy data:
    const usersOverTimeData = [

        {
            timestamp: "2023/02/1 12:32:03",
            users: 223,
        },


        {
            timestamp: "2023/02/2 12:32:03",
            users: 425,
        },


        {
            timestamp: "2023/02/3 12:32:03",
            users: 709,
        },


        {
            timestamp: "2023/02/4 12:32:03",
            users: 951,
        },


        {
            timestamp: "2023/02/5 12:32:03",
            users: 1039,
        },


        {
            timestamp: "2023/02/6 12:32:03",
            users: 1039,
        },


        {
            timestamp: "2023/02/7 12:32:03",
            users: 1096,
        },


        {
            timestamp: "2023/02/8 12:32:03",
            users: 1227,
        },


        {
            timestamp: "2023/02/9 12:32:03",
            users: 1451,
        },


        {
            timestamp: "2023/02/10 12:32:03",
            users: 1669,
        },


        {
            timestamp: "2023/02/11 12:32:03",
            users: 2360,
        },


        {
            timestamp: "2023/02/12 12:32:03",
            users: 2495,
        },


        {
            timestamp: "2023/02/13 12:32:03",
            users: 2739,
        },


        {
            timestamp: "2023/02/14 12:32:03",
            users: 2817,
        },


        {
            timestamp: "2023/02/15 12:32:03",
            users: 2830,
        },


        {
            timestamp: "2023/02/16 12:32:03",
            users: 2894,
        },


        {
            timestamp: "2023/02/17 12:32:03",
            users: 3147,
        },


        {
            timestamp: "2023/02/18 12:32:03",
            users: 3430,
        },


        {
            timestamp: "2023/02/19 12:32:03",
            users: 3699,
        },


        {
            timestamp: "2023/02/20 12:32:03",
            users: 4015,
        },


        {
            timestamp: "2023/02/21 12:32:03",
            users: 4637,
        },


        {
            timestamp: "2023/02/22 12:32:03",
            users: 5078,
        },


        {
            timestamp: "2023/02/23 12:32:03",
            users: 5460,
        },


        {
            timestamp: "2023/02/24 12:32:03",
            users: 5549,
        },


        {
            timestamp: "2023/02/25 12:32:03",
            users: 5591,
        },


        {
            timestamp: "2023/02/26 12:32:03",
            users: 6204,
        },


        {
            timestamp: "2023/02/27 12:32:03",
            users: 6268,
        },


        {
            timestamp: "2023/02/28 12:32:03",
            users: 7180,
        },


        {
            timestamp: "2023/02/29 12:32:03",
            users: 7206,
        },


        {
            timestamp: "2023/02/30 12:32:03",
            users: 7232,
        },


        {
            timestamp: "2023/02/31 12:32:03",
            users: 7272,
        },


        {
            timestamp: "2023/02/32 12:32:03",
            users: 7525,
        },


        {
            timestamp: "2023/02/33 12:32:03",
            users: 7756,
        },


        {
            timestamp: "2023/02/34 12:32:03",
            users: 7765,
        },


        {
            timestamp: "2023/02/35 12:32:03",
            users: 8113,
        },


        {
            timestamp: "2023/02/36 12:32:03",
            users: 8118,
        },


        {
            timestamp: "2023/02/37 12:32:03",
            users: 8217,
        },


        {
            timestamp: "2023/02/38 12:32:03",
            users: 8535,
        },


        {
            timestamp: "2023/02/39 12:32:03",
            users: 8879,
        },


        {
            timestamp: "2023/02/40 12:32:03",
            users: 8941,
        },


        {
            timestamp: "2023/02/41 12:32:03",
            users: 8950,
        },


        {
            timestamp: "2023/02/42 12:32:03",
            users: 9117,
        },


        {
            timestamp: "2023/02/43 12:32:03",
            users: 9177,
        },


        {
            timestamp: "2023/02/44 12:32:03",
            users: 9282,
        },


        {
            timestamp: "2023/02/45 12:32:03",
            users: 9308,
        },


        {
            timestamp: "2023/02/46 12:32:03",
            users: 9792,
        },


        {
            timestamp: "2023/02/47 12:32:03",
            users: 9803,
        },


        {
            timestamp: "2023/02/48 12:32:03",
            users: 9914,
        },


        {
            timestamp: "2023/02/49 12:32:03",
            users: 10113,
        },


        {
            timestamp: "2023/02/50 12:32:03",
            users: 10379,
        }

    ]
    const industriesChosenOnSignupData = [

        {
            industry:
                language === "english" ?
                    "Wholesale and retail sales" :
                    language === "español" ?
                        "Ventas al mayoreo y menudeo" :
                        "",
            students: 342
        },


        {
            industry:
                language === "english" ?
                    "Telecommunications" :
                    language === "español" ?
                        "Telecomunicaciones" :
                        "",
            students: 771
        },


        {
            industry:
                language === "english" ?
                    "Human Resources" :
                    language === "español" ?
                        "Recursos humanos" :
                        "",
            students: 727
        },


        {
            industry:
                language === "english" ?
                    "Finance" :
                    language === "español" ?
                        "Finanzas" :
                        "",
            students: 808
        },


        {
            industry:
                language === "english" ?
                    "Information Technology" :
                    language === "español" ?
                        "Tecnologías de la información" :
                        "",
            students: 190
        },


        {
            industry:
                language === "english" ?
                    "Administration and consulting" :
                    language === "español" ?
                        "Administración y consultoría" :
                        "",
            students: 430
        },


        {
            industry:
                language === "english" ?
                    "Manufacturing" :
                    language === "español" ?
                        "Manufactura" :
                        "",
            students: 835
        },


        {
            industry:
                language === "english" ?
                    "Restaurants and food services" :
                    language === "español" ?
                        "Restaurantes y servicios de comidas" :
                        "",
            students: 367
        },


        {
            industry:
                language === "english" ?
                    "Transport and logistics" :
                    language === "español" ?
                        "Transporte y logística" :
                        "",
            students: 228
        },


        {
            industry:
                language === "english" ?
                    "Health" :
                    language === "español" ?
                        "Salud" :
                        "",
            students: 202
        },


        {
            industry:
                language === "english" ?
                    "Audiovisual and media" :
                    language === "español" ?
                        "Audiovisual y medios de comunicación" :
                        "",
            students: 720
        },


        {
            industry:
                language === "english" ?
                    "Education" :
                    language === "español" ?
                        "Educación" :
                        "",
            students: 152
        },


        {
            industry:
                language === "english" ?
                    "Tourism and lodging" :
                    language === "español" ?
                        "Turismo y hospedaje" :
                        "",
            students: 846
        },


        {
            industry:
                language === "english" ?
                    "Construction, repair and maintenance services" :
                    language === "español" ?
                        "Servicios de construcción, reparación y mantenimiento" :
                        "",
            students: 198
        },


        {
            industry:
                language === "english" ?
                    "Pharmaceutical and biotechnology" :
                    language === "español" ?
                        "Farmacéutica y biotecnología" :
                        "",
            students: 479
        },


        {
            industry:
                language === "english" ?
                    "Personal consumer services" :
                    language === "español" ?
                        "Servicios personales al consumidor" :
                        "",
            students: 606
        },


        {
            industry:
                language === "english" ?
                    "Insurance" :
                    language === "español" ?
                        "Seguros" :
                        "",
            students: 794
        },


        {
            industry:
                language === "english" ?
                    "Legal" :
                    language === "español" ?
                        "Legal" :
                        "",
            students: 227
        },


        {
            industry:
                language === "english" ?
                    "Real estate" :
                    language === "español" ?
                        "Bienes raíces" :
                        "",
            students: 423
        },


        {
            industry:
                language === "english" ?
                    "Energy, mining and public infrastructure" :
                    language === "español" ?
                        "Energía, minería e infraestructura pública" :
                        "",
            students: 126
        },


        {
            industry:
                language === "english" ?
                    "NGOs and non-profit organizations" :
                    language === "español" ?
                        "ONG y Organizaciones sin fines de lucro" :
                        "",
            students: 555
        },


        {
            industry:
                language === "english" ?
                    "Government and public administration" :
                    language === "español" ?
                        "Gobierno y administración pública" :
                        "",
            students: 317
        },


        {
            industry:
                language === "english" ?
                    "Arts and entertainment" :
                    language === "español" ?
                        "Artes y entretenimiento" :
                        "",
            students: 625
        },


        {
            industry:
                language === "english" ?
                    "Aerospace and defense" :
                    language === "español" ?
                        "Aeroespacial y defensa" :
                        "",
            students: 310
        },


        {
            industry:
                language === "english" ?
                    "Call center / telemarketing" :
                    language === "español" ?
                        "CallCenter / Telemercadeo" :
                        "",
            students: 863
        },


        {
            industry:
                language === "english" ?
                    "Customer service" :
                    language === "español" ?
                        "Atención a clientes" :
                        "",
            students: 402
        },


        {
            industry:
                language === "english" ?
                    "Administration / office" :
                    language === "español" ?
                        "Administración / Oficina" :
                        "",
            students: 766
        },


        {
            industry:
                language === "english" ?
                    "Accounting / finance" :
                    language === "español" ?
                        "Contabilidad / Finanzas" :
                        "",
            students: 116
        },


        {
            industry:
                language === "english" ?
                    "Medicine / health" :
                    language === "español" ?
                        "Medicina / Salud" :
                        "",
            students: 386
        },


        {
            industry:
                language === "english" ?
                    "Warehouse / logistics / transport" :
                    language === "español" ?
                        "Almacén / Logística / Transporte" :
                        "",
            students: 249
        },


        {
            industry:
                language === "english" ?
                    "Human resources" :
                    language === "español" ?
                        "Recursos Humanos" :
                        "",
            students: 852
        },


        {
            industry:
                language === "english" ?
                    "General services, cleaning and security" :
                    language === "español" ?
                        "Servicios Generales, Aseo y Seguridad" :
                        "",
            students: 256
        },


        {
            industry:
                language === "english" ?
                    "Marketing" :
                    language === "español" ?
                        "Mercadotecnia" :
                        "",
            students: 587
        },


        {
            industry:
                language === "english" ?
                    "Advertising" :
                    language === "español" ?
                        "Publicidad" :
                        "",
            students: 269
        },


        {
            industry:
                language === "english" ?
                    "Communication" :
                    language === "español" ?
                        "Comunicación" :
                        "",
            students: 474
        },


        {
            industry:
                language === "english" ?
                    "Technical maintenance and repairs" :
                    language === "español" ?
                        "Mantenimiento y reparaciones técnicas" :
                        "",
            students: 213
        },


        {
            industry:
                language === "english" ?
                    "Production / operators / manufacturing" :
                    language === "español" ?
                        "Producción / Operarios / Manufactura" :
                        "",
            students: 292
        },


        {
            industry:
                language === "english" ?
                    "Information technology - systems" :
                    language === "español" ?
                        "Tecnologías de la Información - Sistemas" :
                        "",
            students: 474
        },


        {
            industry:
                language === "english" ?
                    "Accounting - finance" :
                    language === "español" ?
                        "Contabilidad - Finanzas" :
                        "",
            students: 822
        },


        {
            industry:
                language === "english" ?
                    "Manufacturing - production - operation" :
                    language === "español" ?
                        "Manufactura - Producción - Operación" :
                        "",
            students: 817
        },


        {
            industry:
                language === "english" ?
                    "Logistics - transport - distribution - warehouse" :
                    language === "español" ?
                        "Logística - Transporte - Distribución - Almacén" :
                        "",
            students: 775
        },


        {
            industry:
                language === "english" ?
                    "Administrative" :
                    language === "español" ?
                        "Administrativo" :
                        "",
            students: 481
        },


        {
            industry:
                language === "english" ?
                    "Engineering" :
                    language === "español" ?
                        "Ingeniería" :
                        "",
            students: 245
        },


        {
            industry:
                language === "english" ?
                    "Marketing - Advertising - Public Relations" :
                    language === "español" ?
                        "Mercadotecnia - Publicidad - Relaciones Públicas" :
                        "",
            students: 381
        }

    ]
    const studentsBySemesterData = [

        {
            semester:
                language === "english" ?
                    "First" :
                    language === "español" ?
                        "Primero" :
                        "",
            students: 22
        },


        {
            semester:
                language === "english" ?
                    "Second" :
                    language === "español" ?
                        "Segundo" :
                        "",
            students: 45
        },


        {
            semester:
                language === "english" ?
                    "Thrid" :
                    language === "español" ?
                        "Tercero" :
                        "",
            students: 47
        },


        {
            semester:
                language === "english" ?
                    "Fourth" :
                    language === "español" ?
                        "Cuarto" :
                        "",
            students: 53
        },


        {
            semester:
                language === "english" ?
                    "Fifth" :
                    language === "español" ?
                        "Quinto" :
                        "",
            students: 60
        },


        {
            semester:
                language === "english" ?
                    "Sixth" :
                    language === "español" ?
                        "Sexto" :
                        "",
            students: 90
        },


        {
            semester:
                language === "english" ?
                    "Seventh" :
                    language === "español" ?
                        "Séptimo" :
                        "",
            students: 91
        },


        {
            semester:
                language === "english" ?
                    "Eighth" :
                    language === "español" ?
                        "Octavo" :
                        "",
            students: 91
        },


        {
            semester:
                language === "english" ?
                    "Ninth" :
                    language === "español" ?
                        "Noveno" :
                        "",
            students: 109
        },


        {
            semester:
                language === "english" ?
                    "Tenth" :
                    language === "español" ?
                        "Décimo" :
                        "",
            students: 126
        }

    ]
    const studentsByMajorData = [

        {
            major:
                language === "english" ?
                    "Business Administration and Management" :
                    language === "español" ?
                        "Administración de Empresas" :
                        "",
            students: 334
        },


        {
            major:
                language === "english" ?
                    "Industrial Engineering" :
                    language === "español" ?
                        "Ingeniería Industrial" :
                        "",
            students: 217
        },


        {
            major:
                language === "english" ?
                    "Mechanical Engineering" :
                    language === "español" ?
                        "Ingeniería Mecánica" :
                        "",
            students: 223
        },


        {
            major:
                language === "english" ?
                    "Electrical Engineering" :
                    language === "español" ?
                        "Ingeniería Eléctrica" :
                        "",
            students: 445
        },


        {
            major:
                language === "english" ?
                    "Civil Engineering" :
                    language === "español" ?
                        "Ingeniería Civil" :
                        "",
            students: 65
        },


        {
            major:
                language === "english" ?
                    "Computer Science and Information Technology" :
                    language === "español" ?
                        "Ciencias de la Computación y Tecnología de la Información" :
                        "",
            students: 137
        },


        {
            major:
                language === "english" ?
                    "Accounting" :
                    language === "español" ?
                        "Contabilidad" :
                        "",
            students: 254
        },


        {
            major:
                language === "english" ?
                    "Medicine" :
                    language === "español" ?
                        "Medicina" :
                        "",
            students: 301
        },


        {
            major:
                language === "english" ?
                    "Architecture" :
                    language === "español" ?
                        "Arquitectura" :
                        "",
            students: 125
        },


        {
            major:
                language === "english" ?
                    "Law" :
                    language === "español" ?
                        "Derecho" :
                        "",
            students: 182
        },


        {
            major:
                language === "english" ?
                    "Economics" :
                    language === "español" ?
                        "Economía" :
                        "",
            students: 289
        },


        {
            major:
                language === "english" ?
                    "Psychology" :
                    language === "español" ?
                        "Psicología" :
                        "",
            students: 221
        },


        {
            major:
                language === "english" ?
                    "International Relations" :
                    language === "español" ?
                        "Relaciones Internacionales" :
                        "",
            students: 90
        },


        {
            major:
                language === "english" ?
                    "Marketing" :
                    language === "español" ?
                        "Mercadotecnia" :
                        "",
            students: 313
        },


        {
            major:
                language === "english" ?
                    "Communications" :
                    language === "español" ?
                        "Comunicación" :
                        "",
            students: 223
        }

    ]


    return (
        <Grid
            container
            spacing={2}
        >
            <Grid item>
                <KPICard
                    language={language}
                    size={'m'}
                    chartType={"line"}
                    data={usersOverTimeData}
                    color={colors.lile}
                    xDataKey={"timestamp"}
                    yDataKeys={["users"]}
                    metric={getLatestValue(usersOverTimeData, "users")}
                    metricDescription={
                        language === "english" ?
                            "Current Users" :
                            language === "español" ?
                                "Usuarios actuales" :
                                ""
                    }
                    trendChangePercent={20}
                />
            </Grid>
            <Grid item>
                <KPICard
                    language={language}
                    size={'l'}
                    chartType={"bar"}
                    data={industriesChosenOnSignupData}
                    title={
                        language === "english" ?
                            "Students by Industry Chosen on Sign Up" :
                            language === "español" ?
                                "Estudiantes por industria seleccionada en sign up" :
                                ""
                    }
                    color={colors.magenta}
                    xDataKey={"industry"}
                    yDataKeys={["students"]}
                    trendChangePercent={2.4}
                    fixed
                />
            </Grid>
            <Grid item>
                <KPICard
                    language={language}
                    size={'m'}
                    chartType={"bar"}
                    data={studentsBySemesterData}
                    title={
                        language === "english" ?
                            "Students by Semester" :
                            language === "español" ?
                                "Estudiantes por semestre" :
                                ""
                    }
                    color={colors.red}
                    xDataKey={"semester"}
                    yDataKeys={["students"]}
                    trendChangePercent={2.4}
                />
            </Grid>
            <Grid item>
                <KPICard
                    language={language}
                    size={'l'}
                    chartType={"bar"}
                    data={studentsByMajorData}
                    title={
                        language === "english" ?
                            "Students by Major" :
                            language === "español" ?
                                "Estudiantes por carrera" :
                                ""
                    }
                    color={colors.green}
                    xDataKey={"major"}
                    yDataKeys={["students"]}
                    trendChangePercent={2.4}
                    fixed
                />
            </Grid>
        </Grid>
    )
}