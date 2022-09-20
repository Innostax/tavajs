import React, { useEffect } from "react";
import Modal, { hideModal, showModal } from "../../widgets/modal";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../users/users.reducer";
import { selectSelectedUser } from "../../screens/users/users.selectors";

<% if(isMaterialUI) {%> import {Grid} from '@mui/material' <%}%>
<% if(!isMaterialUI) {%> import { Row,Col } from "react-bootstrap" <%}%>

const { setSelectedUserModal } = actions;

const ShowDetails = () => {
  const dispatch = useDispatch();
  const resetModal = () => dispatch(setSelectedUserModal(null));
  const user = useSelector(selectSelectedUser);
  useEffect(() => {
    dispatch(showModal());
    return () => {
      dispatch(hideModal());
    };
  }, [dispatch]);

  return (
    <Modal title="Show User" reset={resetModal} size="lg">
      <% if(!isMaterialUI) {%> 
       <Row>
        <Col className="p-2">
          <b>{user.name}</b>
        </Col>
      </Row>
      <Row>
        <Col>
          <b>ADDRESS</b>
        </Col>
        <Col>
          {user.address.suite},{user.address.street},{user.address.city}
        </Col>
      </Row>
      <Row>
        <Col>
          <b>COMPANY</b>
        </Col>
        <Col>{user.company.name}</Col>
      </Row>
      <%}%>
      <% if(isMaterialUI) {%> 
        <>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <b>{user.name}</b>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6} sm={6} md={6}>
            <b>ADDRESS</b>
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <b>{user.address.suite},{user.address.street},{user.address.city}</b>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6} sm={6} md={6}>
            <b>COMPANY</b>
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <b>{user.company.name}</b>
          </Grid>
        </Grid>
        </>
      <%}%>
    </Modal>
  );
};
export default ShowDetails;
