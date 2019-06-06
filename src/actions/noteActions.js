import { toastr } from 'react-redux-toastr';
import { noteConstants } from '../constants';
import api from '../utils/api';

export const fetchUserNotes = notes => ({
  type: noteConstants.FETCH_USER_NOTES,
  payload: notes
});

export const getUserNotes = () => (dispatch) => {
  api.defaults.headers.common.Authorization = localStorage.token;
  api.get('/user-notes')
    .then((response) => {
      dispatch(fetchUserNotes(response.data.notes));
      toastr.success(response.data.message);
    })
    .catch((error) => {
      toastr.error(`Error : ${error.response.data.message}`);
    });
};

export const fetchNotes = notes => ({
  type: noteConstants.FETCH_NOTES,
  payload: notes
});

export const getAllNotes = () => (dispatch) => {
  api.defaults.headers.common.Authorization = localStorage.token;
  api.get('/notes')
    .then((response) => {
      dispatch(fetchNotes(response.data.notes));
    })
    .catch((error) => {
      toastr.error(`Error : ${error.response.data.message}`);
    });
};

export const fetchOneNote = note => ({
  type: noteConstants.FETCH_ONE_NOTE,
  payload: note
});

export const getOneNote = nodeID => (dispatch) => {
  api.defaults.headers.common.Authorization = localStorage.token;
  api.get(`/api/v1/notes/${nodeID}`)
    .then((response) => {
      console.log(response);
      dispatch(fetchOneNote(response.data.item));
    })
    .catch((error) => {
      // toastr.error(`Error : ${error.response.data.message}`);
    });
};

export const addNewNote = note => ({
  type: noteConstants.ADD_NOTE,
  payload: note
});

export const addNote = newNote => (dispatch) => {
  api.defaults.headers.common.Authorization = localStorage.token;
  api.post('/notes', newNote)
    .then((response) => {
      dispatch(addNewNote(response.data.note));
      // toastr.success(response.data.message);
    })
    .catch((error) => {
      // toastr.error(`Error : ${error.response.data.message}`);
    });
};
