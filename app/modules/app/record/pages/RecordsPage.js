import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Segment, Table, Header, Container, Dimmer, Loader, Button, Confirm } from 'semantic-ui-react';
import Pagination from 'components/Pagination';
import DateRangeFilter from 'components/DateRangeFilter';
import { recordListRequest, recordDeleteRequest } from '../redux/actions';
import { makeSelectRecordList, makeSelectRecordListLoading } from '../redux/selectors';

class RecordsPage extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      deleteId: null,
      showDeleteConfirm: false,
      page: 1,
      pageSize: 9,
      from: moment().subtract(30, 'days').toDate(),
      to: moment().toDate(),
    };
  }

  componentWillMount() {
    this.props.recordList();
  }

  onChangePage = (page) => {
    this.setState({ page });
  }

  onRemove = (deleteId) => () => {
    this.setState({ deleteId, showDeleteConfirm: true });
  }

  onChangeFilter = (filterName, value) => {
    this.setState({ [filterName]: value });
  };

  handleConfirm = () => {
    this.props.recordDelete(this.state.deleteId);
    this.setState({ showDeleteConfirm: false });
  }

  handleCancel = () => this.setState({ showDeleteConfirm: false })

  renderRecords = (records) => {
    const { page, pageSize } = this.state;

    if (!records.size) {
      return (
        <Table.Row>
          <Table.Cell colSpan="6">
            No Records
          </Table.Cell>
        </Table.Row>
      );
    }

    return records.slice((page - 1) * pageSize, page * pageSize).map((record) => (
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
        <Table.Cell>
          <Button color="teal" size="mini" as={Link} to={`/records/${record.get('_id')}`} content="Edit" icon="edit" labelPosition="left" />
          &nbsp;
          <Button color="orange" size="mini" content="Remove" icon="trash" labelPosition="left" onClick={this.onRemove(record.get('_id'))} />
        </Table.Cell>
      </Table.Row>
    ));
  }

  render() {
    const { records, loading } = this.props;
    const { page, pageSize, showDeleteConfirm, from, to } = this.state;
    const filteredRecords = records.filter((record) =>
      moment(from).startOf('day').diff(moment(record.get('date'))) < 0 &&
      moment(to).endOf('day').diff(moment(record.get('date'))) >= 0
    );

    return (
      <Container>
        <Confirm
          open={showDeleteConfirm}
          content="Are you sure to delete this record?"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        <div style={{ paddingTop: '20px', paddingBottom: '5px' }}>
          <span style={{ color: '#00b5ad', fontSize: '24px', fontWeight: 'bold' }}>Records</span>
          <Button color="teal" as={Link} to="/records/new" style={{ float: 'right' }}>Add New Record</Button>
        </div>
        <Segment>
          <Header as="h4" content="Filter" dividing color="teal" />
          <DateRangeFilter
            from={from}
            to={to}
            onChange={this.onChangeFilter}
          />
        </Segment>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Distance</Table.HeaderCell>
              <Table.HeaderCell>Duration</Table.HeaderCell>
              <Table.HeaderCell>Avg Speed</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.renderRecords(filteredRecords)}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="6">
                <Pagination
                  total={filteredRecords.size}
                  currentPage={page}
                  onChange={this.onChangePage}
                  perPage={pageSize}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
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
  recordDelete: recordDeleteRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(RecordsPage);
