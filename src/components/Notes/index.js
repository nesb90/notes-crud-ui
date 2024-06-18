import React, { useEffect, useState } from 'react'
import _ from 'lodash';

import { showAlert } from '../../common';
import { makeRequest } from '../../common/axios';
import { operations } from '../../config/constants';

import NotesTable from './NotesTable';
import NotesModal from './NotesModal';

const emptyNote = {
  _id: '',
  title: '',
  content: '',
  createdAt: '',
  updatedAt: ''
}

function Notes() {
  const [notes, setNotes] = useState([]);
  const [state, setState] = useState({
    myNote: _.cloneDeep(emptyNote),
    refresh: 0
  })
  const [operation, setOperation] = useState(1);
  const [modalTitle, setModalTitle] = useState('')


  const {
    myNote,
    refresh
  } = state

  const {
    _id,
    title,
    content
  } = myNote

  const getNotes = async function () {
    const response = await makeRequest({
      method: 'get',
      url: '/notes'
    })
    console.log(response)
    setNotes(response.data)
  }
  const openModal = async function ({
    op,
    _id,
    title,
    content,
    createdAt,
    updatedAt
  }) {
    switch (op) {
      case operations.CREATE:
        setOperation(operations.CREATE)
        setModalTitle('Add Note')
        setState((s) => ({
          myNote: _.cloneDeep(emptyNote)
        }))
        break;
      case operations.UPDATE:
        setOperation(operations.UPDATE)
        setModalTitle('Update Note')
        setState((s) => ({
          myNote: {
            _id,
            title,
            content,
            createdAt,
            updatedAt
          }
        }))
        break;
      default:
        break;
    }
  };

  const deleteNote = async function (id) {
    showAlert({
      message: `Are you sure of this?`,
      icon: 'question',
      text: 'This action can not be reverted.',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await makeRequest({ url:`/notes/${id}`, method: 'delete' });
        getNotes();
      } else {
        showAlert({ message: 'Note deleted', icon: 'info' });
      }
    });
  }

  const parseDate = function (date) {
    if (date) {
      const dateWithoutMilliseconds = date.split('.')[0];
      const parsedDate = new Date(dateWithoutMilliseconds);
      return `${parsedDate.toLocaleDateString('es-MX')} ${parsedDate.toLocaleTimeString('es-MX')}`;
    }
    return '';
  };

  const sendItems = async function () {
    if (operation === operations.CREATE) {
      await makeRequest({
        method: 'post',
        url: `/note`,
        data: {
          title,
          content
        },
        alertResult: true,
        closeModal: true,
        modalId: 'closeModalNote'
      });

      setState((s) => ({
        ...s,
        myNote: _.cloneDeep(emptyNote),
        refresh: refresh + 1
      }));
    } else {
      await makeRequest({
        method: 'put',
        url: `/notes/${_id}`,
        data: {
          title,
          content
        },
        alertResult: true,
        closeModal: true,
        modalId: 'closeModalNote'
      });

      setState((s) => ({
        ...s,
        myItem: _.cloneDeep(emptyNote),
        refresh: refresh + 1
      }));
    };
  };

  useEffect(function () {
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return (
    <div className='container-fluid'>
      <div className='row mt-3'>
        <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
          <div className='row'>
            <div className='col'>
              <h3>Notes</h3>
            </div>
            <div className='col text-end'>
              <button className='btn btn-success' onClick={() => openModal({ op: operations.CREATE })} data-bs-toggle='modal' data-bs-target='#modalNote'>
                <i className='fa-solid fa-circle-plus'></i> Add Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <NotesTable
        notes={notes}
        openModal={openModal}
        deleteNote={deleteNote}
        parseDate={parseDate}
      ></NotesTable>
      <NotesModal
        modalTitle={modalTitle}
        myNote={myNote}
        setState={setState}
        sendItems={sendItems}
      >
      </NotesModal>
    </div>
  );
}

export default Notes