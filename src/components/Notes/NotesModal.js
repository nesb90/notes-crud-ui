import React from "react";

function NotesModal(props) {
  let {
    modalTitle,
    myNote,
    setState,
    sendItems
  } = props

  let {
    title,
    content
  } = myNote

  const setTitle = (data) => {
    myNote.title = data
    setState((s) => ({
      ...s, myNote
    }));
  };

  const setContent = (data) => {
    myNote.content = data
    setState((s) => ({
      ...s, myNote
    }));
  };

  return (
    <div id='modalNote' className='modal fade' aria-hidden='true'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <label className='h5'>{modalTitle}</label>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div className='modal-body'>
            <input type='hidden' id='id'></input>
            <label>Title</label>
            <div className='input-group mb-3'>
              <span className='input-group-text'><i className='fa-solid fa-bars'></i></span>
              <input type='text' id='title' className='form-control' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}></input>
            </div>
            <label>Content</label>
            <div className='input-group mb-3'>
              <span className='input-group-text'><i className='fa-solid fa-bars'></i></span>
              <textarea id='content' className='form-control' placeholder='Content' value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            </div>
          </div>
          <div className='modal-footer'>
            <button onClick={() => sendItems()} className='btn btn-success'><i className='fa-solid fa-floppy-disk'></i> Guardar</button>
            <button id='closeModalNote' type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotesModal
