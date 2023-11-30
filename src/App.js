import { useState } from 'react';
import * as yup from 'yup'



export default function App() {

//   const [name, setName] = useState("")
//   const [mail, setMail] = useState("")
//  const [country, setCountry] = useState("")
//  const [birth, setBirth] = useState("")
  // const [password, setPassword] = useState("")
  // const [hobbies, setHobbies] = useState({ football: false, basketball:false})
  // const [selectedHobbies, setSelectedHobbies] = useState(null);
  // const [selectedGender, setSelectedGender] = useState(null);
  // const [address, setAddress] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const [values, setValues] = useState({
firstName:"",
lastName:"",
email:"",
mobileNumber:"",
country:"",
birth:"",
password:"",
selectedHobbies:null,
selectedGender:null,
address:"",

  })

const countries = ['--Choose Country--', 'Turkey', 'Germany', 'United States', 'France', 'Italy', 'Spain']; 


const userSchema = yup.object().shape({

mail:yup.string().email().required(),
birth:yup.string().required(),
country:yup.string().required(),
selectedHobbies:yup.string().required(),
selectedGender:yup.string().required(),
address:yup.string().required(),

//  hobbies:yup.array().required(),
// password:yup.string().min(4).max(10).required()
password: yup.string().min(4, 'Password must be at least 4 characters').max(30, 'Password is too long').required('Password is required'),



})



async function handleSubmit(e){
  e.preventDefault()

  // const selectedHobbies = Object.keys(hobbies).filter((el) => hobbies[el]);
  // console.log(selectedHobbies)
  // hobbies: selectedHobbies
  const formData = {values}
  console.log(formData)
 
   try {
     await userSchema.validate(formData, { abortEarly: false });
     console.log('Validation successful');
     // Continue with form submission or other actions
   } catch (error) {
     console.error('Validation error:', error.errors);
    // Handle validation errors (display error messages, etc.)
   }


  // try {
  //   await userSchema.validate(formData, { abortEarly: false });
  //   // Clear previous validation errors on successful validation
  //   setValidationErrors({});
  //   console.log('Validation successful');
  //   // Continue with form submission or other actions
  // } catch (error) {
  //   const errors = {};
  //   error.inner.forEach((err) => {
  //     errors[err.path] = err.message;
  //   });
  //   setValidationErrors(errors);
  // }
}




  return (
    <div className="App">


 <div className='container'>
<h1>Contact Form</h1>

<h2>Get in touch with us</h2>


<form className='form'  onSubmit={handleSubmit} >


<div className='label-input-group' >
<label>First Name</label>
<input 
type='text' 
name="firstname" 
value={values.firstName} 
onChange={(e) => {

  setValues((values) => ({
		...values,
		firstName: e.target.value,
	}));
// setValues(e.target.value)
}
} />
</div>

<div className='label-input-group' >
<label>Last Name</label>
<input 
type='text' 
name="lastname" 
value={values.lastName} 
onChange={(e) => {

  setValues((values) => ({
		...values,
		lastName: e.target.value,
	}));
// setValues(e.target.value)
}
} />
</div>



<div className='label-input-group'>
<label>Date of Birth</label>
<input 
type='date'
name='birth'
value={values.birth}
onChange={(e) => {setValues((values) => ({
  ...values,
birth: e.target.value,
}));} }
/>
</div>




<div className='label-input-group'>
<label>Gender</label>
<label>
<input 
type='radio'
name='radio'
value={'Female'}
// checked = {selectedGender === "Female"}
checked = {values.selectedGender === "Female"}
onChange={(e) =>{setValues((values) => ({
  ...values,
selectedGender: e.target.value,
}));}}
/>Female
</label>


<label>
<input 
type='radio'
name='radio'
value={'Male'}
checked = {values.selectedGender === "Male"}
onChange={(e) =>{setValues((values) => ({
  ...values,
selectedGender: e.target.value,
}));}}
/>Male
</label>
</div>



<div className='label-input-group' >
<label>Mobile Number</label>
<input 
type='text' 
name="mobilenumber" 
value={values.mobileNumber} 
onChange={(e) => {

  setValues((values) => ({
		...values,
		mobileNumber: e.target.value,
	}));
// setValues(e.target.value)
}
} />
</div>







<div className='label-input-group' >
<label>Email</label>
<input 
type='email'
name='email'
value={values.email}
onChange={(e) => { setValues((values) => ({
  ...values,
email: e.target.value,
}));
}}
/>
{validationErrors.name && <p className="error">{validationErrors.name}</p>}
</div>



<div className='label-input-group'>
<label >Password</label>
<input 
type='password'
name='password'
value={values.password}
onChange={(e) => {setValues((values) => ({
  ...values,
password: e.target.value,
}));}}
/>
</div>



<div className='label-input-group'>
<label>Your Product</label>
<label>
<input 
type='checkbox' 
// checked = {hobbies.football}
// onChange={() => setHobbies({ ...hobbies, football: !hobbies.football })}
value={'Football'}
checked = {values.selectedHobbies === "Football"}
onChange={(e) => {setValues((values) => ({
  ...values,
selectedHobbies: e.target.value,
}));}}
/>
Football</label>
<label>
<input 
type='checkbox' 
value={'Basketball'}
// checked = {selectedHobbies === "Basketball"}
checked = {values.selectedHobbies === "Basketball"}
onChange={(e) =>{setValues((values) => ({
  ...values,
selectedHobbies: e.target.value,
}));}}
// checked = {hobbies.basketball}
// onChange={() => setHobbies({ ...hobbies, basketball: !hobbies.basketball })}
/>
Basketball</label>
</div>









<div className='label-input-group'>
<label>Country</label> 
<select
value={values.country}
name='country'
onChange={(e) => { setValues((values) => ({
  ...values,
  country: e.target.value,
}));
}}
>
{countries.map((el,i) => <option value={el} key={i}>{el}</option> )
}
</select>
</div>














<div className='label-input-group'>
<label>Adress</label>
<textarea 
rows="4" 
cols="40"
value={values.address}
onChange={(e) =>{setValues((values) => ({
  ...values,
address: e.target.value,
}));}}
/>

</div>




<div className='btn-container'>
<button type='submit' className='submit'>Submit</button>
<button className='reset' >Reset</button>
</div>







</form>
</div> 
    </div>
  );
}


