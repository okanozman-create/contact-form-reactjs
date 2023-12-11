import { useState, useEffect } from "react";
import * as yup from "yup";
import Select from "react-select";
import Form from "./Form";






export default function App() {
  
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(  {value: '', label: '---Choose Country---'}); 




  const [validationErrors, setValidationErrors] = useState({});
 
  const [values, setValues] = useState({ 
  firstName: "",
  lastName: "",
  email: "",
  mobileNumber: "",
  birth: "",
  password: "",
  selectedProduct: "",
  selectedGender: "",
  feedback: "",});





  const userSchema = yup.object().shape({
    firstName: yup.string().required("FirstName is required"),
    lastName: yup.string().required("LastName is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is Required"),
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
      const validatedData = await userSchema.validate(formData,  {
        abortEarly: false,
      });
      console.log("Validation successful:", validatedData);
      console.log("Form submitted");


      const response = await fetch("https://epqxgnoita.execute-api.eu-north-1.amazonaws.com/newnewstage/contact-form", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         },
        body: JSON.stringify(validatedData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Server response:', responseData);
      
      } else {
        console.error('Failed to submit form data:', response.statusText);
        
      }
  

    
    } catch (error) {
      const errors = {};
      error.inner.forEach((err) => {
        errors[err.path] = err.message;
      });
  console.error("Error:", errors)
setValidationErrors(errors)
    }

  }



function handleDeleteForm () {

setValues({ firstName: "",
lastName: "",
email: "",
mobileNumber: "",
birth: "",
password: "",
selectedProduct: "",
selectedGender: "",
feedback: "",});

setSelectedCountry( 
  {value: '', label: '---Choose Country---'});


  setTimeout(() => {
    setValidationErrors({});
  }, 0)

}


const CountrySelect = () => {


  // useEffect(() => {
  // async function fetchData()  {
  //     try {
  //       const response = await fetch(
  //         "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
  //       );
  //       const data = await response.json();

  //       setCountries(data.countries);
  //       setSelectedCountry({ value: '', label: '---Choose Country---' });
  //     } catch (error) {
  //       console.error("Error fetching country data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);


useEffect(() => {
     fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code",
   )
      .then((response) => response.json())
      .then((data) => {
setCountries(data.countries);
    setSelectedCountry({value: '', label: '---Choose Country---'});
      
       });
   }, []);


  return (
    <Select
      options={countries}
      value= {selectedCountry} 
       onChange={(a) => setSelectedCountry(a)}
     />
  );
};


  return (
    <div className="App">
      <h1>Contact Form</h1>
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









