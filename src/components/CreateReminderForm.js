import React from 'react'
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";


class CreateReminderForm extends React.Component {



    constructor(props) {
        super(props)
        this.state = {
            title: "",
            // dateTime: "",
            reminder_text: "",
            // details: "",
            deadline: "",
            startDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        })
    }

    onFormSubmit(e) {
        e.preventDefault();
        console.log(this.state.startDate)
    }


    handleSubmit = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        // console.log(this.props.posts)
        return (
            <div className={"reminderForm"}>
                {/* <h3>Make a note or reminder</h3> */}
                <form onSubmit={(e) => this.props.addReminder(e, this.state)}>

                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={this.state.title}
                        onChange={(e) => this.handleSubmit(e)}
                    ></input>

                    {/* <input type="text" placeholder="image URL " name="image"
                   value={this.state.image}
                   onChange={(e)=>this.handleSubmit(e)}
                   ></input> */}
                    <br></br>
                    <input
                        type="text"
                        placeholder="Reminder"
                        name="reminder_text"
                        value={this.state.reminder_text}
                        onChange={(e) => this.handleSubmit(e)}
                    ></input>
                    <div className="form-group">
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                            name="startDate"
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={20}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"

                        />

                    </div>

                    <button type="submit" className="submit-comment" >Submit</button>
                </form>
            </div>
        )
    }
}

export default CreateReminderForm
