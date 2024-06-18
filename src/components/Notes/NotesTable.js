import React from "react"
import { operations } from "../../config"

function NotesTable(props) {
  let {
    notes,
    openModal,
    deleteNote,
    parseDate
  } = props
  return (
    <div className='row mt-3'>
      <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
        <div className='table-responsive'>
          {
            notes.map((note, index) => (
              <table className='table table-bordered table-striped' key={index}>
                <thead>
                  <tr>
                    <th className="h4">{note.title}</th>
                  </tr>
                </thead>
                <tbody className='table-group-divider'>
                  <tr>
                    <td>{note.content}</td>
                  </tr>
                  <tr>
                    <td className="text-end">Created: {parseDate(note.createdAt)}</td>
                  </tr>
                  <tr>
                    <td className="text-end">Modified: {parseDate(note.updatedAt)}</td>
                  </tr>
                  <tr>
                    <td>
                      <button
                        onClick={() => openModal({
                          op: operations.UPDATE,
                          _id: note._id,
                          title: note.title,
                          content: note.content,
                          createdAt: note.createdAt,
                          updatedAt: note.updatedAt
                        })}
                        className='btn btn-primary'
                        data-bs-toggle='modal'
                        data-bs-target='#modalNote'
                      >
                        <i className="fa-solid fa-edit"></i>&nbsp;Edit Note
                      </button>
                      <button onClick={() => deleteNote(note._id)} className='btn btn-danger'>
                        <i className='fa-solid fa-trash'></i>&nbsp;Delete Note
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default NotesTable
