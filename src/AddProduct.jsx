import {useRef,useState,useEffect} from "react";
// import FormInput from 'react-bootstrap';
import Header from './Header'
import FormInput from "./FormInput";
import "./formInput.css";
function UpdateProduct(){
  // const [username,setUsername] = useState("");
  // const usernameRef =useRef();
  
  const [values,setValues]=useState({
    patient_name:"",
    mobile_number:"",
    email:"",
    age:"",
    dob:"",
    state_id:"",
    district_id:"",
    vdc_id:"",
  });
  // console.log(values);

  const [stateOptions, setStateOptions] = useState([]);

  async function fetchStateOptions() {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/getstates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching state data:', error);
      return [];
    }
  }

  useEffect(() => {
    async function populateStateOptions() {
      const options = await fetchStateOptions();
      setStateOptions(options);
    }

    populateStateOptions();
  }, []);
  
  // Call the function to populate the state options within the inputs array
 
 

  const inputs = [
    {
      id:1,
      name:"patient_name",
      type:"text",
      placeholder:"Enter Patient Name",
      errorMessage:"Please Enter Patient Name",
      label:"Patient Name",
      required:true


    },
    {
      id:2,
      name:"mobile_number",
      type:"text",
      placeholder:"Enter Mobile Number",
      errorMessage:"Please Enter Mobile Number",
      maxLength:"10",
      label:"Mobile Number",
      required:true


    },
    {
      id:3,
      name:"email",
      type:"email",
      placeholder:"Enter Email",
      // @bie_desi
      label:"Email"


    },
    {
      id:4,
      name:"age",
      type:"number",
      placeholder:"Enter Patient Age",
      errorMessage:"Please Enter Patient Age",
      label:"Age",
      required:true


    },
    {
      id:5,
      name:"dob",
      type:"date",
      placeholder:"DOB",
      // errorMessage:"Please Ent"
      label:"DOB"



    },
    {
      id: 6,
      name: "state_id",
      type: "select",
      label: "State",
      errorMessage:"Please Select State",
      required:true,
      options: stateOptions.map(state => ({
        value: state.id,
        label: state.province_name,
      }))
    },
    {
      id: 7,
      name: "district_id",
      type: "select",
      label: "District",
      errorMessage:"Please Select District",
      required:true,
      options: [
      ],
    },
    {
      id: 8,
      name: "vdc_id",
      type: "select",
      label: "VDC",

      errorMessage:"Please Select VDC/Municipality",
      required:true,
      options: [
      ],
    },

  ]
 
  // console.log(inputs);
  const handleSubmit= (e) =>{
    e.preventDefault();
    

    const data= new FormData(e.target);
    console.log(Object.fromEntries(data.entries()));
  }

  const onChange= (e)=>{
    setValues({...values,[e.target.name]: e.target.value});
  }
  return (
    <div >
      <Header />
      <h1>Update Product Page</h1>
      <div className="patient-form">
      <form onSubmit={handleSubmit}>
        {inputs.map((input)=>(
          <FormInput key={input.id} {...input}  onChange={onChange}/>
        ))}
        
        <button type="submit">Submit</button>
      </form>
      </div>
    </div>
  )
}

export default UpdateProduct
