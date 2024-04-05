import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import * as actionCreators from "../../../state/action Creator/storeAction";
import * as Yup from "yup";
import { useFormik } from 'formik';
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
        storeLocation: "",
        storeCity: "",
};

const CreateStore = ({...props}) => {
    const [viewMode, setViewMode] = useState("new");
    console.log("Current viewModessss:", viewMode);
    useEffect(() =>{
        setViewMode(props.viewMode);
        if (props.viewMode == "new") {
          formik.resetForm({
            values: initialFieldValues,
          });
        }
    },[props.viewMode]);
    
      const stringRegExp = /^[a-zA-Z_&-_ ]*$/;
      const validationSchema = Yup.object().shape({
        storeName: Yup.string().required("Store name is required").matches(stringRegExp, "Please insert the correct input"),
        storeDescription: Yup.string().required('Store description is required'),
        storeCountry: Yup.string().required('Store country is required'),
        storeCity: Yup.string().required('Store city is required'),
        storeLocation: Yup.string().required('Store location is required'),
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
      const onSubmit = (values: STORES) => {
        console.log("Form submitted with values:", values);
        console.log("Current viewMode:", viewMode);
        if (viewMode === 'new') {
          // Check if the id is new or exists
          const existingStore = props.storestates.find((store: STORES) => store.id === values.id);
          console.log("Current existingMo:", existingStore);
          if (existingStore) {
            onCreateError('Store with the same ID already exists.');
          } else {
            props.createStore(values);
            onCreateSuccess();
          }
        } 
      };
    
      const formik = useFormik({
        initialValues: initialFieldValues,
        onSubmit,
        validationSchema: validationSchema,
      });
    
        
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Store Name</label>
        <input type="text" 
        id="storeName" 
        name="storeName" 
        value={formik.values.storeName} 
        onChange={formik.handleChange} />
        {formik.touched.storeName && formik.errors.storeName ? ( 
        <div>{formik.errors.storeName}</div>):null}
      </div>

      <div>
        <label>Store Description</label>
        <input type="text" id="storeDescription" name="storeDescription" onChange={formik.handleChange} value={formik.values.storeDescription} />
        {formik.touched.storeDescription && formik.errors.storeDescription && <div>{formik.errors.storeDescription}</div>}
      </div>
      
      <div>
        <label>Store Country</label>
        <input type="text" id="storeCountry" name="storeCountry" onChange={formik.handleChange} value={formik.values.storeCountry} />
        {formik.touched.storeCountry && formik.errors.storeCountry && <div>{formik.errors.storeCountry}</div>}
      </div>
      
      <div>
        <label>Store City</label>
        <input type="text" id="storeCity" name="storeCity" onChange={formik.handleChange} value={formik.values.storeCity} />
        {formik.touched.storeCity && formik.errors.storeCity && <div>{formik.errors.storeCity}</div>}
      </div>
      
      <div>
        <label>Store Location</label>
        <input type="text" id="storeLocation" name="storeLocation" onChange={formik.handleChange} value={formik.values.storeLocation} />
        {formik.touched.storeLocation && formik.errors.storeLocation && <div>{formik.errors.storeLocation}</div>}
      </div>
      <button type="submit">Submit</button>
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