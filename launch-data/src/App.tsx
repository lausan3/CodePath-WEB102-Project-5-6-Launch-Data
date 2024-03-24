import { useState, useEffect } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import MainDisplay from './components/MainDisplay'
import MiniDisplay from './components/MiniDisplay'

export interface APIData {
  results: {name: string, last_updated: string, status: string, lsp_name: string}[]
}

function App() {
  const miniDisplayData = [
    {
      title: "Launches",
      body: "0"
    },
    {
      title: "Launches",
      body: "0"
    },
    {
      title: "Launches",
      body: "0"
    },
  ];
  const [miniData, setMiniData] = useState(miniDisplayData);
  const [data, setData] = useState<APIData>({results: []});
  const [filteredResults, setFilteredResults] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const baseUrl = "https://lldev.thespacedevs.com/2.2.0/launch/?mode=list";

  useEffect( () => {
    const fetchURL = async () => {
      const response = await fetch(baseUrl);
      const json = await response.json().then(json => setData(json.results));
    }
    
    fetchURL().catch(console.error);
  }, []);

  const searchItems = (searchValue: string) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.keys(data).filter((item) => 
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(data.results));
    }
  };

  return (
    <div className="whole-page">
      <Sidebar/>
      <div className="main-container">
        <div className="mini-container">
          {
            miniData.length > 0 ? miniData.map( (mini, index) => {
              return (
                <MiniDisplay key={index} title={mini.title} body={mini.body}/>
              )
            }) : <p>Nothing here</p>
          }
        </div>
        {
          searchInput === "" ? <MainDisplay apiData={data.results} handleForm={(searchInput: any) => searchItems(searchInput.target.value)}/> : <p>No Data</p>
        }
      </div>
    </div>
  )
}

export default App
