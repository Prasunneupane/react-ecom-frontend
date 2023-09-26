import { useState } from "react";
import "./formInput.css"
const FormInput=(props)=>{
  const {label,onChange, id, type,errorMessage, options,...inputProps}=props;
  let selectOptions = options;
  const [focused,setFocused]= useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedVDC, setSelectedVDC] = useState("");
  const [selectedAddressId, selectedAddressIdState] = useState("state_id");
 


  useEffect(() => {
    const filteredDistricts =  fetch('http://127.0.0.1:8000/api/getDistrictByProvinceId',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ provinceId: selectedState }),
      });
    const districtOptions = filteredDistricts.map((district) => ({
      value: district.id,
      label: district.name,
    }));
    // Update the district options in the inputs array
    const updatedInputs = [...inputs];
    const districtInput = updatedInputs.find(
      (input) => input.name === "district_id"
    );
    districtInput.options = districtOptions;
    // Update the VDC options
    setSelectedDistrict(""); // Clear selected district when state changes
    setSelectedVDC("");

  }, [selectedState]);

  useEffect(() => {
    const filteredVDCs = ""; // Filter VDCs based on selectedDistrict
    const vdcOptions = filteredVDCs.map((vdc) => ({
      value: vdc.id,
      label: vdc.name,
    }));
    // Update the VDC options in the inputs array
    const updatedInputs = [...inputs];
    const vdcInput = updatedInputs.find((input) => input.name === "vdc_id");
    vdcInput.options = vdcOptions;

  }, [selectedDistrict]);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const handleVdcChange = (e) => {
    setSelectedVDC(e.target.value);
  };


  if(type == 'select'){
    return(
      <div className="formInput">
        <label >{label}</label>
        <select id={id} onChange={(e) => {
              if (input.name === "state_id") {
                handleStateChange(e);
              } else if (input.name === "district_id") {
                handleDistrictChange(e);
              } else if (input.name === "vdc_id") {
                handleVdcChange(e);
              }
            }}
            value={
              input.name === "state_id"
                ? selectedState
                : input.name === "district_id"
                ? selectedDistrict
                : selectedVDC
            }
          >
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