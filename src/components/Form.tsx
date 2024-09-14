import React, { useState } from "react";
import buildMessage from "../api/buildMessage";
import submitForm from "../api/submitForm";
import Header from "./Header";
import Loading from "./Loading";

export default function Form() {
    window.scrollTo(0, 0);
    const [missingData, setMissingData] = useState(false);
    const [result, setResult] = useState();
    const [load, setLoad] = useState(false);

    const [data, setData] = useState({
        name: "",
        pronouns: "",
        email: "",
        phone: "",
        allergies: "",
        injuries: "",
        activities: "",
        discomfortAreas: "",
        music: "",
        aroma: "",
        extraInfo: "",
    });
    const inputField = (f) => {
        return f == "extraInfo" || f == "distresses" ? (
            <textarea
                type="text"
                value={data[f]}
                onChange={(e) =>
                    setData({
                        ...data,
                        [f]: e.target.value,
                    })
                }
            />
        ) : (
            <input
                type="text"
                value={data[f]}
                onChange={(e) => setData({ ...data, [f]: e.target.value })}
            />
        );
    };

    const send = async () => {
        if (!data.name) {
            setMissingData(true);
            return;
        }
        const subject = `New Client Sheet: ${data.name} (${data.pronouns}) `;
        const message = buildMessage(subject, data);
        setLoad(true);
        const response = await submitForm(subject, message);

        setResult(response);
        setLoad(false);
    };

    return (
        <>
            <Header home={false}></Header>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div id="formPage">
                    <div id="side">
                        <h3>Wellness Questions</h3>
                        <p id="privacy">
                            * All information is held in strictest confidence.
                            At no given point is information disclosed or shared
                            without clients consent. You may choose to skip
                            answering any question you feel impinges on personal
                            information you do not wish to disclose.
                        </p>
                    </div>
                    {missingData && <p>Please enter your name!</p>}
                    {!result ? (
                        <>
                            <div id="form">
                                <div id="info" className="formSection">
                                    <p>Name</p>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                name: e.target.value,
                                            })
                                        }
                                        onClick={() => setMissingData(false)}
                                    />
                                    <p>Pronouns</p>
                                    {inputField("pronouns")}
                                    <p>Email</p>
                                    {inputField("email")}
                                    <p>Phone</p>
                                    {inputField("phone")}
                                </div>
                                <div id="physical" className="formSection">
                                    <p>Do you have any allergies?</p>
                                    {inputField("allergies")}
                                    <p>
                                        Do you have any prior or chronic
                                        injuries?
                                    </p>
                                    {inputField("injuries")}
                                    <p>
                                        What are the physical activities in
                                        which you engage?
                                    </p>
                                    {inputField("activities")}

                                    <p>
                                        In what areas are you feeling discomfort
                                        or pain?
                                    </p>
                                    {inputField("discomfortAreas")}
                                </div>
                                <div id="atmosphere" className="formSection">
                                    <p>Do you have any music preferences?</p>
                                    {inputField("music")}
                                    <p>Is there any aroma that disturbs you?</p>
                                    {inputField("aroma")}
                                </div>

                                <div id="personal" className="formSection">
                                    <p>
                                        Is there any extra information,
                                        struggle, distresses or strains you
                                        would like to share?
                                    </p>
                                    {inputField("extraInfo")}
                                </div>
                                <button onClick={send}>Send</button>
                            </div>
                        </>
                    ) : (
                        <p>{result}</p>
                    )}{" "}
                </div>
                {load && <Loading></Loading>}
            </div>
        </>
    );
}
