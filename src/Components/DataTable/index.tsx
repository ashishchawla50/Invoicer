import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

const DataTable = (props: any) => {
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <DataGrid
        rows={props?.rows || []}
        columns={props.columns || []}
        pageSize={5}
      />
    </div>
  );
};
export default React.memo(DataTable);
