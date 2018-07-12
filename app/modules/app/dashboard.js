import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Table, Container, Dimmer, Loader } from 'semantic-ui-react';
import { recordListRequest } from './record/redux/actions';
import { makeSelectRecordList, makeSelectRecordListLoading } from './record/redux/selectors';

class Dashboard extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      limit: 10,
    };
  }

  componentWillMount() {
    console.log(this.props);
    this.props.recordList(this.state.limit);
  }

  renderRecords = (records) => {
    if (!records.size) {
      return (
        <Table.Row>
          <Table.Cell colSpan="4">
            No Records
          </Table.Cell>
        </Table.Row>
      );
    }

    return records.map((record) => (
      <Table.Row key={record.get('_id')}>
        <Table.Cell>
          {record.getIn(['user', 'userName'])}
        </Table.Cell>
        <Table.Cell>
          {moment(record.get('date')).format('MM/DD/YYYY')}
        </Table.Cell>
        <Table.Cell>
          {record.get('distance')}km
        </Table.Cell>
        <Table.Cell>
          {record.get('duration')}mins
        </Table.Cell>
        <Table.Cell>
          {record.get('duration') ? ((record.get('distance') / record.get('duration')) * 60).toFixed(2) : record.get('duration')}km/hr
        </Table.Cell>
      </Table.Row>
    ));
  }

  render() {
    const { records, loading } = this.props;

    return (
      <Container>
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        <div style={{ paddingTop: '20px', paddingBottom: '5px' }}>
          <span style={{ color: '#00b5ad', fontSize: '24px', fontWeight: 'bold' }}>Recent Records</span>
        </div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Distance</Table.HeaderCell>
              <Table.HeaderCell>Duration</Table.HeaderCell>
              <Table.HeaderCell>Avg Speed</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.renderRecords(records)}
            <Table.Cell colSpan="4">
              <Link to="/records">More details  ...</Link>
            </Table.Cell>
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  records: makeSelectRecordList(),
  loading: makeSelectRecordListLoading(),
});

const mapDispatchToProps = {
  recordList: recordListRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Dashboard);
