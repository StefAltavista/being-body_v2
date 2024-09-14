import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import InputField from "./InputField";
import buildMessage from "../api/buildMessage";
import submitForm from "../api/submitForm";
import Loading from "./Loading";

export default function BookAppointment() {
    window.scrollTo(0, 0);
    const [result, setResult] = useState();
    const [data, setData] = useState({
        name: "",
        pronouns: "",
        email: "",
        phone: "",
        message: "",
    });
    const [load, setLoad] = useState(false);

    const send = async () => {
        const subject = "New Booking Request from Beingbody.net";
        const message = buildMessage(subject, data);
        setLoad(true);
        const response = await submitForm(subject, message);
        setResult(response);
        setLoad(false);
    };

    return (
        <div id="book">
            <Header home={false}></Header>
            <div id="side">
                <h3>Book an appointment</h3>
                {!result && (
                    <>
                        {" "}
                        <p>Feel Free to contact me to discuss availability!</p>
                        <p id="privacy">
                            *<br></br> All informations are held in strictest
                            confidence. At no given point is information
                            disclosed or shared without client`s consent. You
                            may choose to skip answering any question you feel
                            impinges on personal information you do not wish to
                            disclose.
                        </p>
                    </>
                )}
            </div>
            {!result ? (
                <div id="input">
                    <button onClick={send}>SEND</button>
                    <div id="personalInfo">
                        <div>
                            <p>Name:</p>
                            <InputField
                                f={"name"}
                                data={data}
                                setData={setData}
                            />
                        </div>
                        <div>
                            <p>Pronouns:</p>
                            <InputField
                                f={"pronouns"}
                                data={data}
                                setData={setData}
                            />
                        </div>
                        <div>
                            <p>Email:</p>
                            <InputField
                                f={"email"}
                                data={data}
                                setData={setData}
                            />
                        </div>
                        <div>
                            <p>Phone Number</p>
                            <InputField
                                f={"phone"}
                                data={data}
                                setData={setData}
                            />
                        </div>
                    </div>
                    <div id="message">
                        <p>Message</p>
                        <InputField
                            f={"message"}
                            data={data}
                            setData={setData}
                        />
                    </div>
                </div>
            ) : (
                <>
                    <p>{result}</p>
                    <Link to="/">
                        <button>Back to website</button>
                    </Link>
                </>
            )}
            {load && <Loading></Loading>}
        </div>
    );
}
