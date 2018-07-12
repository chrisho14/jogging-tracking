import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { createStructuredSelector } from 'reselect';
import { Header, Segment, Container, Form, Button, Dimmer, Loader } from 'semantic-ui-react';
import {
  recordLoadRequest,
  updateRecordField,
  recordSaveRequest,
  loadNewRecord,
} from '../redux/actions';
import { makeSelectRecord, makeSelectRecordLoading } from '../redux/selectors';

class RecordPage extends Component {
  componentWillMount() {
    this.loadRecord(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.loadRecord(nextProps.match.params.id);
    }
  }

  onSubmit = () => {
    this.props.recordSave();
    this.props.history.push('../records');
  }

  onUpdateField = (field) => (evt) => {
    this.props.updateField(field, evt.target.value);
  }

  onChangeDate = (date) => {
    this.props.updateField('date', date);
  }

  loadRecord = (id) => {
    const { recordLoad } = this.props;
    if (id === 'new') {
      this.props.loadNewRecord();
    } else {
      recordLoad(id);
    }
  }

  render() {
    const { record, loading } = this.props;

    return (
      <Container fluid>
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        <Header as="h2" content={record.get('id') ? 'Edit Record' : 'New Record'} color="teal" />
        <Form onSubmit={this.onSubmit}>
          <Segment>
            <Header as="h4" content="Jogging Info" dividing color="teal" />
            <Form.Field inline required>
              <label>Date</label>
              <DatePicker
                showTimeSelect={false}
                selected={moment(record.get('date'))}
                onChange={this.onChangeDate}
              />
            </Form.Field>
            <Form.Input
              label="Distance(km)"
              type="number"
              required
              value={record.get('distance') || 0}
              onChange={this.onUpdateField('distance')}
            />
            <Form.Input
              label="Duration(mins)"
              type="number"
              required
              value={record.get('duration') || 0}
              onChange={this.onUpdateField('duration')}
            />
          </Segment>
          <Button color="teal">Save</Button>&nbsp;&nbsp;
          <Link to="/records">Cancel</Link>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  record: makeSelectRecord(),
  loading: makeSelectRecordLoading(),
});

const mapDispatchToProps = {
  recordLoad: recordLoadRequest,
  updateField: updateRecordField,
  recordSave: recordSaveRequest,
  loadNewRecord,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter)(RecordPage);
