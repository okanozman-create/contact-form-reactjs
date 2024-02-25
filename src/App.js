import { useState } from "react";
import * as yup from "yup";
import Form from "./components/Form";
import "react-phone-input-2/lib/style.css";
import SuccessSubmit from "./components/SuccessSubmit";
import CountrySelect from "./components/CountrySelect";

const initialData = {
  firstName: "",
  lastName: "",
  email: "",
  mobileNumber: "",
  birth: "",
  password: "",
  selectedProduct: "",
  selectedGender: "",
  feedback: "",
};

const initalValueCountry = { value: "", label: "---Choose Country---" };

export default function App() {
  const [countries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(initalValueCountry);
  const [validationErrors, setValidationErrors] = useState({});
  const [values, setValues] = useState(initialData);
  const [successSubmit, setSuccessSubmit] = useState(false);

  const userSchema = yup.object().shape({
    firstName: yup.string().required("FirstName is required"),
    lastName: yup.string().required("LastName is required"),
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("Password is Required")
      .min(6, "Password must have at least 6 characters"),
    birth: yup.string().required("Birth date is required"),
    selectedCountry: yup.object(),
    feedback: yup.string().required("Feedback is required"),
    selectedProduct: yup.string().required("Select a product required"),
    mobileNumber: yup.string(),
    selectedGender: yup.string(),
  });



  function handleDeleteForm() {
    setValues(initialData);

    setSelectedCountry(initalValueCountry);

    setTimeout(() => {
      setValidationErrors({});
    }, 0);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = { ...values, selectedCountry };

    try {
      const isInitialData = Object.keys(initialData).every(
        (key) => formData[key] === initialData[key]
      );

      if (isInitialData) return;

      const validatedData = await userSchema.validate(formData, {
        abortEarly: false,
      });

      const response = await fetch(
        "https://kufhnbgos4.execute-api.eu-north-1.amazonaws.com/Prod2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validatedData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Server response:", responseData);
      } else {
        console.error("Failed to submit form data:", response.statusText);
      }

      setValues(initialData);
      setSelectedCountry(initalValueCountry);
      setValidationErrors({});
      setSuccessSubmit(true);
    } catch (error) {
      const errors = {};
      error.inner.forEach((err) => {
        errors[err.path] = err.message;
      });

      setValidationErrors(errors);
    }
  }

  return successSubmit ? (
    <SuccessSubmit />
  ) : (
    <div className="App">
      <h1>Contact Form</h1>
      <h3>Is there any issue with your product?</h3>
      <h4>
        Please proceed to submit the <span>form</span> 📃📃📃
      </h4>
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
