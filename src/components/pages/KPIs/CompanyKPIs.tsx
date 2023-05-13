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
            users: 131,
        },

        {
            timestamp: "2023/02/2 12:32:03",
            users: 205,
        },


        {
            timestamp: "2023/02/3 12:32:03",
            users: 224,
        },


        {
            timestamp: "2023/02/4 12:32:03",
            users: 600,
        },


        {
            timestamp: "2023/02/5 12:32:03",
            users: 721,
        },


        {
            timestamp: "2023/02/6 12:32:03",
            users: 838,
        },


        {
            timestamp: "2023/02/7 12:32:03",
            users: 908,
        },

        {
            timestamp: "2023/02/8 12:32:03",
            users: 1053,
        },


        {
            timestamp: "2023/02/9 12:32:03",
            users: 1132,
        },


        {
            timestamp: "2023/02/10 12:32:03",
            users: 1133,
        },


        {
            timestamp: "2023/02/11 12:32:03",
            users: 1133,
        },

        {
            timestamp: "2023/02/12 12:32:03",
            users: 1412,
        },


        {
            timestamp: "2023/02/13 12:32:03",
            users: 1659,
        },

        {
            timestamp: "2023/02/14 12:32:03",
            users: 2060,
        },


        {
            timestamp: "2023/02/15 12:32:03",
            users: 2187,
        },

        {
            timestamp: "2023/02/16 12:32:03",
            users: 2317,
        },


        {
            timestamp: "2023/02/17 12:32:03",
            users: 2477,
        },


        {
            timestamp: "2023/02/18 12:32:03",
            users: 2501,
        },


        {
            timestamp: "2023/02/19 12:32:03",
            users: 2844,
        },

        {
            timestamp: "2023/02/20 12:32:03",
            users: 2947,
        },


        {
            timestamp: "2023/02/21 12:32:03",
            users: 2969,
        },


        {
            timestamp: "2023/02/22 12:32:03",
            users: 2972,
        },

        {
            timestamp: "2023/02/23 12:32:03",
            users: 2983,
        },


        {
            timestamp: "2023/02/24 12:32:03",
            users: 3098,
        },


        {
            timestamp: "2023/02/25 12:32:03",
            users: 3237,
        },


        {
            timestamp: "2023/02/26 12:32:03",
            users: 3310,
        },


        {
            timestamp: "2023/02/27 12:32:03",
            users: 3661,
        },

        {
            timestamp: "2023/02/28 12:32:03",
            users: 3694,
        },


        {
            timestamp: "2023/02/29 12:32:03",
            users: 3796,
        },


        {
            timestamp: "2023/02/30 12:32:03",
            users: 3896,
        },


        {
            timestamp: "2023/02/31 12:32:03",
            users: 3941,
        }

    ]
    const companiesUnderIndustryData = [
        {
            industry:
                language === "english" ?
                    "Wholesale and retail sales" :
                    language === "español" ?
                        "Ventas al mayoreo y menudeo" :
                        "",
            companies: 343
        },

        {
            industry:
                language === "english" ?
                    "Telecommunications" :
                    language === "español" ?
                        "Telecomunicaciones" :
                        "",
            companies: 782
        },


        {
            industry:
                language === "english" ?
                    "Human Resources" :
                    language === "español" ?
                        "Recursos humanos" :
                        "",
            companies: 708
        },


        {
            industry:
                language === "english" ?
                    "Finance" :
                    language === "español" ?
                        "Finanzas" :
                        "",
            companies: 333
        },


        {
            industry:
                language === "english" ?
                    "Information Technology" :
                    language === "español" ?
                        "Tecnologías de la información" :
                        "",
            companies: 118
        },


        {
            industry:
                language === "english" ?
                    "Administration and consulting" :
                    language === "español" ?
                        "Administración y consultoría" :
                        "",
            companies: 139
        },

        {
            industry:
                language === "english" ?
                    "Manufacturing" :
                    language === "español" ?
                        "Manufactura" :
                        "",
            companies: 406
        },


        {
            industry:
                language === "english" ?
                    "Restaurants and food services" :
                    language === "español" ?
                        "Restaurantes y servicios de comidas" :
                        "",
            companies: 606
        },


        {
            industry:
                language === "english" ?
                    "Transport and logistics" :
                    language === "español" ?
                        "Transporte y logística" :
                        "",
            companies: 700
        },

        {
            industry:
                language === "english" ?
                    "Health" :
                    language === "español" ?
                        "Salud" :
                        "",
            companies: 417
        },


        {
            industry:
                language === "english" ?
                    "Audiovisual and media" :
                    language === "español" ?
                        "Audiovisual y medios de comunicación" :
                        "",
            companies: 42
        },


        {
            industry:
                language === "english" ?
                    "Education" :
                    language === "español" ?
                        "Educación" :
                        "",
            companies: 140
        },

        {
            industry:
                language === "english" ?
                    "Tourism and lodging" :
                    language === "español" ?
                        "Turismo y hospedaje" :
                        "",
            companies: 630
        },

        {
            industry:
                language === "english" ?
                    "Construction, repair and maintenance services" :
                    language === "español" ?
                        "Servicios de construcción, reparación y mantenimiento" :
                        "",
            companies: 424
        },


        {
            industry:
                language === "english" ?
                    "Pharmaceutical and biotechnology" :
                    language === "español" ?
                        "Farmacéutica y biotecnología" :
                        "",
            companies: 511
        },


        {
            industry:
                language === "english" ?
                    "Personal consumer services" :
                    language === "español" ?
                        "Servicios personales al consumidor" :
                        "",
            companies: 731
        },

        {
            industry:
                language === "english" ?
                    "Insurance" :
                    language === "español" ?
                        "Seguros" :
                        "",
            companies: 322
        },


        {
            industry:
                language === "english" ?
                    "Legal" :
                    language === "español" ?
                        "Legal" :
                        "",
            companies: 536
        },


        {
            industry:
                language === "english" ?
                    "Real estate" :
                    language === "español" ?
                        "Bienes raíces" :
                        "",
            companies: 182
        },

        {
            industry:
                language === "english" ?
                    "Energy, mining and public infrastructure" :
                    language === "español" ?
                        "Energía, minería e infraestructura pública" :
                        "",
            companies: 768
        },


        {
            industry:
                language === "english" ?
                    "NGOs and non-profit organizations" :
                    language === "español" ?
                        "ONG y Organizaciones sin fines de lucro" :
                        "",
            companies: 45
        },


        {
            industry:
                language === "english" ?
                    "Government and public administration" :
                    language === "español" ?
                        "Gobierno y administración pública" :
                        "",
            companies: 770
        },

        {
            industry:
                language === "english" ?
                    "Arts and entertainment" :
                    language === "español" ?
                        "Artes y entretenimiento" :
                        "",
            companies: 261
        },


        {
            industry:
                language === "english" ?
                    "Aerospace and defense" :
                    language === "español" ?
                        "Aeroespacial y defensa" :
                        "",
            companies: 123
        },


        {
            industry:
                language === "english" ?
                    "Call center / telemarketing" :
                    language === "español" ?
                        "CallCenter / Telemercadeo" :
                        "",
            companies: 695
        },


        {
            industry:
                language === "english" ?
                    "Customer service" :
                    language === "español" ?
                        "Atención a clientes" :
                        "",
            companies: 400
        },

        {
            industry:
                language === "english" ?
                    "Administration / office" :
                    language === "español" ?
                        "Administración / Oficina" :
                        "",
            companies: 778
        },


        {
            industry:
                language === "english" ?
                    "Accounting / finance" :
                    language === "español" ?
                        "Contabilidad / Finanzas" :
                        "",
            companies: 619
        },


        {
            industry:
                language === "english" ?
                    "Medicine / health" :
                    language === "español" ?
                        "Medicina / Salud" :
                        "",
            companies: 480
        },


        {
            industry:
                language === "english" ?
                    "Warehouse / logistics / transport" :
                    language === "español" ?
                        "Almacén / Logística / Transporte" :
                        "",
            companies: 622
        },

        {
            industry:
                language === "english" ?
                    "Human resources" :
                    language === "español" ?
                        "Recursos Humanos" :
                        "",
            companies: 516
        },


        {
            industry:
                language === "english" ?
                    "General services, cleaning and security" :
                    language === "español" ?
                        "Servicios Generales, Aseo y Seguridad" :
                        "",
            companies: 275
        },


        {
            industry:
                language === "english" ?
                    "Marketing" :
                    language === "español" ?
                        "Mercadotecnia" :
                        "",
            companies: 723
        },


        {
            industry:
                language === "english" ?
                    "Advertising" :
                    language === "español" ?
                        "Publicidad" :
                        "",
            companies: 431
        },

        {
            industry:
                language === "english" ?
                    "Communication" :
                    language === "español" ?
                        "Comunicación" :
                        "",
            companies: 728
        },


        {
            industry:
                language === "english" ?
                    "Technical maintenance and repairs" :
                    language === "español" ?
                        "Mantenimiento y reparaciones técnicas" :
                        "",
            companies: 435
        },


        {
            industry:
                language === "english" ?
                    "Production / operators / manufacturing" :
                    language === "español" ?
                        "Producción / Operarios / Manufactura" :
                        "",
            companies: 404
        },


        {
            industry:
                language === "english" ?
                    "Information technology - systems" :
                    language === "español" ?
                        "Tecnologías de la Información - Sistemas" :
                        "",
            companies: 685
        },


        {
            industry:
                language === "english" ?
                    "Accounting - finance" :
                    language === "español" ?
                        "Contabilidad - Finanzas" :
                        "",
            companies: 406
        },

        {
            industry:
                language === "english" ?
                    "Manufacturing - production - operation" :
                    language === "español" ?
                        "Manufactura - Producción - Operación" :
                        "",
            companies: 745
        },


        {
            industry:
                language === "english" ?
                    "Logistics - transport - distribution - warehouse" :
                    language === "español" ?
                        "Logística - Transporte - Distribución - Almacén" :
                        "",
            companies: 343
        },


        {
            industry:
                language === "english" ?
                    "Administrative" :
                    language === "español" ?
                        "Administrativo" :
                        "",
            companies: 663
        },


        {
            industry:
                language === "english" ?
                    "Engineering" :
                    language === "español" ?
                        "Ingeniería" :
                        "",
            companies: 323
        },


        {
            industry:
                language === "english" ?
                    "Marketing - Advertising - Public Relations" :
                    language === "español" ?
                        "Mercadotecnia - Publicidad - Relaciones Públicas" :
                        "",
            companies: 256
        }

    ]
    const publishedIndustriesData = [
        {
            industry:
                language === "english" ?
                    "Wholesale and retail sales" :
                    language === "español" ?
                        "Ventas al mayoreo y menudeo" :
                        "",
            publications: 158
        },

        {
            industry:
                language === "english" ?
                    "Telecommunications" :
                    language === "español" ?
                        "Telecomunicaciones" :
                        "",
            publications: 130
        },


        {
            industry:
                language === "english" ?
                    "Human Resources" :
                    language === "español" ?
                        "Recursos humanos" :
                        "",
            publications: 206
        },


        {
            industry:
                language === "english" ?
                    "Finance" :
                    language === "español" ?
                        "Finanzas" :
                        "",
            publications: 136
        },


        {
            industry:
                language === "english" ?
                    "Information Technology" :
                    language === "español" ?
                        "Tecnologías de la información" :
                        "",
            publications: 397
        },


        {
            industry:
                language === "english" ?
                    "Administration and consulting" :
                    language === "español" ?
                        "Administración y consultoría" :
                        "",
            publications: 524
        },

        {
            industry:
                language === "english" ?
                    "Manufacturing" :
                    language === "español" ?
                        "Manufactura" :
                        "",
            publications: 323
        },


        {
            industry:
                language === "english" ?
                    "Restaurants and food services" :
                    language === "español" ?
                        "Restaurantes y servicios de comidas" :
                        "",
            publications: 84
        },


        {
            industry:
                language === "english" ?
                    "Transport and logistics" :
                    language === "español" ?
                        "Transporte y logística" :
                        "",
            publications: 464
        },

        {
            industry:
                language === "english" ?
                    "Health" :
                    language === "español" ?
                        "Salud" :
                        "",
            publications: 292
        },


        {
            industry:
                language === "english" ?
                    "Audiovisual and media" :
                    language === "español" ?
                        "Audiovisual y medios de comunicación" :
                        "",
            publications: 536
        },


        {
            industry:
                language === "english" ?
                    "Education" :
                    language === "español" ?
                        "Educación" :
                        "",
            publications: 377
        },


        {
            industry:
                language === "english" ?
                    "Tourism and lodging" :
                    language === "español" ?
                        "Turismo y hospedaje" :
                        "",
            publications: 197
        },


        {
            industry:
                language === "english" ?
                    "Construction, repair and maintenance services" :
                    language === "español" ?
                        "Servicios de construcción, reparación y mantenimiento" :
                        "",
            publications: 83
        },

        {
            industry:
                language === "english" ?
                    "Pharmaceutical and biotechnology" :
                    language === "español" ?
                        "Farmacéutica y biotecnología" :
                        "",
            publications: 436
        },


        {
            industry:
                language === "english" ?
                    "Personal consumer services" :
                    language === "español" ?
                        "Servicios personales al consumidor" :
                        "",
            publications: 111
        },


        {
            industry:
                language === "english" ?
                    "Insurance" :
                    language === "español" ?
                        "Seguros" :
                        "",
            publications: 380
        },

        {
            industry:
                language === "english" ?
                    "Legal" :
                    language === "español" ?
                        "Legal" :
                        "",
            publications: 201
        },


        {
            industry:
                language === "english" ?
                    "Real estate" :
                    language === "español" ?
                        "Bienes raíces" :
                        "",
            publications: 311
        },


        {
            industry:
                language === "english" ?
                    "Energy, mining and public infrastructure" :
                    language === "español" ?
                        "Energía, minería e infraestructura pública" :
                        "",
            publications: 426
        },


        {
            industry:
                language === "english" ?
                    "NGOs and non-profit organizations" :
                    language === "español" ?
                        "ONG y Organizaciones sin fines de lucro" :
                        "",
            publications: 198
        },

        {
            industry:
                language === "english" ?
                    "Government and public administration" :
                    language === "español" ?
                        "Gobierno y administración pública" :
                        "",
            publications: 236
        },


        {
            industry:
                language === "english" ?
                    "Arts and entertainment" :
                    language === "español" ?
                        "Artes y entretenimiento" :
                        "",
            publications: 403
        },


        {
            industry:
                language === "english" ?
                    "Aerospace and defense" :
                    language === "español" ?
                        "Aeroespacial y defensa" :
                        "",
            publications: 342
        },


        {
            industry:
                language === "english" ?
                    "Call center / telemarketing" :
                    language === "español" ?
                        "CallCenter / Telemercadeo" :
                        "",
            publications: 354
        },


        {
            industry:
                language === "english" ?
                    "Customer service" :
                    language === "español" ?
                        "Atención a clientes" :
                        "",
            publications: 320
        },

        {
            industry:
                language === "english" ?
                    "Administration / office" :
                    language === "español" ?
                        "Administración / Oficina" :
                        "",
            publications: 208
        },


        {
            industry:
                language === "english" ?
                    "Accounting / finance" :
                    language === "español" ?
                        "Contabilidad / Finanzas" :
                        "",
            publications: 495
        },


        {
            industry:
                language === "english" ?
                    "Medicine / health" :
                    language === "español" ?
                        "Medicina / Salud" :
                        "",
            publications: 163
        },


        {
            industry:
                language === "english" ?
                    "Warehouse / logistics / transport" :
                    language === "español" ?
                        "Almacén / Logística / Transporte" :
                        "",
            publications: 250
        },


        {
            industry:
                language === "english" ?
                    "Human resources" :
                    language === "español" ?
                        "Recursos Humanos" :
                        "",
            publications: 352
        },


        {
            industry:
                language === "english" ?
                    "General services, cleaning and security" :
                    language === "español" ?
                        "Servicios Generales, Aseo y Seguridad" :
                        "",
            publications: 280
        },


        {
            industry:
                language === "english" ?
                    "Marketing" :
                    language === "español" ?
                        "Mercadotecnia" :
                        "",
            publications: 489
        },


        {
            industry:
                language === "english" ?
                    "Advertising" :
                    language === "español" ?
                        "Publicidad" :
                        "",
            publications: 282
        },


        {
            industry:
                language === "english" ?
                    "Communication" :
                    language === "español" ?
                        "Comunicación" :
                        "",
            publications: 150
        },


        {
            industry:
                language === "english" ?
                    "Technical maintenance and repairs" :
                    language === "español" ?
                        "Mantenimiento y reparaciones técnicas" :
                        "",
            publications: 51
        },


        {
            industry:
                language === "english" ?
                    "Production / operators / manufacturing" :
                    language === "español" ?
                        "Producción / Operarios / Manufactura" :
                        "",
            publications: 361
        },


        {
            industry:
                language === "english" ?
                    "Information technology - systems" :
                    language === "español" ?
                        "Tecnologías de la Información - Sistemas" :
                        "",
            publications: 526
        },


        {
            industry:
                language === "english" ?
                    "Accounting - finance" :
                    language === "español" ?
                        "Contabilidad - Finanzas" :
                        "",
            publications: 75
        },


        {
            industry:
                language === "english" ?
                    "Manufacturing - production - operation" :
                    language === "español" ?
                        "Manufactura - Producción - Operación" :
                        "",
            publications: 250
        },


        {
            industry:
                language === "english" ?
                    "Logistics - transport - distribution - warehouse" :
                    language === "español" ?
                        "Logística - Transporte - Distribución - Almacén" :
                        "",
            publications: 566
        },


        {
            industry:
                language === "english" ?
                    "Administrative" :
                    language === "español" ?
                        "Administrativo" :
                        "",
            publications: 482
        },


        {
            industry:
                language === "english" ?
                    "Engineering" :
                    language === "español" ?
                        "Ingeniería" :
                        "",
            publications: 466
        },


        {
            industry:
                language === "english" ?
                    "Marketing - Advertising - Public Relations" :
                    language === "español" ?
                        "Mercadotecnia - Publicidad - Relaciones Públicas" :
                        "",
            publications: 237
        }

    ]
    const publicationsOverTimeData = [
        {
            timestamp: "2023/02/1 12:32:03",
            publications: 663,
        },

        {
            timestamp: "2023/02/2 12:32:03",
            publications: 664,
        },


        {
            timestamp: "2023/02/3 12:32:03",
            publications: 1524,
        },


        {
            timestamp: "2023/02/4 12:32:03",
            publications: 1571,
        },


        {
            timestamp: "2023/02/5 12:32:03",
            publications: 2951,
        },


        {
            timestamp: "2023/02/6 12:32:03",
            publications: 3346,
        },


        {
            timestamp: "2023/02/7 12:32:03",
            publications: 3568,
        },


        {
            timestamp: "2023/02/8 12:32:03",
            publications: 3643,
        },


        {
            timestamp: "2023/02/9 12:32:03",
            publications: 3974,
        },

        {
            timestamp: "2023/02/10 12:32:03",
            publications: 4103,
        },


        {
            timestamp: "2023/02/11 12:32:03",
            publications: 4519,
        },


        {
            timestamp: "2023/02/12 12:32:03",
            publications: 4673,
        },


        {
            timestamp: "2023/02/13 12:32:03",
            publications: 5319,
        },

        {
            timestamp: "2023/02/14 12:32:03",
            publications: 5891,
        },


        {
            timestamp: "2023/02/15 12:32:03",
            publications: 6131,
        },


        {
            timestamp: "2023/02/16 12:32:03",
            publications: 6268,
        },


        {
            timestamp: "2023/02/17 12:32:03",
            publications: 6748,
        },


        {
            timestamp: "2023/02/18 12:32:03",
            publications: 8342,
        },


        {
            timestamp: "2023/02/19 12:32:03",
            publications: 8784,
        },


        {
            timestamp: "2023/02/20 12:32:03",
            publications: 8969,
        },


        {
            timestamp: "2023/02/21 12:32:03",
            publications: 8998,
        },


        {
            timestamp: "2023/02/22 12:32:03",
            publications: 9083,
        },


        {
            timestamp: "2023/02/23 12:32:03",
            publications: 10600,
        },


        {
            timestamp: "2023/02/24 12:32:03",
            publications: 10625,
        },


        {
            timestamp: "2023/02/25 12:32:03",
            publications: 11364,
        },


        {
            timestamp: "2023/02/26 12:32:03",
            publications: 11805,
        },


        {
            timestamp: "2023/02/27 12:32:03",
            publications: 12262,
        },


        {
            timestamp: "2023/02/28 12:32:03",
            publications: 12832,
        },


        {
            timestamp: "2023/02/29 12:32:03",
            publications: 12836,
        },


        {
            timestamp: "2023/02/30 12:32:03",
            publications: 12863,
        },


        {
            timestamp: "2023/02/31 12:32:03",
            publications: 14001,
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
                    title={
                        language === "english" ?
                            "Current Users" :
                            language === "español" ?
                                "Usuarios actuales" :
                                ""
                    }
                    color={colors.turquoise}
                    xDataKey={"timestamp"}
                    yDataKeys={["users"]}
                    metric={getLatestValue(usersOverTimeData, "users")}
                    trendChangePercent={0}
                />
            </Grid>
            <Grid item>
                <KPICard
                    language={language}
                    size={'l'}
                    chartType={"bar"}
                    data={companiesUnderIndustryData}
                    title={
                        language === "english" ?
                            "Total Companies" :
                            language === "español" ?
                                "Compañías totales" :
                                ""
                    }
                    color={colors.orange}
                    xDataKey={"industry"}
                    yDataKeys={["companies"]}
                    metric={getSumOfValues(companiesUnderIndustryData, "companies")}
                    trendChangePercent={2.4}
                />
            </Grid>
            <Grid item>
                <KPICard
                    language={language}
                    size={'l'}
                    chartType={"bar"}
                    data={publishedIndustriesData}
                    title={
                        language === "english" ?
                            "Total Publications" :
                            language === "español" ?
                                "Publicaciones totales" :
                                ""
                    }
                    color={colors.yellow}
                    xDataKey={"industry"}
                    yDataKeys={["publications"]}
                    metric={getSumOfValues(publishedIndustriesData, "publications")}
                    trendChangePercent={-4}
                />
            </Grid>
            <Grid item>
                <KPICard
                    language={language}
                    size={'m'}
                    chartType={"line"}
                    data={publicationsOverTimeData}
                    title={
                        language === "english" ?
                            "Current Publications" :
                            language === "español" ?
                                "Publicaciones actuales" :
                                ""
                    }
                    color={colors.green}
                    xDataKey={"timestamp"}
                    yDataKeys={["publications"]}
                    metric={getLatestValue(publicationsOverTimeData, "publications")}
                    trendChangePercent={11.9}
                />
            </Grid>
        </Grid>
    )
}