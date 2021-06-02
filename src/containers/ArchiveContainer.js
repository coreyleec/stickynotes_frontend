import React from 'react'
import Note from '../components/Note'

export default class ArchiveContainer extends React.Component{

    


    
    render() {
        return(
            <div>
                <h1>Archive</h1>
                {this.props.archivedNotes.map(archiveNoteObj => <Note 
                key={archiveNoteObj.id}
                note={archiveNoteObj} 
                archiveNote={this.props.favoritePet}
                deleteNote={this.props.deleteNote} 
                />)}
            </div>
        )
    }
}

