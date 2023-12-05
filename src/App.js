import { useState, useEffect } from "react";
import * as yup from "yup";
import Select from "react-select";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",

    birth: "",
    password: "",
    selectedProduct: null,
    selectedGender: null,
    feedback: "",
    country: {selectedCountry},
  });

  // const countries = ['--Choose Country--', 'Turkey', 'Germany', 'United States', 'France', 'Italy', 'Spain'];

  // useEffect(() => {
  //   fetch(
  //     "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data)
  //       const dataCountry = data.countries
  //       setCountries(dataCountry);
  //       console.log(countries)
  //        setSelectedCountry(data.userSelectValue);
  //     });
  // }, []);

  const CountrySelect = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({});

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
        value={selectedCountry}
         onChange={(selectedOption) => setSelectedCountry(selectedOption)}
        // onChange={(e) => {
        //   setValues((values) => ({
        //     ...values,
        //     // country: e.target.value
        //   }));
        //   // setValues(e.target.value)
        // }}
      />
    );
  };

  const userSchema = yup.object().shape({
    firstName: yup.string().required("firstName is required"),
    lastName: yup.string().required("lastName is required"),
    email: yup.string().email().required("Email is required"),
    mobileNumber: yup.string(),
    country: yup.string().required("Country is required"),
    birth: yup.date().required("Birth date is required"),
    password: yup.string().required("Required"),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    // )

    selectedProducts: yup.array().min(1, "Select at least one product"),
    selectedGender: yup.string().oneOf(["Male", "Female"], "Select a gender"),
    feedback: yup.string().required("Feedback is required"),
  });


  async function handleSubmit(e) {
    e.preventDefault();

    const formData = { values };
    console.log(formData);
    console.log(countries);

    try {
      const validatedData = await userSchema.validate(values, {
        abortEarly: false,
      });
      console.log("Validation successful:", validatedData);

      // Do something with validatedData, e.g., send it to the server
      // ...
    } catch (error) {
      const errors = {};
      error.inner.forEach((err) => {
        errors[err.path] = err.message;
      });
      setValidationErrors(errors);
      console.error("Validation error:", errors);
      // Handle validation errors (display error messages, etc.)
    }
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
        setSelectedCountry={selectedCountry}
        setCountries={setCountries}
        setValidationErrors={setValidationErrors}
        setValues={setValues}
        handleSubmit={handleSubmit}
        countrySelect={CountrySelect}
      />
    </div>
  );
}

function Form({
  countries,
  selectedCountry,
  validationErrors,
  values,
  setCountries,
  setSelectedCountry,
  setValidationErrors,
  setValues,
  handleSubmit,
  countrySelect,
}) {
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="container">
          <div
            className={`label-input-group ${
              validationErrors.firstName && "error"
            }`}
          >
            <label htmlFor="orange">First Name</label>

            <input
              id="orange"
              type="text"
              name="firstname"
              value={values.firstName}
              onChange={(e) => {
                setValues((values) => ({
                  ...values,
                  firstName: e.target.value,
                }));
                // setValues(e.target.value)
              }}
            />

            {validationErrors.firstName && (
              <div className="error-container">
                <span className="error-msg">{validationErrors.firstName}</span>
              </div>
            )}
          </div>

          <div className="label-input-group">
            <label htmlFor="banana">Last Name</label>
            <input
              id="banana"
              type="text"
              name="lastname"
              value={values.lastName}
              onChange={(e) => {
                setValues((values) => ({
                  ...values,
                  lastName: e.target.value,
                }));
                // setValues(e.target.value)
              }}
            />
          </div>

          <div className="label-input-group">
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
          </div>

          <div className="label-input-group " id="gender">
            <label>Gender</label>
            <label htmlFor="milk">
              <input
                id="milk"
                type="radio"
                name="radio"
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
                name="radioo"
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

          <div className="label-input-group">
            <label htmlFor="lemon">Mobile Number</label>
            <input
              id="lemon"
              type="text"
              name="mobilenumber"
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

          <div className="label-input-group">
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
          </div>

          <div className="label-input-group">
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
          </div>

          <div className="label-input-group" id="checkbox">
            <label>Your Product</label>

            <label>
              <input
                type="checkbox"
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

            <label>
              <input
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
          </div>

          <div className="label-input-group">
            <label htmlFor="plum">Country</label>
            <div className="countrySelect">
              {countrySelect({
                countries,
                selectedCountry,
                values,
                setValues,
              })}
            </div>
          </div>

          <div className="label-input-group">
            <label htmlFor="pear">Product Feedback</label>
            <textarea
              placeholder="Your comment..."
              id="pear"
              value={values.address}
              onChange={(e) => {
                setValues((values) => ({
                  ...values,
                  feedback: e.target.value,
                }));
              }}
            />
          </div>

          <div className="btn-container">
            <button className="submit">Submit</button>
            <button className="reset">Undo</button>
          </div>
        </div>
      </form>
    </div>
  );
}
