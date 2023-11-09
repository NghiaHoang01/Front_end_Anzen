import { useFormik } from "formik";
import * as Yub from "yub";

const Formik = () => {
    const formik = useFormik(
        {
            initialValues: {
                full_name: "",
                email: "",
                password: "",
                confirm__password: ""
            },
            validationSchema: Yub.object({
                full_name: Yub.toString()
                    .min(2, "minimum 2 characters")
                    .max(15, "Maximum 15 characters")
                    .required("Required"),
                email: Yub.toString().email("Invalid email format").required("Required"),
                password: Yub.toString()
                    .min(5, "Minimum 5 characters")
                    .required("Required"),
                confirm__password: Yub.toString()
                    .oneOf([Yub.ref("password")], "Password is not match")
                    .required("Required")
            }),

            onSubmit: (values) => {
                console.log(values)
                alert(JSON.stringify(values, null, 2))
            },
        }
    );
    return (
        <div className="app">
            <h1>Validation with Formik + Yub</h1>
            <form onSubmit={formik.handleSubmit}>

            </form>
        </div>
    )
}

export default Formik