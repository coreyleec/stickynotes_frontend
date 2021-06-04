import React, { Component } from 'react';

class Reminder extends Component {
    state = {
        reminder: this.props.reminder.reminder,
        edit: false,
        newReminder: "",
        archived: false
    }



    toggleEdit = (e) => {
        e.preventDefault()
        this.setState({
            edit: !this.state.edit,
        })
    }
    toggleOff = (e) => {
        // debugger
        console.log(e.target.className)
        this.state.edit !== false
            && e.target.className !== "inputText"
            && this.setState({
                edit: !this.state.edit,
            })
    }

    handleUpdatedReminder = (updatedReminder) => {
        this.setState({
            newReminder: updatedReminder,
        })
    }

    render() {

        // if (this.props.reminder.datetime > Date().toLocaleString()) {
        //     this.setState({
        //         archived: false
        //     })
        // } else {
        //     this.setState
        // }

        return (
            <div onClick={(e) => this.toggleOff(e)}
                key={this.props.reminder.id} className='note'>

                <span>
                    {/* REMINDER TITLE */}
                    <h3 className='title'>{this.props.reminder.title}</h3>
                    <br></br>

                    {/* DELETE REMINDER */}
                    <button onClick={() => this.props.deleteReminder(this.props.reminder)}>X</button>
                </span>

                {/* <img src={this.props.note.image}></img> */}

                {/* EDIT REMINDER */}
                {this.state.edit
                    ? <form onSubmit={(e) => this.props.updateReminder(e, this.state.newReminder, this.props.reminder)}>
                        <input
                            type="text"
                            defaultValue={this.state.reminder}
                            //    name="updatedNote" 
                            className="inputText"
                            //    value={this.state.updatedNote}
                            onChange={(e) => this.handleUpdatedReminder(e.target.value)}
                        ></input>
                    </form>
                    : <h4 className={this.state.reminder} onClick={(e) => this.toggleEdit(e)}>{this.state.reminder}</h4>}

                {/* onClick everywhere that isn't the form changes state */}
                {/* ARCHIVE BUTTON AND TIMESTAMP */}
                <h4>{this.props.reminder.datetime}</h4>

                <span>
                    <button onClick={() => this.props.archiveReminder(!this.props.reminder.archive, this.props.reminder,
                        this.props.reminder.archived !== null ? alert("Archived!") : alert("Unarchived :("))}>Archive</button>
                </span>
            </div>
        );
    }
}

export default Reminder;