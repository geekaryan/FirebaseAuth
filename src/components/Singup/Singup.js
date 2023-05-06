import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import InputControl from "../InputControl/InputControl";
import { auth } from "../../firebase";

const Singup = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setErrorMessage] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.password) {
      setErrorMessage("enter all the respective fields");
      return;
    }
    setErrorMessage("");
    console.log(values);
    setSubmitButtonDisabled(true);

    //auth, email and password

    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
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
        <p>Singup</p>
      </div>
      <div>
        <InputControl
          label="Name"
          placeholder="Enter your name"
          onChange={(e) =>
            setValues((prev) => ({ ...prev, name: e.target.value }))
          }
        />
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
            <Link to="/singup">Signup</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Singup;
