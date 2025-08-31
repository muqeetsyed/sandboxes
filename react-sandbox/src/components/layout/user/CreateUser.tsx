import {useState} from "react";

export const CreateUser = () => {
    const [user, updateUser] = useState<formType>({
        'firstName': '',
        'lastName': '',
        'email': '',
        'mobile': '',
        'password': '',
        'address': '',
        'address2': '',
        'city': '',
        'region': '',
        'zipCode': '',
        'country': '',
        'miscInfo': '',
    });

    const [errors, setErrors] = useState<formType>({
        'firstName': '',
        'email': '',
        'mobile': '',
        'address': '',
        'zipCode': '',
        'password': '',
    }); // Holds validation errors


    const handleInputChange = (event) => {
        const {name, value} = event.target;

        updateUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));

        validateField(name, value);
    }

    const validateField = (name, value) => {
        let message = "";

        if (value.trim() === "") {
            message = `${name} is required`;
        } else {
            if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                message = "Invalid email format";
            }

            if (name === "mobile" && !/^\d{10}$/.test(value)) {
                message = "Mobile must be 10 digits";
            }

            if (name === "zipCode" && !/^\d{5,6}$/.test(value)) {
                message = "Invalid zip code";
            }
        }

        // Update errors state
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: message,
        }));
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        Object.keys(user).forEach((field) => {
            validateField(field, user[field]);

        });

        try {
            const respsonse = await fetch("http://localhost:5001/api/users/create", {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (respsonse.status === 400) {
                const textData = await respsonse.text();
                const errorMessage = JSON.parse(textData) as errorType;

                alert(errorMessage.error);
                return;
            }

            alert("Data saved successfully...")
        } catch (error) {
            console.error("fetch: ", error)
        }

    }


    return <div className="form-container">
        <h2>User Registration</h2>

        <form>
            <div className="form-group">
                <label>Name: </label>
                <input type="text" name="firstName" placeholder="first name" onChange={handleInputChange}/>
                <input type="text" name="lastName" placeholder="last name" onChange={handleInputChange}/>
            </div>
            <span className="error">{errors.firstName}</span>

            <div className="form-group">
                <label>Email: </label>
                <input type="email" name="email" placeholder="email" onChange={handleInputChange}/>
            </div>
            <span className="error">{errors.email}</span>

            <div className="form-group">
                <label>Password: </label>
                <input type="text" name="password" placeholder="password" onChange={handleInputChange}/>
            </div>
            <span className="error">{errors.password}</span>


            <div className="form-group">
                <label>Mobile: </label>
                <input type="tel" name="mobile" placeholder="mobile" onChange={handleInputChange}/>
            </div>
            <span className="error">{errors.mobile}</span>

            <div className="form-group">
                <label>Address: </label>
                <input type="text" name="address" placeholder="street address" onChange={handleInputChange}/>
                <input type="text" name="address2" placeholder="street address line 2"
                       onChange={handleInputChange}/>
                <br/>
                <input type="text" name="city" placeholder="city" onChange={handleInputChange}/>
                <input type="text" name="region" placeholder="region" onChange={handleInputChange}/>
                <br/>

                <input type="text" name="zipCode" placeholder="zip code/postal code" onChange={handleInputChange}/>
                <span className="error">{errors.zipCode}</span>

                <input type="text" name="country" placeholder="country" onChange={handleInputChange}/>
            </div>

            <div className="form-group">
                <label>Any other info you want to know about? </label>
                <br/>
                <textarea id="query" name="miscInfo" rows="4" cols="50" onChange={handleInputChange}/>

            </div>


            <button type="submit" className="registration-button" onClick={(event) => handleSubmit(event)}>
                Register
            </button>

        </form>
    </div>
}

type formType = {
    firstName: string,
    lastName?: string,
    email: string,
    mobile: string,
    address: string,
    address2?: string,
    city?: string,
    region?: string,
    country?: string,
    zipCode: string,
    query?: string,
};

type errorType = {
    error: string,
};