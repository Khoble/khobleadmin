import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';

const studentTableDummyDataCols = [
  { field: "Full Name", flex: 1 },
  { field: "Phone Number", flex: 1 },
  { field: "Is Hired", flex: 1 },
  { field: "Gender", flex: 1 },
  { field: "Seeking Industry", flex: 1 },
  { field: "Employment Type", flex: 1 },
  { field: "School", flex: 1 },
  { field: "Location", flex: 1 },
  { field: "Major", flex: 1 },
  { field: "Has Worked", flex: 1 }
];

const studentTableDummyDataRows = [
  {
    "id": 0,
    "Full Name": "John Doe",
    "Phone Number": "+1 (123) 456-7890",
    "Is Hired": "Yes",
    "Gender": "Male",
    "Seeking Industry": "Technology",
    "Employment Type": "Full-time",
    "School": "ABC University",
    "Location": "New York City",
    "Major": "Computer Science",
    "Has Worked": "Yes"
  },
  {
    "id": 1,
    "Full Name": "Jane Smith",
    "Phone Number": "+1 (987) 654-3210",
    "Is Hired": "No",
    "Gender": "Female",
    "Seeking Industry": "Finance",
    "Employment Type": "Part-time",
    "School": "XYZ College",
    "Location": "Los Angeles",
    "Major": "Business Administration",
    "Has Worked": "No"
  },
  {
    "id": 2,
    "Full Name": "Alex Johnson",
    "Phone Number": "+1 (555) 123-4567",
    "Is Hired": "Yes",
    "Gender": "Non-binary",
    "Seeking Industry": "Design",
    "Employment Type": "Full-time",
    "School": "DEF Institute",
    "Location": "San Francisco",
    "Major": "Graphic Design",
    "Has Worked": "Yes"
  },
  {
    "id": 3,
    "Full Name": "John Doe",
    "Phone Number": "+1 (123) 456-7890",
    "Is Hired": "Yes",
    "Gender": "Male",
    "Seeking Industry": "Technology",
    "Employment Type": "Full-time",
    "School": "ABC University",
    "Location": "New York City",
    "Major": "Computer Science",
    "Has Worked": "Yes"
  },
  {
    "id": 4,
    "Full Name": "Jane Smith",
    "Phone Number": "+1 (987) 654-3210",
    "Is Hired": "No",
    "Gender": "Female",
    "Seeking Industry": "Finance",
    "Employment Type": "Part-time",
    "School": "XYZ College",
    "Location": "Los Angeles",
    "Major": "Business Administration",
    "Has Worked": "No"
  },
  {
    "id": 5,
    "Full Name": "Alex Johnson",
    "Phone Number": "+1 (555) 123-4567",
    "Is Hired": "Yes",
    "Gender": "Non-binary",
    "Seeking Industry": "Design",
    "Employment Type": "Full-time",
    "School": "DEF Institute",
    "Location": "San Francisco",
    "Major": "Graphic Design",
    "Has Worked": "Yes"
  },
  {
    "id": 6,
    "Full Name": "John Doe",
    "Phone Number": "+1 (123) 456-7890",
    "Is Hired": "Yes",
    "Gender": "Male",
    "Seeking Industry": "Technology",
    "Employment Type": "Full-time",
    "School": "ABC University",
    "Location": "New York City",
    "Major": "Computer Science",
    "Has Worked": "Yes"
  },
  {
    "id": 7,
    "Full Name": "Jane Smith",
    "Phone Number": "+1 (987) 654-3210",
    "Is Hired": "No",
    "Gender": "Female",
    "Seeking Industry": "Finance",
    "Employment Type": "Part-time",
    "School": "XYZ College",
    "Location": "Los Angeles",
    "Major": "Business Administration",
    "Has Worked": "No"
  },
  {
    "id": 8,
    "Full Name": "Alex Johnson",
    "Phone Number": "+1 (555) 123-4567",
    "Is Hired": "Yes",
    "Gender": "Non-binary",
    "Seeking Industry": "Design",
    "Employment Type": "Full-time",
    "School": "DEF Institute",
    "Location": "San Francisco",
    "Major": "Graphic Design",
    "Has Worked": "Yes"
  }
]

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function Datatable({rows, columns}: any) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
        }}
        columns={columns}
        rows={rows}
        hideFooterSelectedRowCount
        slots={{
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}