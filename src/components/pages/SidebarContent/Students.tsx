import { useEffect, useState } from "react";
import KPICard from "../../organisms/KPICard";
import { Grid } from '@mui/material';
import khobleAPI from "../../../api/khobleAPI";
import Datatable from "../../molecules/Datatable";

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



export default function Students({ language }: any) {
    // Dummy data:
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


    // Constants and variables:
    // KPI data:
    const [studentsOverTime, setStudentsOverTime] = useState<any>(null);
    const [studentsByIndustryData, setStudentsByIndustryData] = useState<any>(null);
    const [studentsTableRows, setStudentsTableRows] = useState<any>(null);
    const [studentsTableColumns, setStudentsTableColumns] = useState<any>(null);
    const timestampKeyName = "timestamp"; // the name of the key that has to do with timestamps in the objects from the API responses

    const [isLoading, setIsLoading] = useState(true) // true by default to display the wrapper until the API calls are done

    // Functions:
    // Array ordering function by key name:
    function compareTimestamps(timestampKeyName: string) {
        return function (a: any, b: any) {
            const dateA = new Date(a[timestampKeyName]);
            const dateB = new Date(b[timestampKeyName]);
            return dateA.getTime() - dateB.getTime();
        };
    }

    // API calls:
    useEffect(() => {
        const fetchStudentsOverTime = async () => {
            try {
                const response = await khobleAPI.get("/dashboard/student/registered-in-time"); // make API call
                const rawData = await response.data; // extract data
                if (rawData) { // if property was found
                    let myData = rawData.studentsRegisteredInTime;
                    setStudentsOverTime(myData);
                } else {
                    throw new Error(`Response has no property 'data'`); // raise error explaining property couldn't be found
                }
            } catch (error) {
                console.error(error); // raise error explaining inability to connect to the endpoint 
            }
        };

        const fetchStudentsByIndustry = async () => {
            try {
                const response = await khobleAPI.get("/dashboard/student/by-industry"); // make API call
                const responseProperty = "data" // specify the property of the response we want to extract
                const rawData = await response[responseProperty]; // extract property
                if (rawData) { // if property was found
                    setStudentsByIndustryData(rawData.studentsByIndustry);
                } else {
                    throw new Error(`Response has no property '${responseProperty}'`); // raise error explaining property couldn't be found
                }
            } catch (error) {
                console.error(error); // raise error explaining inability to connect to the endpoint 
            }
        };

        const fetchStudentsUserTableData = async () => {
            try {
                const response = await khobleAPI.get("/dashboard/student"); // make API call
                const responseProperty = "data" // specify the property of the response we want to extract
                const rawData = await response[responseProperty]; // extract property
                if (rawData) { // if property was found
                    var columns: any = []; // auxiliary array to save the student table columns
                    var rows: any = []; // auxiliary array to save the student table rows
                    rawData.students.map((student: any, userIndex: any) => { // for every student
                        let shouldSaveColumns = userIndex===0 // flag to save the columns only on first iteration
                        let rowObject: any = {"id": userIndex} // auxiliary object build based on the current student's props
                        for(const propName in student){ // for every student property
                            if (shouldSaveColumns) columns.push({"field": propName, "flex": 1}) // store columns if userIndex is 0
                            rowObject = {...rowObject, [propName]: student[propName]} // add the prop-value pair
                        }
                        if (shouldSaveColumns) setStudentsTableColumns(columns) // save columns
                        rows.push(rowObject) // store row object
                    })
                    setStudentsTableRows(rows) // save rows
                } else {
                    throw new Error(`Response has no property '${responseProperty}'`); // raise error explaining property couldn't be found
                }
            } catch (error) {
                console.error(error); // raise error explaining inability to connect to the endpoint 
            }
        };

        // Main KPI call:
        const fetchKPIData = async () => {
            setIsLoading(true);
            try {
                await Promise.all([ // ensures all the calls are finished before proceeding
                    fetchStudentsOverTime(),
                    fetchStudentsByIndustry(),
                    fetchStudentsUserTableData()
                ]);
            } catch (error) {
                console.error(error); // handle error
            } finally {
                setIsLoading(false);
            }
        };

        fetchKPIData(); // make main call
    },
        [] // empty array for 2nd argument indicates that useEffect will only run once after the initial render, not after re-renders as well
    );

    if (isLoading || studentsOverTime === null || studentsByIndustryData === null || studentsOverTime === null) {
        return <div>Loading...</div>;
    }

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
                    data={studentsOverTime}
                    color={colors.lile}
                    xDataKey={timestampKeyName}
                    yDataKeys={["students"]}
                    metric={getLatestValue(studentsOverTime, "students")}
                    metricDescription={
                        language === "english" ?
                            "Current Users" :
                            language === "español" ?
                                "Usuarios actuales" :
                                ""
                    }
                    trendChangePercent={''}
                />
            </Grid>
            <Grid item>
                <KPICard
                    language={language}
                    size={'l'}
                    chartType={"bar"}
                    data={studentsByIndustryData}
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
                    trendChangePercent={0}
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
                            "Students by Semester (Fake Data)" :
                            language === "español" ?
                                "Estudiantes por semestre (datos falsos)" :
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
                            "Students by Major (Fake Data)" :
                            language === "español" ?
                                "Estudiantes por carrera (datos falsos)" :
                                ""
                    }
                    color={colors.green}
                    xDataKey={"major"}
                    yDataKeys={["students"]}
                    trendChangePercent={2.4}
                    fixed
                />
            </Grid>
            <Datatable
                rows={studentsTableRows}
                columns={studentsTableColumns}
            />
        </Grid>
    )
}