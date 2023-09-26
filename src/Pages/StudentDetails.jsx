import React, { useState } from 'react';
import { useAuth } from '../Context/UserProvider';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'Firstname',
    selector: row => row.firstname,
  },
  {
    name: 'Lastname',
    selector: row => row.lastname,
  },
  {
    name: 'Email',
    selector: row => row.email,
  },
  {
    name: 'Phone',
    selector: row => row.phone,
  },
  {
    name: 'Address',
    selector: row => row.address,
  },
  {
    name: 'Gender',
    selector: row => row.gender,
  },
  {
    name: 'categories',
    selector: row => row.categories,
  },
  {
    name: 'Degree',
    selector: row =>
      row.education.map(edu => {
        return edu.degree;
      }),
  },
  {
    name: 'Branch',
    selector: row =>
      row.education.map(edu => {
        return edu.branch;
      }),
  },
  {
    name: 'College',
    selector: row =>
      row.education.map(edu => {
        return edu.college;
      }),
  },
];

const StudentDetails = () => {
  const { data, setData } = useAuth();
  let [searchdata, setSearchdata] = useState(data);
  const [file, setFile] = useState();

  function Change(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  // let img = media => {
  //   return `http://localhost:5173/` + `${media}`;
  // };

  const handleChange = e => {
    let filterdata = [];
    filterdata = data.filter(item => {
      const lowerCase = item.firstname.toLowerCase();
      const email = item.email;
      if (e.target.value == '') {
        return true;
      } else {
        // console.log(e.target.value);
        return lowerCase.includes(e.target.value);
        // return JSON.stringify(data);
      }
    });

    setSearchdata(filterdata);
    console.log(filterdata);
  };
  return (
    <div>
      {/* {data?.map((item, k) => {
        return (
          <>
            <h4>
              {item.firstname} {item.lastname}
            </h4>
            <h4>{item.email}</h4>
            <h4>{item.phone}</h4>
            <h4>{item.address}</h4>
            <h4>{item.gender}</h4>
            <h4>{item.categories}</h4>
            {item?.education?.map((edu, k) => {
              return (
                <>
                  <h5>{edu.degree}</h5>
                  <h5>{edu.branch}</h5>
                  <h5>{edu.college}</h5>
                </>
              );
            })}
          </>
        );
      })} */}
      <input
        type="text"
        placeholder="Enter your keyword"
        style={{ marginLeft: '68rem' }}
        onChange={handleChange}
        autoFocus
      />
      {/* <div>
        <img src={img} />
      </div> */}

      <h2>Add Image:</h2>
      <input type="file" onChange={Change} />
      <img src={file} style={{ width: '100px' }} />

      <DataTable columns={columns} data={searchdata} />
    </div>
  );
};

export default StudentDetails;
