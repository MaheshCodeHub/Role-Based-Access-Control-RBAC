import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { signupValidation } from "./SignupValidation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
const initialValues = {
  email: "",
  phone: "",
  password: "",
  confirmpassword: "",
};

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: signupValidation,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await axios.post(
          `http://localhost:3000/api/register`,
          values
        );
        toast.success("Saved successfully");
        navigate("/");
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
        setIsLoading(false);
      }
    },
  });

  const { values, errors, handleChange, handleBlur, handleSubmit } = formik;

  return (
    <div className="hold-transition register-page">
      <div className="register-box">
        <div className="register-logo">
          <Link to="/">
            <b>Admin</b>LTE
          </Link>
        </div>
        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Register a new membership</p>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              {errors.email && (
                <p className="text-danger fs-6 italic">{errors.email}</p>
              )}
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="Phone No"
                  value={values.phone}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-phone-alt" />
                  </div>
                </div>
              </div>
              {errors.phone && (
                <p className="text-danger fs-6 italic">{errors.phone}</p>
              )}
              <div className="input-group mb-3">
                <select
                  name="userType"
                  className="form-control"
                  value={values.userType}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option value="" label="Select role" />
                  <option value="admin" label="Admin" />
                  <option value="student" label="Student" />
                  <option value="verification" label="Verification" />
                  <option value="issuereturn" label="IssueReturn" />
                </select>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user-tag" />
                  </div>
                </div>
              </div>
              {errors.userType && (
                <p className="text-danger fs-6 italic">{errors.userType}</p>
              )}
              <div className="input-group mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              {errors.password && (
                <p className="text-danger fs-6 italic">{errors.password}</p>
              )}
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Retype password"
                  id="confirmpassword"
                  name="confirmpassword"
                  value={values.confirmpassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              {errors.confirmpassword && (
                <p className="text-danger fs-6 italic">
                  {errors.confirmpassword}
                </p>
              )}
              <div className="row mb-3">
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing Up..." : "Sign Up"}
                  </button>
                </div>
              </div>
            </form>

            <Link to="/" className="text-center">
              I already have a membership
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
