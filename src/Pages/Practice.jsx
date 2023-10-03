import React, { useState } from 'react'

const Practice = () => {
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
        {
          data?.map((user,k)=>{
            return (
              <>
                <div key={k}>Name: {user.name},  Age: {user.age}</div>
              </>
            );
          })
        }
    <button className='button' onClick={handleClick}>Change</button>
    </>
  )
}

export default Practice