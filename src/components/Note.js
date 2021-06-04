import React from 'react'


export default class Note extends React.Component {

    state = {
        note: this.props.note.note,
        edit: false,
        newNote: "",
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

    handleUpdatedNote = (updatedNote) => {
        this.setState({
            newNote: updatedNote,
        })
    }

    render() {

        return (
            <div onClick={(e) => this.toggleOff(e)}
                key={this.props.note.id} className='note'>

                <span>
                    {/* NOTE TITLE */}
                    <h3 className='title'>{this.props.note.title}</h3>
                    <br></br>

                    {/* DELETE NOTE */}
                    <button onClick={() => this.props.deleteNote(this.props.note)}>X</button>
                </span>

                {/* <img src={this.props.note.image}></img> */}

                {/* EDIT NOTE */}
                {this.state.edit
                    ? <form onSubmit={(e) => this.props.updateNote(e, this.state.newNote, this.props.note)}>
                        <input
                            type="text"
                            defaultValue={this.state.note}
                            //    name="updatedNote" 
                            className="inputText"
                            //    value={this.state.updatedNote}
                            onChange={(e) => this.handleUpdatedNote(e.target.value)}
                        ></input>
                    </form>
                    : <h4 className={this.state.note} onClick={(e) => this.toggleEdit(e)}>{this.state.note}</h4>}

                {/* onClick everywhere that isn't the form changes state */}
                {/* ARCHIVE BUTTON AND TIMESTAMP */}
                <span>
                    <button onClick={() => this.props.archiveNote(!this.props.note.archive, this.props.note)}>Archive</button>
                    <p>{this.props.note.datetime}</p>
                </span>
            </div>
        )
    }

}
