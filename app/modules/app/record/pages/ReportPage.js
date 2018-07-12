import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Table, Header, Container, Dimmer, Loader } from 'semantic-ui-react';
import Pagination from 'components/Pagination';
import { recordReportRequest } from '../redux/actions';
import { makeSelectRecordReport, makeSelectRecordReportLoading } from '../redux/selectors';

class ReportPage extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      deleteId: null,
      showDeleteConfirm: false,
      page: 1,
      pageSize: 10,
    };
  }

  componentWillMount() {
    this.props.reportRequest();
  }

  onChangePage = (page) => {
    this.setState({ page });
  }

  renderRecords = () => {
    const { records } = this.props;
    const { page, pageSize } = this.state;

    if (!records.size) {
      return (
        <Table.Row>
          <Table.Cell colSpan="3">
            No Records
          </Table.Cell>
        </Table.Row>
      );
    }

    return records.slice((page - 1) * pageSize, page * pageSize).map((record, index) => (
      <Table.Row key={`report_${index}`}>
        <Table.Cell>
          {record.getIn(['_id', 'year'])} - Wk {record.getIn(['_id', 'week'])}
        </Table.Cell>
        <Table.Cell>
          {(record.get('totalDistance') / record.get('count')).toFixed(2)}km
        </Table.Cell>
        <Table.Cell>
          {record.get('totalDuration') ? ((record.get('totalDistance') / record.get('totalDuration')) * 60).toFixed(2) : 0}km/hr
        </Table.Cell>
      </Table.Row>
    ));
  }

  render() {
    const { records, loading } = this.props;
    const { page, pageSize } = this.state;

    return (
      <Container>
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        <Header as="h2" content="Weekly Report" color="teal" />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Week</Table.HeaderCell>
              <Table.HeaderCell>Avg Distance</Table.HeaderCell>
              <Table.HeaderCell>Avg Speed</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.renderRecords()}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="6">
                <Pagination
                  total={records.size}
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
  records: makeSelectRecordReport(),
  loading: makeSelectRecordReportLoading(),
});

const mapDispatchToProps = {
  reportRequest: recordReportRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ReportPage);
