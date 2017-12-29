import React from 'react'
import {connect} from 'react-redux'
import {add, remove, filter, exportJSON } from './reducers.js'
import {
  Button,
  ButtonToolbar,
  Col,
  Form,
  FormGroup,
  FormControl,
  Glyphicon,
  Table
} from 'react-bootstrap';
import UndoRedo from './UndoRedo'

const mapStateToProps = (state) => ({
    data: state.database.present.data,
    filter: state.database.present.filter,
})

const mapDispatchToProps = (dispatch) => ({
    onAdd() {
        const new_key = document.getElementById('new-key').value
        const new_value = document.getElementById('new-val').value

        // clear input field text
        document.getElementById('new-key').value = ''
        document.getElementById('new-val').value = ''

        dispatch(add(new_key, new_value))
    },
    onRemove(key_id) {
        dispatch(remove(key_id))
    },
    onFilter(event) {
        dispatch(filter(event.target.value))
    },
    onExport() {
      dispatch(exportJSON())
    },
})

const filteredData = (data, filter) =>
    Object.keys(data).reduce((results, key) => {
        // rows where or the key or value matches the filter string
        const val = data[key]
        if (key.includes(filter) || val.includes(filter)) {
            results[key] = val
        }
        return results
    }, {})

const DataTableComponent = ({data, filter, onAdd, onRemove, onFilter, onExport}) =>
<div className="container">
  <Col xs={12} md={7}>
    <div className="database-info">
      <FormGroup controlId="formFilter" validationState="success">
        <FormControl
          type="search"
          placeholder="Filter..."
          value={filter}
          onChange={onFilter}
        />
        <FormControl.Feedback>
          <Glyphicon glyph="search" />
        </FormControl.Feedback>
      </FormGroup>
      <div className="table-wrapper">
        <Table responsive>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(filteredData(data, filter)).map(key =>
              <tr key={key}>
                <td>{key}</td>
                <td className="wordBreak">{data[key]}</td>
                <td className="removeIcon"><Glyphicon onClick={() => onRemove(key)} glyph="remove" /></td>
              </tr>)
            }
          </tbody>
        </Table>
      </div>
      <ButtonToolbar>
        <Button bsStyle="primary" onClick={onExport}><Glyphicon glyph="save" /> Export</Button>
        <UndoRedo />
      </ButtonToolbar>
  </div>
    </Col>
    <Col xs={12} md={5}>
      <div className="database-info">
        <Form>
          <FormGroup>
            <FormControl
              id="new-key"
              type="text"
              placeholder="New Key..."
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              id="new-val"
              type="text"
              placeholder="New Value..."
            />
          </FormGroup>
          <ButtonToolbar>
            <Button bsStyle="primary" onClick={onAdd}>Add <Glyphicon glyph="plus" /></Button>
          </ButtonToolbar>
        </Form>
      </div>
    </Col>

  </div>

export const DataTable = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DataTableComponent)
