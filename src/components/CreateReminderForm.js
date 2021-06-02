import React from 'react'

class CreateReminderForm extends React.Component{
    
    state = {
        title: "",
        // dateTime: "",
        note:"",
        // details: "",
        deadline: ""

    }

    

    render() {
        // console.log(this.props.posts)
        return(
            <div className={"noteForm"}>
                {/* <h3>Make a note or reminder</h3> */}
               <form onSubmit={(e)=> this.props.addNote(e, this.state)}>
                   
                   <input 
                   type="text" 
                   placeholder="Title" 
                   name="title" 
                   value={this.state.title}
                   onChange={(e)=>this.handleSubmit(e)}
                   ></input>

                   {/* <input type="text" placeholder="image URL " name="image"
                   value={this.state.image}
                   onChange={(e)=>this.handleSubmit(e)}
                   ></input> */}
                    <br></br>
                   <input 
                   type="text" 
                   placeholder="Note" 
                   name="note" 
                   value={this.state.note}
                   onChange={(e)=>this.handleSubmit(e)}
                   ></input>

                   <button type="submit" className="submit-comment" >Submit</button>
               </form>
            </div>
        )
    }
}

export default CreateReminderForm