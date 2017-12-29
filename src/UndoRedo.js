import React from 'react'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { connect } from 'react-redux'
import {
  Button,
  ButtonToolbar,
} from 'react-bootstrap';
import redo from './redo_18.svg'
import undo from './undo_18.svg'

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <ButtonToolbar>
    <Button bsStyle={canUndo ? "warning" : "default"} onClick={onUndo} disabled={!canUndo}>
      <img src={undo} alt="undo"/>
    </Button>
    <Button bsStyle={canRedo ? "warning" : "default"} onClick={onRedo} disabled={!canRedo}>
      <img src={redo} alt="redo"/>
    </Button>
  </ButtonToolbar>
)

const mapStateToProps = state => {
  return {
    canUndo: state.database.past.length > 0,
    canRedo: state.database.future.length > 0
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo())
  }
}

UndoRedo = connect(
  mapStateToProps,
  mapDispatchToProps
)(UndoRedo)

export default UndoRedo
