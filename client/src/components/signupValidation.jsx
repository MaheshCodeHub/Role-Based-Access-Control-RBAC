import * as Yup from "yup";

export const signupValidation = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number")
    .required("Please enter Mobile Number"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  userType: Yup.string().required("Role is required"), // add this line
});

// import * as Yup from "yup";

// export const signupValidation = Yup.object({
//     studentid: Yup.string().min(4).required("Please enter Student ID").matches(/^[a-zA-Z 0-9@]+$/, "This field is character only or Number"),
//     name: Yup.string().min(3).required("Please enter Name").matches(/^[a-zA-Z @]+$/, "This field is character only or with spaces"),
//     course: Yup.string().min(3).required("Please enter Course").matches(/^[a-zA-Z @]+$/, "This field is character only or with spaces"),
//     yearandsection: Yup.string().min(3).required("Please enter Year and Section").matches(/^[a-zA-Z 0-9@]+$/, "This field is character only or Number"),
//     email: Yup.string().email("Please enter Valid Email").required("Please enter Email"),
//     phone: Yup.string().matches(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number").required("Please enter Mobile Number"),
//     password: Yup.string().min(6).required("Please enter Password"),
//     confirmpassword: Yup.string().oneOf([Yup.ref("password")], "Password not matched"),
// })
