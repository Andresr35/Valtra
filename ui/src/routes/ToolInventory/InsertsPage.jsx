import React from "react";
import NavBar from "../../components/structure/NavBar";
import Container from "react-bootstrap/esm/Container";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { InsertsContext } from "../../context/InsertsContext";

const InsertsPage = () => {
  const { id } = useParams();
  const { inserts, setInserts, changeInsert } = useContext(InsertsContext);
  console.log(inserts);
  return (
    <div>
      <NavBar />
      <Container>
        <div className="box" style={{ display: "flex" }}>
          <div className="first box" style={{ textAlign: "center" }}>
            <h1 style={{ textAlign: "center" }}>
              {inserts[id].insertName} <br />
              Insert ID: {id}{" "}
            </h1>
            <img
              className="box"
              src="https://www.haascnc.com/content/dam/haascnc/ecommerce/02-0022/hero.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg"
              alt="insert"
              width={"100%"}
            />
          </div>
          <div
            className="second box"
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex" }}>
              <h3 >Quantity</h3>
            </div>

            {/* <div className="box" style={{ height: "75px", width: "100px", display:"flex"}}> */}
              <input className="box" type="text" defaultValue={inserts[id].quantity} style={{border:""}}/>
            {/* </div> */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default InsertsPage;
