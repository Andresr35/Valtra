import React, { useState } from "react";
import { useMsal, useAccount } from "@azure/msal-react";

/**
 * 
 * @param {string} type type of input 
 * @param {string} test key/id for object
 * @param {object} tool tool objevt that you are referencing 
 * @param {string} handleChange function that handles tool submit 
 * @param {string} description value name of the input text
 * 
 * @returns {JSX.Element}
 */
const TableInput = ({ type, test, tool, handleChange, description }) => {
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [style, setStyle] = useState({
        textAlign: "center",
        border: "hidden",
        height: "50px",

    });

    const changeStyle = () => {
        setStyle({
            textAlign: "center",
            border: "",
            height: "50px",
            outline: "revert"
        });
    }

    const handleSubmit = (e) => {
        if (e.key === "Enter") {
            changeStyle()
        }

        handleChange(key, description, e)
    }

    let key = test.key;
    return (
        <div>
            <input
                className="toolInput"
                type={type}
                name={tool[key].thread}
                id={tool[key].id}
                defaultValue={tool[key][description]}
                style={style}
                onKeyDown={(e) => handleSubmit(e)}

            />
        </div>
    )
}

export default TableInput
