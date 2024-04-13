import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import * as actionCreators from "../../../state/action Creator/productAction";
import * as actionStore from "../../../state/action Creator/storeAction";
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

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';

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
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
   
    const onFetchAllSuccess = () => {
      setIsLoading(false);
    };
  
    const onFetchAllError = () => { 
      setIsLoading(false);
    };
    useEffect(() => {
      props.fetchAlls(onFetchAllSuccess, onFetchAllError);
    });
    
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
       props.fetchProduct(onFetchAllSuccess, onFetchAllError);
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
       props.fetchProduct(onFetchAllSuccess, onFetchAllError);
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
        expiryDate: Yup.date().min(new Date(), "Expiry Date must be greater than the current date").required("Expiry Date is required")
    });
      const formik = useFormik({
        initialValues: selectedProduct,
        onSubmit: async (values) => {
          console.log("Form submitted with values:", values);
          console.log("Current viewMode:", viewMode);
          if (props.viewMode === "new")
            props.createProduct(values, onCreateSuccess, onCreateError);
          else
              props.updateProduct(
                selectedProduct.id,
                values,
                onUpdateSuccess,
                onUpdateError
              );
        },
         validationSchema: validationSchema,
      });
      const [value, setValue] = useState(dayjs());

      const handleDateChange = (newValue: any) => {
          setValue(newValue);
          formik.setFieldValue("expiryDate", newValue.format("YYYY-MM-DD"));
  };
        
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
      select
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
      >{props.storestates.map((item: any) => (
        <MenuItem key={item.storeName} value={item.storeName}>
          {item.storeName}
        </MenuItem>))}
      </TextField>
         
      
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker', 'DatePicker']}>
          <div>
            <DatePicker
            label="Expire Date"
            value={value}
            onChange={handleDateChange}
            name="expiryDate"
            />
            {formik.touched.expiryDate && formik.errors.expiryDate && (
            <div style={{ color: 'red' }}>
              {String(formik.errors.expiryDate)}
            </div>
              )}
          </div>
        </DemoContainer>
      </LocalizationProvider>
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
    storestates: state.STORE_REDUCER.storestates,
  });
  
  const mapActionsToProps = {
    fetchAlls: actionStore.fetchAlls,
    createProduct: actionCreators.create,
    updateProduct: actionCreators.update,
    fetchProduct : actionCreators.fetchAlls
  };
export default connect( mapStateToProps, mapActionsToProps )(CreateProduct as any);