import { useEffect, useRef, useState } from "react";
import KPICard from "../../organisms/KPICard";
import { Avatar, AvatarGroup, Box, Button, Grid, Modal } from '@mui/material';
import khobleAPI from "../../../api/khobleAPI";
import Datatable from "../../molecules/Datatable";
import getLatestValue from "../../../utils/functions/getLatestValue";
import { useTheme } from '@mui/material/styles';

const colors = {
    red: "#d88484",
    orange: "#d89f84",
    yellow: "#d8d184",
    green: "#9fd884",
    turquoise: "#84d8bc",
    lile: "#8c84d8",
    magenta: "#d884ce",

}

// Functions for obtaining the rectruiters' initials:
function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}
function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

// Component used to display a group of avatars (in this case, recruiters):
const AvatarGroupComponent = ({ recruiters, onAvatarGroupClick }: any) => {
    // Constants and variables:
    const primaryColor = useTheme().palette.mode === "dark" ? "white" : "black"; // used to determine the avatar border colors

    return (
        <Box
            onClick={() => onAvatarGroupClick(recruiters)} // Remove the immediate function invocation
            sx={{
                borderRadius: "100em",
                padding: "2px",
                "&:hover": {
                    cursor: "pointer",
                    outline: `1px solid ${primaryColor}`,
                },
            }}
        >
            <AvatarGroup
                max={2}
                sx={{
                    "& .MuiAvatarGroup-avatar": {
                        borderColor: primaryColor,
                        borderWidth: "1px"
                    }
                }}
            >
                {recruiters.map((recruiterObject: any, recruiterIndex: number) => (
                    <Avatar
                        key={`avatar-${recruiterIndex}`}
                        {...(recruiterObject.profile_img_url ? /* If recruiter has a profile picture: */
                            { src: recruiterObject.profile_img_url } // create avatar from profile picture
                            :
                            stringAvatar(recruiterObject.name) // create avatar from initials
                        )}
                    />
                ))}
            </AvatarGroup>
        </Box>
    );
};

