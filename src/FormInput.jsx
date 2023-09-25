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
    const selectedState = e.target.value;
    
    
    setSelectedDistrict(""); // Reset district when state changes
    setSelectedVdc(""); // Reset VDC when state changes

    // Fetch and set district options based on the selected state
    try {
      const response = await fetch('http://127.0.0.1:8000/api/getDistrictByProvinceId',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ provinceId: selectedState }),
      });
      const data = await response.json();
      const districtOptions = data.map((district) => ({
        value: district.id,
        label: district.name,
      }));
      // Update the district options in the inputs array
      const updatedInputs = [...inputProps];
      const districtInput = updatedInputs.find(
        (input) => input.name === "district_id"
      );
      districtInput.options = districtOptions;
     
    } catch (error) {
      console.error('Error fetching district options:', error);
    }
  };

  const handleDistrictChange = async (e) => {
    const selectedDistrict = e.target.value;
    console.log(selectedDistrict);
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
        <select id={id} onChange={(e) => {
            onChange(e);
            console.log(e.target)
            if (e.target.name === 'state_id') {
              handleStateChange(e);
            } else if (e.target.name=== 'district_id') {
              handleDistrictChange(e);
            } else if (e.target.name === 'vdc_id') {
              handleVdcChange(e);
            }
          }}{...inputProps} onBlur={handleFocus} focused={focused.toString()}>
            
            {options.map((option) => (
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