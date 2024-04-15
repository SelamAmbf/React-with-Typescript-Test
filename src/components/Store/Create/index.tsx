import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import * as actionCreators from "../../../state/action Creator/storeAction";
import * as Yup from "yup";
import { useFormik } from 'formik';
import "../../../css/index.css"
import { Card } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Notification from "../../../unicontrols/Notification";
interface STORES {
    id: number;
    storeName: string;
    storeDescription: string;
    storeCountry: string;
    storeCity: string;
    storeLocation: string;
}

const initialFieldValues: STORES = {
        id: Math.floor(Math.random() * 1000), // generate a random id
        storeName: "",
        storeDescription: "",
        storeCountry: "",
        storeCity: "",
        storeLocation: "",
        
};

const CreateStore = ({...props}) => {
    const [viewMode, setViewMode] = useState("new");
    const [selectedStore, setselectedStore] = useState<any>(
      props.selectedStore
    );
    useEffect(() =>{
        setViewMode(props.viewMode);
        setselectedStore(props.selectedStore);
        if (props.viewMode == "new") {
          formik.resetForm({
            values: initialFieldValues,
          });
        }
    },[props.viewMode,props.selectedStore]);
    
     
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
      });
      const onCreateSuccess = () => {
        setNotify({
          isOpen: true,
          message: "Success Alert:- Store has been successfully Created .",
          type: "success",
        });
        setTimeout(()=>{
          props.closeedit();
       },2000)
      //  props.fetchStore(onFetchAllSuccess, onFetchAllError);
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
          message: "Success Alert:- Store has been successfully Updated !",
          type: "success",
        });
        setTimeout(()=>{
          props.closeedit();
       },2000)
      //  props.fetchStore(onFetchAllSuccess, onFetchAllError);
      };
      const onUpdateError = (action: any) => {
        setNotify({
          isOpen: true,
          message: action,
          type: "error",
        });
      };
      const stringRegExp = /^[a-zA-Z_&-_ ]*$/;
      const validationSchema = Yup.object().shape({
        storeName: Yup.string().required("Store name is required").matches(stringRegExp, "Please insert the correct input"),
        storeDescription: Yup.string().required('Store description is required').matches(stringRegExp, "Please insert the correct input"),
        storeCountry: Yup.string().required('Store country is required').matches(stringRegExp, "Please insert the correct input"),
        storeCity: Yup.string().required('Store city is required').matches(stringRegExp, "Please insert the correct input"),
        storeLocation: Yup.string().required('Store location is required').matches(stringRegExp, "Please insert the correct input"),
    });
      const formik = useFormik({
        initialValues: selectedStore,
        onSubmit:  (values) => {
          console.log("Form submitted with values:", values);
          console.log("Current viewMode:", viewMode);
          if (props.viewMode === "new")
           props.createStore(values, onCreateSuccess, onCreateError);
          else
            props.updateStore(
                selectedStore.id,
                values,
                onUpdateSuccess,
                onUpdateError
              );
        },
         validationSchema: validationSchema,
      });
      
        
  return (
   <div> <Card
        title={viewMode === "new" ? "Create Store" : "Update Store"}
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
      id="description"
      label="Store Description"
      multiline
      {...formik.getFieldProps("storeDescription")}
      helperText={
        formik.touched.storeDescription &&
        formik.errors.storeDescription
      ? String(formik.errors.storeDescription)
      : ""
      }
      />
      <TextField 
      id="country"
      label="Store Country"
      multiline
      {...formik.getFieldProps("storeCountry")}
      helperText={
        formik.touched.storeCountry &&
        formik.errors.storeCountry
      ? String(formik.errors.storeCountry)
      : ""
      }
      />
      <TextField 
      id="city"
      label="Store City"
      multiline
      {...formik.getFieldProps("storeCity")}
      helperText={
        formik.touched.storeCity &&
        formik.errors.storeCity
      ? String(formik.errors.storeCity)
      : ""
      }
      />
      
      <TextField 
      id="city"
      label="Store Location"
      multiline
      {...formik.getFieldProps("storeLocation")}
      helperText={
        formik.touched.storeLocation &&
        formik.errors.storeLocation
      ? String(formik.errors.storeLocation)
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
    storestates: state.STORE_REDUCER.storestates,
  });
  
  const mapActionsToProps = {
    createStore: actionCreators.create,
    updateStore: actionCreators.update,
  };

  
  export default connect( mapStateToProps, mapActionsToProps )(CreateStore as any);