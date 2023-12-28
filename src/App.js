import { useState, useEffect } from "react";
import * as yup from "yup";
import Select from "react-select";
import Form from "./Form";
import 'react-phone-input-2/lib/style.css';





const initialData = { 
firstName: "",
lastName: "",
email: "",
 mobileNumber: "",
birth: "",
password: "",
selectedProduct: "",
selectedGender: "",
feedback: "",}

const initalValueCountry = { value: '', label: '---Choose Country---'}



export default function App() {
  
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(initalValueCountry); 
  const [validationErrors, setValidationErrors] = useState({});
  const [values, setValues] = useState(initialData) 
  const [successSubmit, setSuccessSubmit] = useState(false) 

  const userSchema = yup.object().shape({
    firstName: yup.string().required("FirstName is required"),
    lastName: yup.string().required("LastName is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is Required").min(6, "Password must have at least 6 characters"),
    birth: yup.string().required("Birth date is required"),
    selectedCountry:yup.object(),
    feedback: yup.string().required("Feedback is required"),
    selectedProduct: yup.string().required("Select a product required"),
    mobileNumber: yup.string(),
    selectedGender: yup.string(),
});



  async function handleSubmit(e) {
    e.preventDefault();

    const formData = { ...values,selectedCountry };
      console.log(formData);
  
     
try {
      
      const isInitialData = Object.keys(initialData).every(
         key => formData[key] === initialData[key]
       );
    
       if (isInitialData)  return;



   
    const validatedData = await userSchema.validate(formData,  {
         abortEarly: false,
      });
      //  console.log("Validation successful:", validatedData);
  

  
       const response = await fetch("https://epqxgnoita.execute-api.eu-north-1.amazonaws.com/newnewstage/contact-form", {
         method: 'POST',
    headers: {
          'Content-Type': 'application/json', },
         body: JSON.stringify(validatedData),
       });

      if (response.ok) {
         const responseData = await response.json();
         console.log('Server response:', responseData);
           

   

      
       } else {
         console.error('Failed to submit form data:', response.statusText);
        
       }

       setValues(initialData);
       setSelectedCountry(initalValueCountry);
       setValidationErrors({});      
       setSuccessSubmit(SuccessSubmit);
       setSuccessSubmit(true);  
    


    
     } catch (error) {
       const errors = {};
       error.inner.forEach((err) => {
          errors[err.path] = err.message;
      });
  //  console.error("Error:", errors)
  setValidationErrors(errors)

     }

   
}


function backToForm () {
  setSuccessSubmit(false)
  setValues(initialData);
  setValidationErrors({})
}



function handleDeleteForm () {

setValues(initialData);

setSelectedCountry(initalValueCountry);

 setTimeout(() => {
    setValidationErrors({});
  }, 0)

}


const CountrySelect = () => {


   useEffect(() => {
   async function fetchData()  {
       try {
         const response = await fetch(
           "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
       );
         const data = await response.json();

         setCountries(data.countries);
         setSelectedCountry(initalValueCountry);
       } catch (error) {
        //  console.error("Error fetching country data:", error);
       }
     };

     fetchData();
   }, []);



  





return (
    <Select
      options={countries}
      value= {selectedCountry} 
       onChange={(a) => setSelectedCountry(a)}
     />
  );
};


function SuccessSubmit () {


  return (
<div className="success-container">
      <h1 className="ss-h1">Success Submit  🚀🚀🚀</h1>
     <h2 className="ss-h2">Thank you for your feedback.</h2>
     <button className="btn-successsubmit"  onClick={backToForm}>Back To Form </button>
   </div>

  );
}



  return (
    successSubmit ? <SuccessSubmit/> :
     <div className="App">
      <h1>Contact Form</h1>
      <h3>Is there any issue with your product?</h3>
      <h4>Please proceed to submit the <span>form</span> 📃📃📃</h4>
      <h2>Get in touch with us</h2>
    
      <Form
    
        countries={countries}
        selectedCountry={selectedCountry}
        validationErrors={validationErrors}
        values={values}
        setValues={setValues}
        handleSubmit={handleSubmit}
        countrySelect={CountrySelect}
        handleDeleteForm={handleDeleteForm}
       
      
      />
    </div>
  );
}









