import Phone from "./Phone";
export default function Form({
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
    <div className="main-div">
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
              name="firstName"
              value={values.firstName}
              onChange={(e) => {
                setValues((values) => ({
                  ...values,
                  firstName: e.target.value,
                }));
              }}
            />

            {validationErrors.firstName && (
              <div className="error-container">
                <span className="error-msg">{validationErrors.firstName}</span>
              </div>
            )}
          </div>

          <div
            className={`label-input-group ${
              validationErrors.lastName && "error"
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
              }}
            />
            {validationErrors.lastName && (
              <div className="error-container">
                <span className="error-msg">{validationErrors.lastName}</span>
              </div>
            )}
          </div>

          <div
            className={`label-input-group ${validationErrors.birth && "error"}`}
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
            {validationErrors.birth && (
              <div className="error-container">
                <span className="error-msg">{validationErrors.birth}</span>
              </div>
            )}
          </div>

          <div className="label-input-group" id="gender">
            <label>Gender</label>
            <label htmlFor="milk">
              <input
                id="milk"
                type="radio"
                name="female"
                value="Female"
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
                value="Male"
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

          <Phone values={values} setValues={setValues} />

          <div
            className={`label-input-group ${validationErrors.email && "error"}`}
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

            {validationErrors.email && (
              <div className="error-container">
                <span className="error-msg">{validationErrors.email}</span>
              </div>
            )}
          </div>

          <div
            className={`label-input-group ${
              validationErrors.password && "error"
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
            {validationErrors.password && (
              <div className="error-container">
                <span className="error-msg">{validationErrors.password}</span>
              </div>
            )}
          </div>

          <div
            className={`label-input-group ${
              validationErrors.selectedProduct && "error"
            }`}
            id="checkbox"
          >
            <label>Your Product</label>

            <label className="product">
              <input
                name="XPad"
                type="checkbox"
                value="XPad"
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

            <label className="product">
              <input
                name="XPadPro"
                type="checkbox"
                value="XPad Pro"
                checked={values.selectedProduct === "XPad Pro"}
                onChange={(e) => {
                  setValues((values) => ({
                    ...values,
                    selectedProduct: e.target.value,
                  }));
                }}
              />
              XPad Pro
            </label>
            {validationErrors.selectedProduct && (
              <div className="error-container">
                <span className="error-msg">
                  {validationErrors.selectedProduct}
                </span>
              </div>
            )}
          </div>

          <div
            className={`label-input-group ${
              validationErrors.selectedCountry && "error"
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
            {validationErrors.selectedCountry && (
              <div className="error-container">
                <span className="error-msg">
                  {validationErrors.selectedCountry}
                </span>
              </div>
            )}
          </div>

          <div
            className={`label-input-group ${
              validationErrors.feedback && "error"
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
            {validationErrors.feedback && (
              <div className="error-container">
                <span className="error-msg">{validationErrors.feedback}</span>
              </div>
            )}
          </div>

          <div className="btn-container">
            <button className="submit" type="submit" style={{ borderRadius: "10px" }} >
              Submit
            </button>
            <button className="reset" type="reset" onClick={handleDeleteForm} style={{ borderRadius: "10px" }}>
              Undo
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