export default function Companies({ language }: any) {
    // Dummy data:
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

    // Constants and variables:
    const primaryColor = useTheme().palette.mode === "dark" ? "white" : "black"; // used to determine the avatar border colors
    // Recruiter modal:
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalToggle = (recruiters: any[]) => {
        setSelectedRecruitersTemp(!isModalOpen ? recruiters : []) // set the recruiters on open, remove recruiters on close
        setIsModalOpen(!isModalOpen);
    };
    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: "50%",
        bgcolor: 'background.paper',
        // border: `2px solid ${primaryColor}`,
        boxShadow: `0px 0px 53px -7px rgba(${primaryColor === "white" ? "255,255,255" : "0,0,0"},0.63)`,
        webkitBoxShadow: `0px 0px 53px -7px rgba(${primaryColor === "white" ? "255,255,255" : "0,0,0"},0.63)`,
        mozBoxShadow: `0px 0px 53px 7px -rgba(${primaryColor === "white" ? "255,255,255" : "0,0,0"},0.63)`,
        p: 4,
        borderRadius: "10px"
    };
    const [selectedRecruiters, setSelectedRecruiters] = useState<any[]>([]);
    const [selectedRecruitersTemp, setSelectedRecruitersTemp] = useState<any[]>([]); // temporary state to prevent re-render inside avatar component
    useEffect(() => {
        setSelectedRecruiters(selectedRecruitersTemp);
    }, [selectedRecruitersTemp]);

    // KPI data:
    const [companiesOverTimeData, setCompaniesOverTimeData] = useState<any>(null);
    const [companiesByIndustryData, setCompaniesByIndustryData] = useState<any>(null);
    const [postingsByIndustryData, setPostingsByIndustryData] = useState<any>(null);
    const [postingsOverTimeData, setPostingsOverTimeData] = useState<any>(null);
    const [companiesUserTableRows, setCompaniesUserTableRows] = useState<any>(null);
    const [companiesUserTableColumns, setCompaniesUserTableColumns] = useState<any>(null);
    const timestampKeyName = "timestamp"; // the name of the key that has to do with timestamps in the objects from the API responses

    const [isLoading, setIsLoading] = useState(true) // true by default to display the wrapper until the API calls are done

    // API calls:
    useEffect(() => {
        const fetchCompaniesOverTime = async () => {
            try {
                const response = await khobleAPI.get("/dashboard/company/registered-in-time"); // make API call
                const rawData = await response.data; // extract data
                setCompaniesOverTimeData(rawData.companiesRegisteredInTime);
            } catch (error) {
                console.error(error)
            }
        };

        // const fetchCompaniesByIndustryData = async () => {
        //     try {
        //         const response = await khobleAPI.get("/dashboard/company/by-industries"); // make API call
        //         const responseProperty = "data" // specify the property of the response we want to extract
        //         const rawData = await response[responseProperty]; // extract property
        //         if (rawData) { // if property was found
        //             console.log(rawData);
        //         } else {
        //             throw new Error(`Response has no property '${responseProperty}'`); // raise error explaining property couldn't be found
        //         }
        //     } catch (error) {
        //         console.error(error); // raise error explaining inability to connect to the endpoint 
        //     }
        // };

        const fetchPostingsByIndustry = async () => {
            try {
                const response = await khobleAPI.get("/dashboard/company/publications-by-industries"); // make API call
                const rawData = await response.data; // extract data
                setPostingsByIndustryData(rawData.publicationsByIndustry);
            } catch (error) {
                console.error(error)
            }
        };

        const fetchPostingsOverTime = async () => {
            try {
                const response = await khobleAPI.get("/dashboard/company/publications-in-time"); // make API call
                const rawData = await response.data; // extract data
                setPostingsOverTimeData(rawData.publicationsInTime);
            } catch (error) {
                console.error(error)
            }
        };

        const fetchCompaniesUserTable = async () => {
            try {
                const response = await khobleAPI.get("/dashboard/company"); // make API call
                const responseProperty = "data" // specify the property of the response we want to extract
                const rawData = await response[responseProperty]; // extract property
                var columns: any = []; // auxiliary array to save the companies table columns
                var rows: any = []; // auxiliary array to save the student table rows
                rawData.companies.map((company: any, userIndex: any) => { // for every student
                    let shouldSaveColumns = userIndex === 0 // flag to save the columns only on first iteration
                    let rowObject: any = { "id": userIndex } // auxiliary object based on the current student's props (requires an Id by default)
                    for (const propName in company) { // for every property in the company object
                        if (shouldSaveColumns) { // Store columns if userIndex is 0:
                            let columnObject: any = { "field": propName, "flex": 1 }

                            // Render component for cells in the "Recruiters" column:
                            propName === "recruiters" && (columnObject.renderCell = (payload: any) => { // 'renderCell' prop is used to display components as cell content
                                if (payload && payload.value && payload.value.length) { // If there is main recruiter data:
                                    let recruiterObjectArray = payload.value // extract the array containing the recruiters
                                    return (
                                        <AvatarGroupComponent
                                            recruiters={recruiterObjectArray}
                                            onAvatarGroupClick={handleModalToggle}
                                        />
                                    )
                                }
                            }
                            )
                            columns.push(columnObject)
                        }
                        rowObject[propName] = company[propName] // add the prop-value pair
                    }
                    if (shouldSaveColumns) setCompaniesUserTableColumns(columns) // save columns
                    rows.push(rowObject) // store row object
                })
                setCompaniesUserTableRows(rows) // save rows
            } catch (error) {
                console.error(error)
            }
        };

        // Main KPI call:
        const fetchKPIData = async () => {
            setIsLoading(true);
            try {
                await Promise.all([ // ensures all the calls are finished before proceeding
                    fetchCompaniesOverTime(),
                    // fetchCompaniesByIndustryData(),
                    fetchPostingsByIndustry(),
                    fetchPostingsOverTime(),
                    fetchCompaniesUserTable()
                ]);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchKPIData(); // make main call
    },
        [] // empty array for 2nd argument indicates that useEffect will only run once after the initial render, not after re-renders as well
    );

    if (isLoading || companiesOverTimeData === null /*|| companiesByIndustryData === null*/ || postingsByIndustryData === null || postingsOverTimeData === null) {
        return <div>Loading...</div>;
    }

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            width="100vw"
        // border="3px solid magenta"
        >
            <Grid
                item
                width="100%"
            // border="4px solid black"
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    padding={1}
                    spacing={1}
                >
                    <Grid item>
                        <KPICard
                            language={language}
                            size={'m'}
                            chartType={"line"}
                            data={companiesOverTimeData}
                            color={colors.turquoise}
                            xDataKey={timestampKeyName}
                            yDataKeys={["companies"]}
                            metric={getLatestValue(companiesOverTimeData, "companies")}
                            metricDescription={
                                language === "english" ?
                                    "current users" :
                                    language === "español" ?
                                        "usuarios actuales" :
                                        ""
                            }
                            trendChangePercent={0}
                        />
                    </Grid>
                    <Grid item>
                        <KPICard
                            language={language}
                            size={'l'}
                            chartType={"bar"}
                            data={companiesUnderIndustryData}
                            color={colors.orange}
                            xDataKey={"industry"}
                            yDataKeys={["companies"]}
                            title={
                                language === "english" ?
                                    "Companies by Industry (Fake Data)" :
                                    language === "español" ?
                                        "Compañías por industria (datos falsos)" :
                                        ""
                            }
                            trendChangePercent={2.4}
                            fixed
                        />
                    </Grid>
                    <Grid item>
                        <KPICard
                            language={language}
                            size={'l'}
                            chartType={"bar"}
                            data={postingsByIndustryData}
                            color={colors.yellow}
                            xDataKey={"industry"}
                            yDataKeys={["total_publications"]}
                            title={
                                language === "english" ?
                                    "Job Postings by Industry" :
                                    language === "español" ?
                                        "Publicaciones de trabajo por industria" :
                                        ""
                            }
                            trendChangePercent={-4}
                            fixed
                        />
                    </Grid>
                    <Grid item>
                        <KPICard
                            language={language}
                            size={'s'}
                            chartType={"line"}
                            data={postingsOverTimeData}
                            color={colors.green}
                            xDataKey={timestampKeyName}
                            yDataKeys={["total_publications"]}
                            metric={getLatestValue(postingsOverTimeData, "total_publications")}
                            trendChangePercent={''}
                            metricDescription={
                                language === "english" ?
                                    "current publications" :
                                    language === "español" ?
                                        "publicaciones actuales" :
                                        ""
                            }
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                item
                padding={1}
                width="100%"
            // border="4px solid black"
            >
                <Datatable
                    columns={companiesUserTableColumns}
                    rows={companiesUserTableRows}
                    hiddenColumns={["_id"]}
                />
            </Grid>
            <Modal
                open={isModalOpen}
                onClose={handleModalToggle}

            >
                <Box sx={modalStyle}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    // sx={{ border: "1px solid limegreen" }}
                    >
                        {selectedRecruiters.map((recruiterObject: any, recruiterIndex: number) => (
                            <Grid
                                item
                                key={`recruiter-grid-item-${recruiterIndex}`}
                                sx={{
                                    width: "100%",
                                    // border: "1px solid magenta" 
                                }}
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="left"
                                    alignItems="center"
                                    // sx={{ border: "1px solid orange" }}
                                    wrap="nowrap"
                                >
                                    <Grid
                                        item
                                        padding={2}
                                    // sx={{ border: "1px dashed white" }}
                                    >
                                        <Avatar
                                            key={`avatar-${recruiterIndex}`}
                                            {...(recruiterObject.profile_img_url ? /* If recruiter has a profile picture: */
                                                { src: recruiterObject.profile_img_url } // create avatar from profile picture
                                                :
                                                stringAvatar(recruiterObject.name) // create avatar from initials
                                            )}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        sx={{
                                            flexGrow: 1,
                                            // border: "1px solid yellow" 
                                        }}
                                    >
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        // sx={{ border: "1px solid purple" }}
                                        >
                                            <Grid
                                                item
                                                sx={{
                                                    maxWidth: "calc(100%/3)",
                                                    overflowWrap: 'break-word',
                                                    // border: "1px dashed white" 
                                                }}
                                            >
                                                {recruiterObject.name}
                                            </Grid>
                                            <Grid
                                                item
                                                sx={{
                                                    maxWidth: "calc(100%/3)",
                                                    overflowWrap: 'break-word',
                                                    // border: "1px dashed white", 
                                                }}
                                            >
                                                {recruiterObject.phone}
                                            </Grid>
                                            <Grid
                                                item
                                                sx={{
                                                    maxWidth: "calc(100%/3)",
                                                    overflowWrap: 'break-word',
                                                    // border: "1px dashed white", 
                                                }}
                                            >
                                                {recruiterObject.email}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Modal>
        </Grid>
    )
}