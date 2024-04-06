import { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'

interface ChartDataItem {
    year: string,
    statuses: {status: string, count: number}[]
}

const Graph = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [chartData, setChartData] = useState<ChartDataItem[]>([]);

    // Fetch data for launches
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            const response = await fetch(`https://lldev.thespacedevs.com/2.2.0/launch?mode=list`);
            const json = await response.json();

            setData(json.results);

            setIsLoading(false);
        }
        
        fetchData().catch(console.error);
    }, []);

    // Parse raw launch data
    const parseData = () => {
        // After data is fetched and set
        let aggregateData: { [key: string]: ChartDataItem } = {};

        data.forEach((launch: any) => {
            let year = launch.window_end.substring(0, 4);
            if (!aggregateData[year]) {
                aggregateData[year] = { year: year, statuses: [{ status: 'Success', count: 0 }, { status: 'Failure', count: 0 }] };
            }

            switch (launch.status.abbrev) {
                case 'Success':
                    aggregateData[year].statuses.find(s => s.status === 'Success')!.count++;
                    break;
                case 'Failure':
                    aggregateData[year].statuses.find(s => s.status === 'Failure')!.count++;
                    break;
            }
        });

        setChartData(Object.values(aggregateData));

        console.log(chartData);
    };

    useEffect(() => {
        if (data !== null) {
            parseData();
        }
    }, [data])


    const colors = ["#1c499c", "#9c691c"];

    const renderLineChart = (
        <LineChart className="graph" width={1000} height={600} data={chartData}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="year"/>
            <YAxis />
            <Legend />
            <Tooltip />
            
            {chartData[0]?.statuses.map((status, index) => (
                <Line
                    key={status.status}
                    type="monotone"
                    dataKey={`statuses[${index}].count`}
                    name={status.status}
                    stroke={colors[index]}
                />
             ))}
        </LineChart>
    )

    // Loading screen
    if (isLoading) {
        return (
            <div className="main-container">
                <div className="main-display">
                    <div className="center-container">
                        <h1>Loading...</h1>
                    </div>
                </div>
            </div>
        )
    
    }

    // Error loading data screen
    if (chartData.length <= 0) {
        return (
            <div className="main-container">
                <div className="main-display">
                    <div className="center-container">
                        <h1>Parsing data or error...</h1>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="main-container">
            <div className="main-display">
                <div className="graph-container">
                    <h2>Graph modeling the amount of successes vs failures in every documented year:</h2>
                    {
                        renderLineChart
                    }
                </div>
            </div>
        </div>
    );
  };
  
  export default Graph;