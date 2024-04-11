import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import * as actionCreators from "../../../state/action Creator/productAction";
import * as Yup from "yup";
import { useFormik } from 'formik';
import "../../../css/index.css"
import { Card } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Notification from "../../../unicontrols/Notification";
import moment from "moment";
interface PRODUCTS {
    id: number;
    storeName: string;
    productName: string;
    productDescription: string;
    productSerialNo:number;
    shelfNo: number;
    shelfName:string;
    expiryDate: any;
}

const initialFieldValues: PRODUCTS = {
        id: Math.floor(Math.random() * 1000), // generate a random id
        storeName: "",
        productName: "",
        productDescription: "",
        productSerialNo: 0,
        shelfNo: 0,
        shelfName: "",
        expiryDate: moment(new Date()).format("YYYY-MM-DD"),
        
};

const CreateProduct = ({...props}) => {
    const [viewMode, setViewMode] = useState("new");
    const [selectedProduct, setselectedProduct] = useState<any>(
      props.selectedProduct
    );
    useEffect(() =>{
        setViewMode(props.viewMode);
        setselectedProduct(props.selectedProduct);
        if (props.viewMode == "new") {
          formik.resetForm({
            values: initialFieldValues,
          });
        }
    },[props.viewMode,props.selectedProduct]);
    
     
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
      });
      const onCreateSuccess = () => {
        setNotify({
          isOpen: true,
          message: "Success Alert:-  Product has been successfully Created .",
          type: "success",
        });
        setTimeout(()=>{
          props.closeedit();
       },2000)
      };
      const onCreateError = (action: any) => {
        setNotify({
          isOpen: true,
          message: action,
          type: "error",
        });
      };
      const onUpdateSuccess = () => {
        setNotify({
          isOpen: true,
          message: "Success Alert:-  Product has been successfully Updated !",
          type: "success",
        });
        setTimeout(()=>{
          props.closeedit();
       },2000)
      };
      const onUpdateError = (action: any) => {
        setNotify({
          isOpen: true,
          message: action,
          type: "error",
        });
      };
      const stringRegExp = /^[a-zA-Z_&-_ ]*$/;
      const numberRegExp = /^[0-9]+$/;
      const validationSchema = Yup.object().shape({
        storeName: Yup.string().required("Store name is required").matches(stringRegExp, "Please insert the correct input"),
        productName: Yup.string().required('Product Name is required').matches(stringRegExp, "Please insert the correct input"),
        productDescription: Yup.string().required('Product Description is required').matches(stringRegExp, "Please insert the correct input"),
        productSerialNo: Yup.string().required('Product Serial Number is required').matches(numberRegExp, "Please insert the correct input(only numbers allowed)"),
        shelfNo: Yup.string().required('Product Shelf Number is required').matches(numberRegExp, "Please insert the correct input"),
        shelfName: Yup.string().required("Shelf Name is required").matches(stringRegExp, "Please insert the correct input"),
    });
      const formik = useFormik({
        initialValues: selectedProduct,
        onSubmit: (values) => {
          console.log("Form submitted with values:", values);
          console.log("Current viewMode:", viewMode);
          if (props.viewMode === "new")
            props.createProduct(values, onCreateSuccess, onCreateError);
          else
              props.updateStore(
                selectedProduct.id,
                values,
                onUpdateSuccess,
                onUpdateError
              );
        },
         validationSchema: validationSchema,
      });
    
        
  return (
   <div> <Card
        title={viewMode === "new" ? "Create Product" : "Update Product"}
        extra={
          <a onClick={props.closeedit}>
            <CloseCircleOutlined translate={undefined} />
          </a>
        }
      >
    <form onSubmit={formik.handleSubmit}>
    <TextField 
      id="storeName"
      label="Store Name"
      multiline
      {...formik.getFieldProps("storeName")}
      helperText={
        formik.touched.storeName &&
        formik.errors.storeName
      ? String(formik.errors.storeName)
      : ""
      }
      />
      <TextField 
      id="productName"
      label="Product Name"
      multiline
      {...formik.getFieldProps("productName")}
      helperText={
        formik.touched.productName &&
        formik.errors.productName
      ? String(formik.errors.productName)
      : ""
      }
      />
      <TextField 
      id="productDescription"
      label="Product Description"
      multiline
      {...formik.getFieldProps("productDescription")}
      helperText={
        formik.touched.productDescription &&
        formik.errors.productDescription
      ? String(formik.errors.productDescription)
      : ""
      }
      />
      <TextField 
      id="productSerialNo"
      label="Product Serial Number"
      multiline
      {...formik.getFieldProps("productSerialNo")}
      helperText={
        formik.touched.productSerialNo &&
        formik.errors.productSerialNo
      ? Number(formik.errors.productSerialNo)
      : ""
      }
      />
      
      <TextField 
      id="shelfNo"
      label="Product Shelf Number"
      multiline
      {...formik.getFieldProps("shelfNo")}
      helperText={
        formik.touched.shelfNo &&
        formik.errors.shelfNo
      ? Number(formik.errors.shelfNo)
      : ""
      }
      />
      <TextField 
      id="shelfName"
      label="Product Shelf Name"
      multiline
      {...formik.getFieldProps("shelfName")}
      helperText={
        formik.touched.shelfName &&
        formik.errors.shelfName
      ? String(formik.errors.shelfName)
      : ""
      }
      
      />
      <TextField 
      id="expiryDate"
      label="Product Expire Date"
      multiline
      {...formik.getFieldProps("expiryDate")}
      helperText={
        formik.touched.expiryDate &&
        formik.errors.expiryDate
      ? String(formik.errors.expiryDate)
      : ""
      }
      
      />
      
            {viewMode === "new" && (
                <>
                
                <Stack spacing={2} direction="row">
                <Button type="submit" id="button" variant="contained" color="success">
                Submit</Button>
                <Button id="button" variant="contained" color="error" onClick={() => {
                  formik.resetForm({ values: initialFieldValues, }); }}>
                Reset</Button>
                  </Stack>
                </>
                
              )}
              {viewMode === "edit" && (
                <> <Stack spacing={2} direction="row">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Update
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      formik.resetForm({
                        values: initialFieldValues,
                      });
                    }}
                  >
                    Reset
                  </Button> </Stack>
                </>
              )}
     
    </form>  </Card> <Notification notify={notify} setNotify={setNotify} /></div>
  );
};
const mapStateToProps = (state: any) => ({
    productstate: state.PRODUCT_REDUCER.productstate,
  });
  
  const mapActionsToProps = {
    createProduct: actionCreators.create,
    updateProduct: actionCreators.update,
  };
export default connect( mapStateToProps, mapActionsToProps )(CreateProduct as any);