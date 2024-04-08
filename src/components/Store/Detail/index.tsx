import React, { useEffect, useState} from "react";
import { Grid, TextField} from "@mui/material";
import { connect } from "react-redux";
import { Card } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import * as actionCreators from "../../../state/action Creator/storeAction";
const DetailStore = ({ ...props }) => {
  const [selectedStore, setselectedStore] = useState<any>(
    props.selectedStore
  );
  console.log(selectedStore)
  console.log("stores")
  return (
    <div className="insidefrontcontainer">
      <Card
        title="Detail for Store"
        extra={
          <a onClick={props.closeedit}>
            <CloseCircleOutlined translate={undefined} />
          </a>
        }
      >
        <Grid alignItems="left">
        <form>
     
      <TextField 
      label="Store Name"
      value={selectedStore?.storeName || ""}
      />
      <TextField 
      label="Store Desription"
      value={selectedStore?.storeDescription || ""}
      />
      <TextField 
      label="Store Country"
      value={selectedStore?.storeCountry || ""}
      />
      <TextField 
      label="Store City"
      value={selectedStore?.storeCity || ""}
      />
      <TextField 
      label="Store Location"
      value={selectedStore?.storeLocation || ""}
      />
    </form> 
        </Grid>

      </Card>
    </div>
  );
};

 export default connect()(DetailStore as any);