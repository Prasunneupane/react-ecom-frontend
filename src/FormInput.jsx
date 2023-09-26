import { useState } from "react";
import "./formInput.css"
const FormInput=(props)=>{
  const {label,onChange, id, type,errorMessage, options,...inputProps}=props;
  const [focused,setFocused]= useState(false);
  // const [stateOptions, setStateOptions] = useState([]);
  const [districtOptions, setSelectedDistrict] = useState([]);
  const [vdcOptions, setSelectedVdc] = useState([]);
  const handleFocus = (e)=>{
    setFocused(true);
  }

  const handleStateChange = async (e) => {
    const selectedDistrict = e.target.value;
    
    
    setSelectedDistrict(""); // Reset district when state changes
    setSelectedVdc(""); // Reset VDC when state changes

    // Fetch and set district options based on the selected state
    try {
      const response = await fetch('http://127.0.0.1:8000/api/getVdcByDistrictId',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ districtId: selectedDistrict }),
      });
      const data = await response.json();
      // console.log(data);
      districtOptions.push(data);
      // console.log(options);
    } catch (error) {
      console.error('Error fetching district options:', error);
    }
  };

  const handleDistrictChange = async (e) => {
    const selectedDistrict = e.target.value;
    // console.log(selectedDistrict);
    setSelectedDistrict(selectedDistrict);
    setSelectedVdc(""); // Reset VDC when district changes

    // Fetch and set VDC/Municipality options based on the selected district
    try {
      const response = await fetch('http://127.0.0.1:8000/api/getDistrictByProvinceId/'+selectedState);
      const data = await response.json();
      setVdcOptions(data);
    } catch (error) {
      console.error('Error fetching VDC/Municipality options:', error);
    }
  };

  const handleVdcChange = (e) => {
    setSelectedVdc(e.target.value);
  };
  if(type == 'select'){
    return(
      <div className="formInput">
        <label >{label}</label>
        <select onChange={onChange} id={id} {...inputProps} onBlur={handleFocus} focused={focused.toString()}>
            
        { options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span>{errorMessage}</span>
      </div>
    );
  }
  return(
    <div className="formInput">
      <label >{label}</label>
      <input {...inputProps} onChange={onChange} type={type}  onBlur={handleFocus} focused={focused.toString()}/>
      <span>{errorMessage}</span>
    </div>
    
  )
}

export default FormInput