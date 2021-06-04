
import React from 'react'
import Navbar from "../components/Navbar"
import ArchiveContainer from "../containers/ArchiveContainer"
import NoteContainer from "../containers/NoteContainer"
import ReminderContainer from "../containers/ReminderContainer"
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Switch } from "react-router";

class App extends React.Component {

  state = {
    notes: [],
    reminders: [],
    // note: ""
    archived: false,
    expiredReminders: []
  }

  // GET REQUEST
  componentDidMount() {
    fetch('http://localhost:9292/notes/')
      .then(resp => resp.json())
      .then(noteData => this.setState({ notes: noteData }))
    fetch('http://localhost:9292/reminders')
      .then(resp => resp.json())
      .then(reminderData => this.setState({ reminders: reminderData }))

  }


  // POST REQUEST
  addNote = (e, noteObj) => {
    e.preventDefault()
    let newNote = {
      title: noteObj.title,
      datetime: new Date().toLocaleString(),
      note: noteObj.note,
      // image: noteObj.image,
      // archived: false,
      // details: [],
    }

    let reqObj = {}
    reqObj.headers = { 'Content-Type': 'Application/json' }
    reqObj.method = 'POST'
    reqObj.body = JSON.stringify(newNote)

    fetch('http://localhost:9292/notes/', reqObj)
      .then(resp => resp.json())
      .then(newNoteObj => {
        this.setState({ notes: [newNoteObj, ...this.state.notes] })
      })
  }
  addReminder = (e, reminderObj) => {
    e.preventDefault()
    let newReminder = {
      title: reminderObj.title,
      reminder: reminderObj.reminder,
      datetime: new Date().toLocaleString(),
      reminderdate: reminderObj.startDate,
      archived: false,
      // image: noteObj.image,
    }

    let reqObj = {}
    reqObj.headers = { 'Content-Type': 'Application/json' }
    reqObj.method = 'POST'
    reqObj.body = JSON.stringify(newReminder)

    fetch('http://localhost:9292/reminders/', reqObj)
      .then(resp => resp.json())
      .then(newReminderObj => {
        this.setState({ reminders: [newReminderObj, ...this.state.reminders] })
      })
  }

  // PATCH REQUEST (update note)
  updateNote = (e, updatedNoteText, noteObj) => {
    e.preventDefault()
    // console.log(updatedNoteText)
    let updatedNote = {
      title: noteObj.title,
      note: updatedNoteText,
      datetime: noteObj.datetime,
      // image: noteObj.image,
      // details: [],
    }

    let reqObj = {}
    reqObj.headers = { 'Content-Type': 'Application/json' }
    reqObj.method = 'PATCH'
    reqObj.body = JSON.stringify(updatedNote)

    fetch(`http://localhost:9292/notes/${noteObj.id}`, reqObj)
      .then(resp => resp.json())
      .then(newNoteObj => {
        this.setState({ notes: this.state.notes.map(note => {
          if(note.id === newNoteObj.id) return newNoteObj
          else return note
        })
        })
      })
  }


  
  updateReminder = (e, updatedReminderText, reminderObj) => {
    e.preventDefault()
    // console.log(updatedReminderText)
    let updatedReminder = {
      title: reminderObj.title,
      reminder_text: updatedReminderText,
      datetime: reminderObj.datetime,
      reminder_date: reminderObj.reminder_date
      // image: noteObj.image,
      // details: [],
    }

    let reqObj = {}
    reqObj.headers = { 'Content-Type': 'Application/json' }
    reqObj.method = 'PATCH'
    reqObj.body = JSON.stringify(updatedReminder)

    fetch(`http://localhost:9292/reminders/${reminderObj.id}`, reqObj)
      .then(resp => resp.json())
      .then(newReminderObj => {
        this.setState({ reminders: [newReminderObj, ...this.state.reminders] })
      })
  }

  // DELETE REQUEST
  deleteNote = (noteObj) => {
    let newNotes = this.state.notes.filter(note => note.id !== noteObj.id)

    fetch(`http://localhost:9292/notes/${noteObj.id}`, { method: 'DELETE' })
      .then(resp => resp.json())
      .then(() => this.setState({ notes: newNotes }))
  }

  deleteReminder = (reminderObj) => {
    let newReminders = this.state.reminders.filter(reminder => reminder.id !== reminderObj.id)

    fetch(`http://localhost:9292/reminders/${reminderObj.id}`, { method: 'DELETE' })
      .then(resp => resp.json())
      .then(() => this.setState({ reminders: newReminders }))
  }


  // ARCHIVE NOTE
  archiveNote = (archiveData, noteObj) => {

    console.log(archiveData, noteObj)  
    // let reqObj = {}
    // reqObj.headers = { 'Content-Type': 'Application/json' }
    // reqObj.method = 'PATCH'

    // noteObj.archived === false
    //   ? reqObj.body = JSON.stringify({
    //     archived: true
    //   })
    //   : reqObj.body = JSON.stringify({
    //     archived: false
    //   })

    // fetch(`http://localhost:3000/notes/${noteObj.id}`, reqObj)
    //   .then(resp => resp.json())
    //   .then(updatedNoteObj => this.setState({
    //     notes: this.state.notes.map(note => {
    //       if (note.id === updatedNoteObj.id) return updatedNoteObj
    //       else return note
    //     })
    //   }))
  }

archiveTimer = () => {
this.state.reminders.filter(reminder => reminder.reminder_date < new Date().toLocalString())
}
archiveReminder = (archiveNote, archiveStatus, reminderObj) => {
  archiveNote(!this.props.note.archive, this.props.reminder)
}




  render() {
    console.log(this.state.reminders.map(reminder => reminder.reminderdate))
    console.log(this.state.reminders)
    // console.log(this.state.notes, this.state.reminders)
    let archived
    return (
      <Router>
        <div>
          <Navbar />
          <br />
          
          <Route exact path="/" component={() =>
            <NoteContainer
              updateNote={this.updateNote}
              addNote={this.addNote}
              deleteNote={this.deleteNote}
              // {this.state.notes.filter(note = note.archived === false) 
              // ? 
              notes={this.state.notes}
            // : null}
            />} />

          <Route exact path="/archive" component={() =>
            <ArchiveContainer
              archiveNote={this.archiveNote}
              deleteNote={this.deleteNote}
              notes={this.state.notes}
            />} />

          <Route exact path="/reminders" component={() =>
            <ReminderContainer
              updateReminder={this.updateReminder}
              addReminder={this.addReminder}
              archiveNote={this.archiveNotes}
              deleteReminder={this.deleteReminder}
              reminders={this.state.reminders}
            />} />
          
        </div>
      </Router>
    )



  }
}
export default App;
