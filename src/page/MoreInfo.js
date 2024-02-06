import React, {useState} from "react";

const MoreInfo = () => {
    const [notice, setNotice] = useState("");
    return(
        <div className="container">
            <div className="row justify-content-center">

            

                <form className = "col-md-4 mt-3 pt-3 pb-3">
                    { "" !== notice &&
                    <div className = "alert alert-warning" role = "alert">
                        {notice}
                    </div>
                    }
                    <div className = "col-md-4 text-center">
                          <p className = "lead">Information</p>
                    </div>

                    <div className = "form-floating mb-3">
                        <input id="name" type="text" className="form-control" placeholder="Min" ></input>
                        <label htmlFor="firstname" className="form-label" > First Name</label>
                    </div>

                    <div className = "form-floating mb-3">
                        <input id="lastname" type="text" className="form-control" placeholder="Kang" ></input>
                        <label htmlFor="lastname" className="form-label" > Last Name</label>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MoreInfo