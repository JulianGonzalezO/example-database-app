import undoable, { excludeAction } from 'redux-undo'
import { saveAs } from 'file-saver'

// Actions
export const add = (key, val) => ({type: 'ADD', key, val})
export const remove = (key) => ({type: 'REMOVE', key})
export const filter = (filter_str) => ({type: 'FILTER', filter_str})
export const exportJSON = () => ({type: 'EXPORT'})

// Initial Store State
const initial_state = {
    data: {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
    },
    filter: '',
}

// Reducer
const database = (state=initial_state, action) => {
    // console.log(action)
    switch(action.type) {
        case 'ADD': {
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.key]: action.val,
                }
            }
        }
        case 'REMOVE': {
            return {
                ...state,
                data: Object.keys(state.data).reduce((result, key) => {
                    if (key !== action.key) {
                        result[key] = state.data[key];
                    }
                    return result;
                }, {})
            }
        }
        case 'FILTER': {
            return {...state, filter: action.filter_str}
        }
        case 'EXPORT': {
            const blob = new Blob([JSON.stringify(state.data, null, '\t')], {type: "application/json"});
            saveAs(blob, 'keys.json');
            return state
        }
        default: {
            return state
        }
    }
}

//undoable database
const undoableDatabase = undoable(database, {
  filter: excludeAction(['FILTER', 'EXPORT'])
})

export default undoableDatabase
