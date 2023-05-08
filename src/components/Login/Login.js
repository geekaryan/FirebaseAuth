import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import InputControl from "../InputControl/InputControl";
import { auth } from "../../firebase";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setErrorMessage] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.password) {
      setErrorMessage("enter all the respective fields");
      return;
    }
    setErrorMessage("");
    console.log(values);
    setSubmitButtonDisabled(true);

    //auth, email and password
    //just cheking if the auth works fine or not

    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMessage(err.message);
        console.log(err);
      });
  };
  return (
    <div>
      <div>
        <p>Login</p>
      </div>
      <div>
        <InputControl
          label="email"
          placeholder="Enter email address"
          onChange={(e) =>
            setValues((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <InputControl
          label="password"
          placeholder="Enter password"
          onChange={(e) =>
            setValues((prev) => ({ ...prev, password: e.target.value }))
          }
        />
      </div>
      <div>
        {error}
        <button onClick={handleSubmission} disabled={submitButtonDisabled}>
          Login
        </button>
        <p>
          Already have an account?
          <span>
            <Link to="/singup">Singup</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
