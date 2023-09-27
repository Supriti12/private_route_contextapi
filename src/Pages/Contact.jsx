import React, { useState } from 'react'
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/UserProvider';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
 const initialvalues={
  name:"",
  email:"",
  password:""
 }
const Contact = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [user,setUser]=useState(initialvalues)
  const {contactUser,setContactUser}=useAuth()
  const navigate=useNavigate();

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const postUserData=(e)=>{
    let name,value;
    name=e.target.name;
    value=e.target.value;
    setUser({...user,[name]:value})
  }

  const SubmitInfo=(e)=>{
    e.preventDefault()
    let data={
      name:user.name,
      email:user.email,
      password:user.password
    }
     setContactUser([...contactUser, user]);
     setIsOpen(false);
    // console.log(data)
    
  }
  return (
    <>
      <button className="button" onClick={openModal}>
        Open Modal
      </button>
      {contactUser?.map((users)=>{
          return (
            <>
              <h5>Name: {users.name}</h5>
              <h5>Email: {users.email}</h5>
              <h5>Password: {user.password}</h5>
            </>
          );
      })}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <h2 ref={_subtitle => (subtitle = _subtitle)} style={{ marginLeft: '3rem' }}>
            Hello User
          </h2>

          <button className="button" onClick={closeModal}>
            close
          </button>
        </div>

        <form onSubmit={SubmitInfo}>
          <div className="general-info" style={{ paddingTop: '2rem' }}>
            <div>
              <label>Name:</label>
            </div>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={user.name}
              onChange={e => postUserData(e)}
            />
          </div>
          <div className="general-info">
            <div>
              <label>Email:</label>
            </div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={e => postUserData(e)}
            />
          </div>
          <div className="general-info">
            <div>
              <label>Password:</label>
            </div>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={e => postUserData(e)}
            />
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </Modal>
    </>
  );
}

export default Contact

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import { TextField } from '@mui/material';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// export default function Contact() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <div>
//       <Button onClick={handleOpen}>Open modal</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           {/* <Typography id="modal-modal-title" variant="h6" component="h2">
//             Text in a modal
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//           </Typography> */}
//           <Typography sx={{ mt: 2 }}>Name: </Typography>
//           <TextField
//             type="text"
//             onChange={e => {
//               postUserData(e);
//             }}
//           />
//           <Typography sx={{ mt: 6 }}>Email: </Typography>
//           <TextField
//             type="text"
//             onChange={e => {
//               postUserData(e);
//             }}
//           />
//         </Box>
//       </Modal>
//     </div>
//   );
// }