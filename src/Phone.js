<<<<<<< HEAD
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
=======
// import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
>>>>>>> 5b69c35664a59c8f65c2ee7163f4e07e74bb8161

const Phone = ({ values, setValues }) => {
  const handlePhoneChange = (phone) => {
    setValues((prevValues) => ({
      ...prevValues,
      mobileNumber: phone,
    }));
  };

  return (
    <div className="label-input-group">
      <label htmlFor="lemon">Mobile Number</label>
      <div className="phone">
        <PhoneInput
          inputProps={{
            id: "lemon",
            name: "mobileNumber",
          }}
          country={"tr"}
          value={values.mobileNumber}
          onChange={handlePhoneChange}
        />
      </div>
    </div>
  );
};

export default Phone;
