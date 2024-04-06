import React, { useState} from "react";
import { Grid} from "@mui/material";
import { connect } from "react-redux";
import { Card } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

const DetailStore = ({ ...props }) => {
  const [selectedStore, setselectedStore] = useState<any>(
    props.selectedStore
  );
  
  console.log(selectedStore)
  console.log("stores")
  console.log("props.storestates")
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
      <div>
        <label>Store Name</label>
        <input type="text" id="storeName"  disabled value={selectedStore?.storeName}/>
      </div>
    </form> 
        </Grid>

      </Card>
    </div>
  );
};

export default connect()(DetailStore as any);