//import statements
import { useEffect, useState } from "react";
import { Select } from "./SelectComponent/Select";
import { SelectOption } from "./Types/types";
import '../App.css';
import { useOptionsContext } from "./Context/OptionsContext";

function App() {
  /**
   * singleValue for single select component
   * multiValue for multiple select component
   */
  const [singleValue, setSingleValue] = useState<SelectOption | undefined>(undefined);
  const [multiValue, setMultiValue] = useState<SelectOption[]>([]);
  // const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const {options,error} = useOptionsContext();

  //setting default selected values
  useEffect(() => {
    if (options) {
      if (options.length > 0) {
        setSingleValue(options[0]);
        setMultiValue([options[0]]);
      }
      setLoading(false);
    }
  }, [options]);

 //when no options selected
  useEffect(() => {
    if (singleValue == undefined) {
      setSingleValue({ id: 0, label: "Please Select" })
    }
  }, [singleValue])

  if (loading) return <h3>Loading....</h3>
  if (error) return <h1>{error}</h1>

  return <div className="container-wrapper">
    <span className="title">Custom Select Component</span>
    <div className="container">
      <Select isMultiple  value={multiValue} onChange={op => setMultiValue(op)} />
      <br />
      <Select value={singleValue} onChange={op => setSingleValue(op)} />
    </div>
  </div>
}

export default App;