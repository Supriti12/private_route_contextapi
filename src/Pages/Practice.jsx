import React, { useState } from 'react'
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useAuth } from '../Context/UserProvider';

const Practice = () => {
  const initialValue={
    text:''
  }
  const [user,setUser]=useState(initialValue)
  const {textContent,setTextContent}=useAuth()
  const [text,setText]=useState('')
   var formats = [
     'header',
     'height',
     'bold',
     'italic',
     'underline',
     'strike',
     'blockquote',
     'list',
     'color',
     'bullet',
     'indent',
     'link',
     'image',
     'align',
     'size',
   ];

   var modules = {
     toolbar: [
       [{ size: ['small', false, 'large', 'huge'] }],
       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
       [{ list: 'ordered' }, { list: 'bullet' }],
       ['link', 'image'],
       [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
       [
         {
           color: [
             '#000000',
             '#e60000',
             '#ff9900',
             '#ffff00',
             '#008a00',
             '#0066cc',
             '#9933ff',
             '#ffffff',
             '#facccc',
             '#ffebcc',
             '#ffffcc',
             '#cce8cc',
             '#cce0f5',
             '#ebd6ff',
             '#bbbbbb',
             '#f06666',
             '#ffc266',
             '#ffff66',
             '#66b966',
             '#66a3e0',
             '#c285ff',
             '#888888',
             '#a10000',
             '#b26b00',
             '#b2b200',
             '#006100',
             '#0047b2',
             '#6b24b2',
             '#444444',
             '#5c0000',
             '#663d00',
             '#666600',
             '#003700',
             '#002966',
             '#3d1466',
             'custom-color',
           ],
         },
       ],
     ],
   };
   const handleProcedureContentChange = e => {
     console.log('content---->', e);
      setText(e);
   };

   const SubmitInfo = e => {
    e.preventDefault()
    let data={
      text:user.text
    }
    setTextContent([...textContent,user])
    setUser(initialValue)
   };

  const aoo=[
  {
    name:"Supriti",
    age:25
  },
  {
    name:"Rajat",
    age:25
  }
]

const [data,setData]=useState(aoo);

const handleClick=()=>{
  const newState=data.map((obj,k)=>{
    if(obj.name=="Rajat"){
      return {...obj,name:"Sukanya"}
    }
    if(obj.age==26){
      return {...obj,age:28}
    }
    return obj
  })
  setData(newState)
  console.log(newState)
}
  return (
    <>
      {data?.map((user, k) => {
        return (
          <>
            <div key={k}>
              Name: {user.name}, Age: {user.age}
            </div>
          </>
        );
      })}
      <button className="button" onClick={handleClick}>
        Change
      </button>

      <div>
        <h1 style={{ textAlign: 'center' }}>Text Editor In React JS</h1>
        <div style={{ display: 'grid', justifyContent: 'center' }}>
          <form onSubmit={SubmitInfo}>
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              // value={user.text}
              placeholder="write your content ...."
              onChange={e => handleProcedureContentChange(e)}
              style={{ height: '220px' }}
            ></ReactQuill>
          </form>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: text }} />

    </>
  );
}

export default Practice