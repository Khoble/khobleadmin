import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function Datatable({ rows, columns, hiddenColumns }: any) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        initialState={{ // this property is used to set the initial configuration of the component, which we use to set the columns that will be initially hidden
          columns: {
            columnVisibilityModel: Object.fromEntries(hiddenColumns.map((columnName: any) => [columnName, false] /* unpack every hidden-column name */))
          },
        }}
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