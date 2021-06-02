import React from 'react'
import Reminder from '../components/Reminder'
import CreateReminderForm from "../components/CreateReminderForm"

class ReminderContainer extends React.Component{
    
    render() {
    
        return(
            <div>
                <CreateReminderForm addNote={this.props.addNote} />
                
                
                {/* {this.props.notes.map(note =>  */}
                <Reminder 
                //  updateNote={this.props.updateNote}  
                //  deleteNote={this.props.deleteNote} 
                //  key={note.id} note={note}
                 />)}
            </div>
        )
    }
}

export default ReminderContainer