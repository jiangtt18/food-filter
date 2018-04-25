import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import { openModal, closeModal } from "../../actions/modal_actions";
import { withRouter } from 'react-router-dom';
import loginForm from "./login_form";

const mapStateToProps = (state) => {
  return {
    formType: "Login"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    otherForm: (
      <button className='other-button' onClick={() => dispatch(openModal("signup"))}>Need an Account? Register</button>
    )
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(loginForm));
