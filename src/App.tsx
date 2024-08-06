import { useEffect, useState } from "react";
import { Select } from "./SelectComponent/Select";
import { SelectOption } from "./Types/types";
import { fetchOptions } from "./Sever-api/api";
import  '../App.css';

function App() {
  /**
   * value holds the selected single option
   */
  const [singleValue, setSingleValue] = useState<SelectOption | undefined>(undefined);
  const [multiValue, setMultiValue] = useState<SelectOption[]>([]);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch options from API using the function from api.ts
    const getOptions = async () => {
      try {
        const fetchedOptions = await fetchOptions();
        setOptions([...fetchedOptions]);
        // Set default selected values based on the fetched options
        if (fetchedOptions.length > 0) {
          setSingleValue(fetchedOptions[0]);
          setMultiValue([fetchedOptions[0]]);
        }
        setLoading(false);
        // console.log(fetchedOptions);
        // console.log(options);       
      } catch (err) {
        setError('Failed to fetch options');
        setLoading(false);
      }
    };

    getOptions();
  }, []);
  if (loading) return <h6>Loading....</h6>
  if (error) return <h1>{error}</h1>
  return <div className="container-wrapper">
    <span className="title">Custom Container Component</span>
    <div className="container">
    <Select isMultiple options={options} value={multiValue} onChange={op => setMultiValue(op)} />
    <br />
    <Select options={options} value={singleValue} onChange={op => setSingleValue(op)} />
    </div>
  </div>
}

export default App;