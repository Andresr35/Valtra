import React, { useContext, useState, useEffect } from "react";
import NavBar from '../../components/structure/NavBar'
import Container from 'react-bootstrap/esm/Container'
import { useMsal, useAccount } from "@azure/msal-react";
import { protectedResources } from "../../authentication/authConfig";
import { callApiWithToken } from "../../fetch";
import toolFinder from "../../api/ToolFinder";
import Modal from "react-bootstrap/Modal";
import { TapsContext } from "../../context/TapsContext";
import { useNavigate } from "react-router-dom";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import TableInput from "../../components/TableInput";


const TapsTablePage = () => {
    const { instance, accounts, inProgress } = useMsal();
    const { taps, setTaps, changeTap } = useContext(TapsContext);
    const [style, setStyle] = useState("cont");
    const account = useAccount(accounts[0] || {});
    let navigate = useNavigate();

    useEffect(() => {
        /**
         * gets inserts in database
         */
        const fetchData = () => {
            if (account && inProgress === "none") {
                instance
                    .acquireTokenSilent({
                        scopes: protectedResources.apiHello.scopes,
                        account: account,
                    })
                    .then((response) => {
                        callApiWithToken(
                            response.accessToken,
                            toolFinder.getUri() + "/tapsTable",
                            "GET"
                        ).then((response) => {
                            setTaps(response.body);
                        });
                    })
                    .catch((error) => {
                        if (error instanceof InteractionRequiredAuthError) {
                            if (account && inProgress === "none") {
                                instance
                                    .acquireTokenPopup({
                                        scopes: protectedResources.apiHello.scopes,
                                    })
                                    .then((response) => {
                                        callApiWithToken(
                                            response.accessToken,
                                            toolFinder.getUri() + "/tapsTable",
                                            "GET"
                                        ).then((response) => console(response));
                                    })
                                    .catch((error) => console.log(error));
                            }
                        }
                    });
            }
        };
        fetchData();

    }, [account, inProgress, instance, setTaps]);

    const handleTapChange = (id, change, event) => {
        if (event.key === "Enter") {
            if (account && inProgress === "none") {
                instance
                    .acquireTokenSilent({
                        scopes: protectedResources.apiHello.scopes,
                        account: account,
                    })
                    .then((response) => {
                        callApiWithToken(
                            response.accessToken,
                            toolFinder.getUri() + `/taps/${id}/${change}`,
                            "PUT",
                            {
                                type: "success",
                                change: event.target.value,
                            }
                        );
                    })
                    .catch((error) => {
                        if (error instanceof InteractionRequiredAuthError) {
                            if (account && inProgress === "none") {
                                instance
                                    .acquireTokenPopup({
                                        scopes: protectedResources.apiHello.scopes,
                                    })
                                    .then((response) => {
                                        callApiWithToken(
                                            response.accessToken,
                                            toolFinder.getUri() + `/taps/${id}/${change}`,
                                            "PUT",
                                            {
                                                sent: "success",
                                                change: event,
                                            }
                                        );
                                    })
                                    .catch((error) => console.log(error));
                            }
                        }
                    });
            }
            changeTap(id, change, event);
        }

    };

    return (
        <div>
            <NavBar />
            <Container>
                <div>
                    <h1 style={{ textAlign: "center" }}>Taps Table</h1>
                    <div className="list-group">
                        <table className="table table-hover table-bordered ">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Thread</th>
                                    <th scope="col" style={{ width: "20%" }}>
                                        Quantity
                                    </th>
                                    <th scope="col" style={{ width: "20%" }}>
                                        LOC
                                    </th>
                                    <th scope="col">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {taps &&
                                    Object.keys(taps).map((key, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <button onClick={() => navigate(`/taps/${key}`)}>{key}</button>
                                                </td>
                                                <td>
                                                    <TableInput
                                                        type="text"
                                                        test={{ key }}
                                                        tool={taps}
                                                        handleChange={handleTapChange}
                                                        description="thread"
                                                    />
                                                </td>
                                                <td>
                                                    <TableInput
                                                        type="number"
                                                        test={{ key }}
                                                        tool={taps}
                                                        handleChange={handleTapChange}
                                                        description="quantity"
                                                    />
                                                </td>
                                                <td>
                                                    <TableInput
                                                        type="text"
                                                        test={{ key }}
                                                        tool={taps}
                                                        handleTapChange={handleTapChange}
                                                        description="loc"
                                                    />
                                                </td>
                                                <td>
                                                    <TableInput
                                                        type="text"
                                                        test={{ key }}
                                                        tool={taps}
                                                        handleChange={handleTapChange}
                                                        description="price"
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                <tr>
                                    <td>NA</td>
                                    <td>text</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Container>
        </div>


    )
}

export default TapsTablePage
