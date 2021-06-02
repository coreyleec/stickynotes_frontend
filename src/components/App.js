
import React from 'react'
import Navbar from "../components/Navbar"
import ArchiveContainer from "../containers/ArchiveContainer"
import NoteContainer from "../containers/NoteContainer"
import ReminderContainer from "../containers/ReminderContainer"
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { Switch } from "react-router";

class App extends React.Component {

  state = {
    notes: [],
    // note: ""
    archived: false,
   }
  
  // GET REQUEST
   componentDidMount() {
    fetch('http://localhost:9292/notes/')
    .then(resp => resp.json())
    .then(noteData => this.setState({notes: noteData}))
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
  reqObj.headers = {'Content-Type': 'Application/json'}
  reqObj.method = 'POST'
  reqObj.body = JSON.stringify(newNote)

  fetch('http://localhost:9292/notes/', reqObj)
  .then(resp => resp.json())
  .then(newNoteObj => {
    this.setState({notes: [newNoteObj, ...this.state.notes]})
    })
  }

// PATCH REQUEST (update note)
updateNote = (e, updatedNoteText, noteObj) => {
  e.preventDefault()
  console.log(updatedNoteText)
    let updatedNote = {
      title: noteObj.title,
      note: updatedNoteText,
      datetime: noteObj.datetime,
      // image: noteObj.image,
      // details: [],
    }

  let reqObj = {}
  reqObj.headers = {'Content-Type': 'Application/json'}
  reqObj.method = 'PATCH'
  reqObj.body = JSON.stringify(updatedNote)
  
  fetch(`http://localhost:9292/notes/${noteObj.id}`, reqObj)
  .then(resp => resp.json())
  .then(newNoteObj => {
    this.setState({notes: [newNoteObj, ...this.state.notes]})
    })
  }

// DELETE REQUEST
deleteNote = (noteObj) => {
    let newNotes = this.state.notes.filter(note => note.id !== noteObj.id)

    fetch(`http://localhost:9292/notes/${noteObj.id}`, {method: 'DELETE'})
    .then(resp => resp.json())
    .then(() => this.setState({notes: newNotes}))
  }

// ARCHIVE NOTE
archiveNote = (archiveData, noteObj) => {
    
    // console.log(favoriteData, postObj)  

        
        let reqObj = {}
          reqObj.headers = {'Content-Type': 'Application/json'}
          reqObj.method = 'PATCH'

        noteObj.archived === false 
        ? reqObj.body = JSON.stringify({
          archived: true }) 
        : reqObj.body = JSON.stringify({
          archived: false }) 
    
        fetch(`http://localhost:3000/notes/${noteObj.id}`, reqObj)
        .then(resp => resp.json())
        .then(updatedNoteObj => this.setState({
          notes: this.state.notes.map(note => {
            if(note.id === updatedNoteObj.id) return updatedNoteObj
            else return note
          })
        }))
      }



 render() {
  

  return (
    <Router>
    <div>
        <Navbar  />
        <br/>
        {/* <Switch> */}
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
          
        <Route exact path="/archive" component={ () => 
        <ArchiveContainer 
        archiveNote={this.archiveNote} 
        deleteNote={this.deleteNote}  
        notes={this.state.notes}
        />} />

        <Route exact path="/reminders" component={ () => 
        <ReminderContainer 
        // addReminder={this.addReminder}
        archiveNote={this.archivedNotes} 
        deleteNote={this.deleteNote}  
        />} />
        {/* </Switch> */}
    </div>
  </Router>
  )
 
    
    
  }
}
export default App;
