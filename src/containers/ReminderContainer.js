import React from 'react'
import Reminder from '../components/Reminder'
import CreateReminderForm from "../components/CreateReminderForm"

class ReminderContainer extends React.Component{
    
    render() {
    
        return(
            <div>
                <CreateReminderForm addReminder={this.props.addReminder} />
                
                
                {/* {this.props.reminders.map(note =>  */}
                {/* <Reminder  */}
                {/* //  updateNote={this.props.updateNote}  
                //  deleteNote={this.props.deleteNote} 
                //  key={note.id} note={note}
                 />)} */}
            </div>
        )
    }
}

export default ReminderContainer