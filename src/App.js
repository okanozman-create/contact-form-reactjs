import { useState, useEffect } from "react";
import * as yup from "yup";
import Select from "react-select";






export default function App() {
  
  const [countries, setCountries] = useState([]);
  // console.log(countries)
  const [selectedCountry, setSelectedCountry] = useState( {value: '', label: '---Choose Country---'}); 
  // console.log(selectedCountry)
  const [validationErrors, setValidationErrors] = useState({});
  console.log()

  const [values, setValues] = useState({ firstName: "",
  lastName: "",
  email: "",
  mobileNumber: "",
  birth: "",
  password: "",
  selectedProduct: null,
  selectedGender: null,
  feedback: "",});



  const CountrySelect = () => {
   

    useEffect(() => {
      fetch(
        "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code",
      )
        .then((response) => response.json())
        .then((data) => {
          setCountries(data.countries);
          setSelectedCountry(data.userSelectValue);
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

  const userSchema = yup.object().shape({
    firstName: yup.string().required("FirstName is required"),
    lastName: yup.string().required("LastName is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is Required"),
    birth: yup.string().required("Birth date is required"),
    selectedCountry:yup.object(),
    feedback: yup.string().required("Feedback is required"),
    selectedProducts: yup.array().min(1, "Select at least one product"),
            // .matches(
    //    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    //  ),

    mobileNumber: yup.string(),
    selectedGender: yup.string().oneOf(["Male", "Female"], "Select a gender"),
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
          // Add any additional headers if required
        },
        body: JSON.stringify(validatedData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Server response:', responseData);
        // Do something with the server response if needed
      } else {
        console.error('Failed to submit form data:', response.statusText);
        // Handle the error appropriately (e.g., show an error message to the user)
      }
  


      // Do something with validatedData, e.g., send it to the server
      // ...
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
selectedProduct: null,
selectedGender: null,
feedback: "",});

setSelectedCountry( 
  {value: '', label: '---Choose Country---'});


  setTimeout(() => {
    setValidationErrors({});
  }, 0)


   }


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









function Form({
  countries,
  selectedCountry,
  validationErrors,
  values,
  setValues,
  handleSubmit,
  countrySelect,
  handleDeleteForm,


}) {
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="container">

          <div
            className={`label-input-group ${
              validationErrors.firstName  && "error"
            }`}
          >
            <label htmlFor="orange">First Name</label>

            <input
              id="orange"
              type="text"
              name="firstName"
              value={values.firstName}
              onChange={(e) => {
                setValues((values) => ({
                  ...values,
                  firstName: e.target.value,
                }));
                // setValues(e.target.value)
              }}
            />

            {validationErrors.firstName &&  (
              <div className="error-container">
                <span className="error-msg">{validationErrors.firstName}</span>
              </div>
            )}
          </div>


          <div
            className={`label-input-group ${
              validationErrors.lastName  &&  "error"
            }`}
          >
           <label htmlFor="banana">Last Name</label>
            <input
              id="banana"
              type="text"
              name="lastName"
              value={values.lastName}
              onChange={(e) => {
                setValues((values) => ({
                  ...values,
                  lastName: e.target.value,
                }));
                // setValues(e.target.value)
              }}
            />
              {validationErrors.lastName  && (
              <div className="error-container">
                <span className="error-msg">{validationErrors.lastName}</span>
              </div>
            )}
          </div>




          <div
            className={`label-input-group ${
              validationErrors.birth  &&  "error"
            }`}
          >
            <label htmlFor="apple">Date of Birth</label>
            <input
              id="apple"
              type="date"
              name="birth"
              value={values.birth}
              onChange={(e) => {
                setValues((values) => ({
                  ...values,
                  birth: e.target.value,
                }));
              }}
            />
              {validationErrors.birth &&  (
              <div className="error-container">
                <span className="error-msg">{validationErrors.birth}</span>
              </div>
            )}
          </div>




          <div
          className="label-input-group"
            id="gender"
          >
            <label>Gender</label>
            <label htmlFor="milk">
              <input
                id="milk"
                type="radio"
                name="female"
                value={"Female"}
                // checked = {selectedGender === "Female"}
                checked={values.selectedGender === "Female"}
                onChange={(e) => {
                  setValues((values) => ({
                    ...values,
                    selectedGender: e.target.value,
                  }));
                }}
              />
              Female
            </label>

            <label htmlFor="kiwi">
              <input
                id="kiwi"
                type="radio"
                name="male"
                value={"Male"}
                checked={values.selectedGender === "Male"}
                onChange={(e) => {
                  setValues((values) => ({
                    ...values,
                    selectedGender: e.target.value,
                  }));
                }}
              />
              Male
            </label>

         
</div>

         
         
          <div
           className="label-input-group"
          >
            <label htmlFor="lemon">Mobile Number</label>
            <input
              id="lemon"
              type="text"
              name="mobileNumber"
              value={values.mobileNumber}
              onChange={(e) => {
                setValues((values) => ({
                  ...values,
                  mobileNumber: e.target.value,
                }));
                // setValues(e.target.value)
              }}
            />
          </div>


          <div
            className={`label-input-group ${
              validationErrors.email  &&  "error"
            }`}
          >
            <label htmlFor="melon">Email</label>
            <input
              id="melon"
              type="email"
              name="email"
              value={values.email}
              onChange={(e) => {
                setValues((values) => ({
                  ...values,
                  email: e.target.value,
                }));
              }}
            />

{validationErrors.email &&  (
              <div className="error-container">
                <span className="error-msg">{validationErrors.email}</span>
              </div>
            )}
</div>



          <div
            className={`label-input-group ${
              validationErrors.password  &&  "error"
            }`}
          >
            <label htmlFor="cherry">Password</label>
            <input
              id="cherry"
              type="password"
              name="password"
              value={values.password}
              onChange={(e) => {
                setValues((values) => ({
                  ...values,
                  password: e.target.value,
                }));
              }}
            />
   {validationErrors.password &&  (
              <div className="error-container">
                <span className="error-msg">{validationErrors.password}</span>
              </div>
            )}
</div>


<div
            className={`label-input-group ${
              validationErrors.selectedProducts  &&  "error"
            }`}
id="checkbox"
          >
            <label >Your Product</label>

          

            <label className="product" >
              <input
              
              name="XPad"
                type
                ="checkbox"
                // checked = {hobbies.football}
                // onChange={() => setHobbies({ ...hobbies, football: !hobbies.football })}
                value={"XPad"}
                checked={values.selectedProduct === "XPad"}
                onChange={(e) => {
                  setValues((values) => ({
                    ...values,
                    selectedProduct: e.target.value,
                  }));
                }}
              />
              XPad
            </label>

          
          
            <label className="product" >
              <input
              
              name="XPadPro"
                type="checkbox"
                value={"XPad Pro"}
                // checked = {selectedHobbies === "Basketball"}
                checked={values.selectedProduct === "XPad Pro"}
                onChange={(e) => {
                  setValues((values) => ({
                    ...values,
                    selectedProduct: e.target.value,
                  }));
                }}
                // checked = {hobbies.basketball}
                // onChange={() => setHobbies({ ...hobbies, basketball: !hobbies.basketball })}
              />
              XPad Pro
            </label>
            {validationErrors.selectedProducts &&  (
              <div className="error-container">
                <span className="error-msg">{validationErrors.selectedProducts}</span>
              </div>
            )}


          </div>
        
        
          <div
            className={`label-input-group ${
              validationErrors.selectedCountry  && "error"
            }`}
          >
            <label htmlFor="plum">Country</label>
            <div className="countrySelect" name="country">
              {countrySelect({
                countries,
                selectedCountry,
                values,
                setValues,
              })}
            </div>
            {validationErrors.selectedCountry &&  (
              <div className="error-container">
                <span className="error-msg">{validationErrors.selectedCountry}</span>
              </div>
            )}
          </div>


          <div
            className={`label-input-group ${
              validationErrors.feedback  &&  "error"
            }`}
          >
            <label htmlFor="pear">Product Feedback</label>
            <textarea
            name="feedback"
              placeholder="Your comment..."
              id="pear"
              value={values.feedback}
              onChange={(e) => {
                setValues((values) => ({
                  ...values,
                  feedback: e.target.value,
                }));
              }}
            />
             {validationErrors.feedback &&  (
              <div className="error-container">
                <span className="error-msg">{validationErrors.feedback}</span>
              </div>
            )}
          </div>

          <div className="btn-container">
            <button className="submit" >Submit</button>
            <button className="reset"  onClick={handleDeleteForm}>Undo</button>
          </div>
        </div>
      </form>
    </div>
  );
}
