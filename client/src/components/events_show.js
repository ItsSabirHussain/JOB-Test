import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

import { getEvent, deleteEvent, putEvent } from "../actions";

class EventsShow extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) this.props.getEvent(id);
  }

  renderField(field) {
    const {
      input,
      label,
      type,
      meta: { touched, error },
    } = field;

    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
        type={type}
        errorText={touched && error}
        {...input}
        fullWidth={true}
      />
    );
  }

  async onDeleteClick() {
    const { id } = this.props.match.params;
    await this.props.deleteEvent(id);
    this.props.history.push("/");
  }

  async onSubmit(values) {
    const { id } = this.props.match.params;
    console.log(values);
    await this.props.putEvent({ ...values, id: id });
    this.props.history.push("/");
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;
    const style = { margin: 12 };

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <Field
            label="Name"
            name="name"
            type="text"
            component={this.renderField}
          />
        </div>
        <div>
          <Field
            label="Email"
            name="email"
            type="text"
            component={this.renderField}
          />
        </div>
        <div>
          <Field
            label="Phone"
            name="phone"
            type="text"
            component={this.renderField}
          />
        </div>

        <div>
          <RaisedButton
            label="Submit"
            type="submit"
            style={style}
            disabled={pristine || submitting || invalid}
          />
          <RaisedButton
            label="Cancel"
            style={style}
            containerElement={<Link to="/" />}
          />
          <RaisedButton
            label="Delete"
            style={style}
            onClick={this.onDeleteClick}
          />
        </div>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.name) errors.name = "Enter a name, please.";
  if (!values.email) errors.email = "Enter a email, please.";
  if (!values.phone) errors.phone = "Enter a phone, please.";
  return errors;
};

const mapStateToProps = (state, ownProps) => {
  const contact = state.events[ownProps.match.params.id];
  return { initialValues: contact, event: contact };
};

const mapDispatchToProps = { deleteEvent, getEvent, putEvent };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({ validate, form: "eventShowForm", enableReinitialize: true })(
    EventsShow
  )
);
