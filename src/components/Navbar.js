import React from "react"
import { NavLink } from 'react-router-dom';

const link = {
  width: '100px',
  padding: '12px',
  margin: '0 6px 6px',
  background: 'lightgrey',
  textDecoration: 'none',
  color: 'white',
  borderRadius: '0 px',

}


class Navbar extends React.Component {

  render() {
    return (
      //         <div style="display:flex;justify-content:center;align-items:center;">
      //   <div></div>
      // </div>

      <span >
        <h1>Sticky Note</h1>
        <nav>
          <NavLink
            to="/"
            exact
            style={link}
            activeStyle={{
              background: 'grey'
            }}
          >Notes</NavLink>

          <NavLink
            to="/reminders"
            exact
            style={link}
            activeStyle={{
              background: 'grey'
            }}
          >Reminders</NavLink>

          <NavLink
            to="/archives"
            exact
            style={link}
            activeStyle={{
              background: 'grey'
            }}
          >Archive</NavLink>
        </nav>
      </span>

    )
  }
}
export default Navbar;