import { useState, useEffect } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import MiniDisplay from './components/MiniDisplay'
import Table from './components/Table'

function App() {
  const miniDisplayDataInitial = [
    {
      title: "Launches",
      body: "0"
    },
    {
      title: "Most Common Status",
      body: "0"
    },
    {
      title: "Most Common Agency",
      body: "0"
    },
  ];
  const [miniDisplay, setMiniDisplay] = useState(miniDisplayDataInitial);
  const [miniDisplayData, setMiniDisplayData] = useState<any>();
  const [data, setData] = useState<string[]>([]);
  const [filteredResults, setFilteredResults] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedStatus, setSelectedStatus] = useState('none');
  const baseUrl = "https://lldev.thespacedevs.com/2.2.0/launch/?mode=list";

  // Fetch Data
  useEffect( () => {
    const fetchURL = async () => {
      const response = await fetch(baseUrl);
      const json = await response.json();

      setMiniDisplayData(json);
      setData(json.results);
    }
    
    fetchURL().catch(console.error);
    console.log(data)
    setFilteredResults(data);
  }, []);

  // Filter results
  useEffect( () => {
    const filterByName = (data: any) => {
      return data.filter((item: any) => {
        return item.name.toLowerCase().includes(searchInput.toLowerCase());
      });
    };
    
    const filterByStatus = (data: any) => {
      if (selectedStatus === 'none') {
        return data;
      }
      return data.filter((item: any) => {
        return item.status.abbrev.toLowerCase() === selectedStatus.toLowerCase();
      });
    }

    let filteredData = data;

    if (searchInput !== "") {
      filteredData = filterByName(filteredData);
    }

    if (selectedStatus !== "none") {
      filteredData = filterByStatus(filteredData);
    }

    setFilteredResults(filteredData);
  }, [selectedStatus, searchInput, data]);

  
  const handleSearchInput = (event: any) => {
    setSearchInput(event.target.value);
  };
  
  const handleStatusChange = (event: any) => {
    setSelectedStatus(event.target.value);
  };

  // Set Mini Display data on change
  useEffect( () => {
    setMiniDisplay(parseMiniDisplayData());
  }, [miniDisplayData])

  const parseMiniDisplayData = () => {
    console.log(miniDisplayData);

    if (!miniDisplayData) {
      return miniDisplayDataInitial;
    }

    const launchesCount: string = miniDisplayData.count || "0";

    // Count most common status code
    let commonStatus: string = "N/A";
    if (miniDisplayData.results) {
      const counts: Record<string, number> = miniDisplayData.results.reduce((acc: Record<string, number>, curr: any) => {
        const status = curr.status?.abbrev || "N/A";
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});
    
      commonStatus = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    }

    // Count most common agency
    let commonAgency: string = "N/A";
    if (miniDisplayData.results) {
      const counts: Record<string, number> = miniDisplayData.results.reduce((acc: Record<string, number>, curr: any) => {
        const agency = curr.lsp_name || "N/A";
        acc[agency] = (acc[agency] || 0) + 1;
        return acc;
      }, {});
    
      commonAgency = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    }

    return [
      {
        title: "Launches",
        body: launchesCount
      },
      {
        title: "Most Common Status",
        body: commonStatus
      },
      {
        title: "Most Common Agency",
        body: commonAgency
      },
    ];
  }

  return (
    <div className="whole-page">
      <Sidebar/>
      <div className="main-container">
        <div className="mini-container">
          {
            miniDisplay.length > 0 ? miniDisplay.map( (mini, index) => {
              return (
                <MiniDisplay key={index} title={mini.title} body={mini.body}/>
              )
            }) : <p>Nothing here</p>
          }
        </div>
        <div className="main-display">
            <h3 style={{margin: '8px 10px'}}>Filters:</h3>
            <label
                htmlFor="name"
                style={{margin: "10px 10px"}}
            >Search:
            </label>
            <input 
                className="main-name"
                type="text"
                placeholder="Enter Name..."
                name="name"
                onChange={handleSearchInput}
                value={searchInput}
            />
            <label
              htmlFor="status"
              style={{margin: "10px 10px"}}
            >Status:</label>
            <select 
              className="main-status"
              value={selectedStatus} 
              onChange={handleStatusChange}
            >
              <option value="none">None</option>
              <option value="success">Success</option>
              <option value="failure">Failure</option>
              <option value="ongoing">Ongoing</option>
            </select>
            {
              filteredResults === data 
              ? <Table apiData={data}/>
              : <Table apiData={filteredResults}/>
            }
        </div>
      </div>
    </div>
  )
}

export default App
