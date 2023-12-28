import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Phone = ({ values, setValues }) => {
  const [mobileNumber, setMobileNumber] = useState('');

  const localHandlePhoneChange = (phone) => {
    setMobileNumber(phone);

    if (setValues) {
      setValues((prevValues) => ({
        ...prevValues,
        mobileNumber: phone,
      }));
    }
  };

  useEffect(() => {
    if (setValues) {
      setValues((prevValues) => ({
        ...prevValues,
        mobileNumber: mobileNumber,
      }));
    }
  }, [mobileNumber, setValues]);

  return (
    <div className="label-input-group">
      <label htmlFor="lemon">Mobile Number</label>
      <div className="phone">
        <PhoneInput
          inputProps={{
            id: 'lemon',
            name: 'mobileNumber',
            required: true,
            autoFocus: true,
          }}
          country={'tr'}
          value={mobileNumber}
          onChange={localHandlePhoneChange}
        />
      </div>
    </div>
  );
};

export default Phone;
