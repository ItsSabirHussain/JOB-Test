import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from "material-ui/Table";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { readEvents } from "../actions";

class EventsIndex extends Component {
  componentDidMount() {
    this.props.readEvents();
  }

  renderEvents() {
    return _.map(this.props.events, (event) => (
      <TableRow key={event._id}>
        <TableRowColumn>{event._id}</TableRowColumn>
        <TableRowColumn>
          <Link to={`/events/${event._id}`}>{event.Name}</Link>
        </TableRowColumn>
        <TableRowColumn>{event.Email}</TableRowColumn>
        <TableRowColumn>{event.Phone}</TableRowColumn>

        <TableRowColumn>{event.Date_Created}</TableRowColumn>
        <TableRowColumn>{event.Date_Modified}</TableRowColumn>
      </TableRow>
    ));
  }

  render() {
    const style = {
      position: "fixed",
      right: 12,
      bottom: 12,
    };
    return (
      <React.Fragment>
        <FloatingActionButton
          style={style}
          containerElement={<Link to="/events/new" />}
        >
          <ContentAdd />
        </FloatingActionButton>

        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckBox={false}>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>Phone</TableHeaderColumn>
              <TableHeaderColumn>Date Created</TableHeaderColumn>
              <TableHeaderColumn>Date Modified</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false}>
            {this.renderEvents()}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({ events: state.events });

// const mapDispatchToProps = dispatch => ({
//   increment: () => dispatch(increment()),
//   decrement: () => dispatch(decrement())
// })

const mapDispatchToProps = { readEvents };

export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex);
