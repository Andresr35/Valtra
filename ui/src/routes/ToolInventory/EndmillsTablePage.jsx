import React from "react";
import NavBar from '../../components/structure/NavBar'
import Container from 'react-bootstrap/esm/Container'
import EndmillsTable from "../../components/EndmillsTable";

const EndmillsTablePage = () => {
  return (
    <div>
      <NavBar />
      <Container>
        <EndmillsTable/>
      </Container>
    </div>
  );
};

export default EndmillsTablePage;
