import React, { useEffect, useState} from "react";
import { Grid, TextField} from "@mui/material";
import { connect } from "react-redux";
import { Card } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import * as actionCreators from "../../../state/action Creator/productAction";
const DetailProduct = ({ ...props }) => {
  const [selectedProduct, setselectedProduct] = useState<any>(
    props.selectedProduct
  );
  console.log(selectedProduct)
  console.log("products")
  return (
    <div className="insidefrontcontainer">
      <Card
        title="Detail for Product"
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
      value={selectedProduct?.storeName || ""}
      />
      <TextField 
      label="Product Name"
      value={selectedProduct?.productName || ""}
      />
      <TextField 
      label="Product Desription"
      value={selectedProduct?.productDescription || ""}
      />
      <TextField 
      label="Product Serial Number"
      value={selectedProduct?.productSerialNo || ""}
      />
      <TextField 
      label="Product Shelf Number"
      value={selectedProduct?.shelfNo || ""}
      />
      <TextField 
      label="Product Shelf Name"
      value={selectedProduct?.shelfName || ""}
      /><TextField 
      label="Expire Date"
      value={selectedProduct?.expiryDate || ""}
      />
    </form> 
        </Grid>

      </Card>
    </div>
  );
};

 export default connect()(DetailProduct as any);