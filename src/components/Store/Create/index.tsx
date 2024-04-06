import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import * as actionCreators from "../../../state/action Creator/storeAction";
import * as Yup from "yup";
import { useFormik } from 'formik';
import "../../../css/index.css"
import Button from '@mui/material/Button';
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
    
      const stringRegExp = /^[a-zA-Z_&-_ ]*$/;
      const validationSchema = Yup.object().shape({
        storeName: Yup.string().required("Store name is required").matches(stringRegExp, "Please insert the correct input"),
        storeDescription: Yup.string().required('Store description is required').matches(stringRegExp, "Please insert the correct input"),
        storeCountry: Yup.string().required('Store country is required').matches(stringRegExp, "Please insert the correct input"),
        storeCity: Yup.string().required('Store city is required').matches(stringRegExp, "Please insert the correct input"),
        storeLocation: Yup.string().required('Store location is required').matches(stringRegExp, "Please insert the correct input"),
    });
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
      });
      const onCreateSuccess = () => {
        setNotify({
          isOpen: true,
          message: "Success Alert:- Proposal Type has been successfully Created .",
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
          message: "Success Alert:- Proposal Type has been successfully Updated !",
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
      const formik = useFormik({
        initialValues: selectedStore || initialFieldValues,
        onSubmit: (values) => {
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
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Store Name</label>
        <input type="text" id="storeName"  {...formik.getFieldProps('storeName')} placeholder="Store Name" />
        {formik.touched.storeName && typeof formik.errors.storeName === 'string' && (
        <div className="error">{formik.errors.storeName}</div>
        )}
      </div>
      
      <div>
        <label>Store Description</label>
<input type="text"  id="description" {...formik.getFieldProps('storeDescription')} placeholder="Store Description" />
        {formik.touched.storeDescription && typeof formik.errors.storeDescription === 'string' && (
        <div className="error">{formik.errors.storeDescription}</div>
        )}
      </div>
      
      <div>
        <label>Store Country</label>
        <input type="text"  id="country" {...formik.getFieldProps('storeCountry')} placeholder="Store Country" />
        {formik.touched.storeCountry && typeof formik.errors.storeCountry === 'string' && (
        <div className="error">{formik.errors.storeCountry}</div>
        )}
      </div>
      
      <div>
        <label>Store City</label>
        <input type="text"  id="city" {...formik.getFieldProps('storeCity')} placeholder="Store City" />
        {formik.touched.storeCity && typeof formik.errors.storeCity === 'string' && (
        <div className="error">{formik.errors.storeCity}</div>
        )}
      </div>
      
      <div>
        <label>Store Location</label>
        <input type="text" id="location" {...formik.getFieldProps('storeLocation')} placeholder="Store Location" />
        {formik.touched.storeLocation && typeof formik.errors.storeLocation === 'string' && (
        <div className="error">{formik.errors.storeLocation}</div>
        )}
      </div>
      <Button type="submit" id="button" variant="contained" color="success">
      Submit</Button>
    </form>
  );
};
const mapStateToProps = (state: any) => ({
    storestates: state.STORE_REDUCER.storestates,
  });
  
  const mapActionsToProps = {
    createStore: actionCreators.create,
    
  };

  
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(CreateStore as any);