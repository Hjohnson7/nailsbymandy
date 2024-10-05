import React, {useState, useEffect} from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"
// import "./ag-table.module.css"


const AgTable = ({data, cols}) => {

    const [rowData, setRowData] = useState(data)
    const [colDefs, setColDefs] = useState(cols)

    console.log(data)
    return (

        <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
       >
          <AgGridReact
              rowData={rowData}
              columnDefs={colDefs}
          />
        </div>

    )
}


export default AgTable