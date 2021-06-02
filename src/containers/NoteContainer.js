import React from 'react'
import Note from '../components/Note'
import CreateNoteForm from "../components/CreateNoteForm"

class NoteContainer extends React.Component{
    
    render() {
        
        return(
            <div>
                <CreateNoteForm addNote={this.props.addNote} />
                
                
                {this.props.notes.map(note => <Note 
                 updateNote={this.props.updateNote}  
                 deleteNote={this.props.deleteNote} key={note.id} note={note}/>)}
            </div>
        )
    }
}

export default NoteContainer