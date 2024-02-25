import React,{ useState } from "react";

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

function SuccessSubmit() {
  const [ setValues] = useState(initialData);
  const [ setSuccessSubmit] = useState(false);
  const [ setValidationErrors] = useState({});

  function backToForm() {
    setSuccessSubmit(false);
    setValues(initialData);
    setValidationErrors({});
  }

  return (
    <div className="success-container">
      <h1 className="ss-h1">Success Submit 🚀🚀🚀</h1>
      <h2 className="ss-h2">Thank you for your feedback.</h2>
      <button className="btn-successsubmit" onClick={backToForm}>
        Back To Form
      </button>
    </div>
  );
}

export default SuccessSubmit;
