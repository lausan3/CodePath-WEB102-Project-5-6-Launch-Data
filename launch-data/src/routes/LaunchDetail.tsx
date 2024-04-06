import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";

const LaunchDetail = () => {
    const params = useParams();
    const id = params.id;

    const [isLoading, setIsLoading] = useState(true);
    const [launchData, setLaunchData] = useState<any>(null);

    // Fetch data for specific launch based on id
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            const response = await fetch(`https://lldev.thespacedevs.com/2.2.0/launch/${id}?mode=list`);
            const json = await response.json();

            setLaunchData(json);

            setIsLoading(false);
        }
        
        fetchData().catch(console.error);
        
    
        console.log(launchData);
    }, [id]);

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

    if (launchData === null) {
        return (
            <div className="main-container">
                <h1>Error loading launch data</h1>
            </div>
        )
    }

    const status = launchData.status;
    const rocket = launchData.rocket.configuration;

    return (
        <div className="main-container">
            <div className="main-display">
                <div className="launch-text-ctn">
                    <h1>{launchData.name}</h1>
                    <h3>{launchData.mission.description}</h3>
                    <p>Status: {status.name}</p>
                    <p>Reason: {status.description}</p>
                    <h2>About the Rocket:</h2>
                    <p>
                        The rocket used in the {launchData.mission.name} mission was called {rocket.full_name}.
                        Manufactured by {rocket.manufacturer.name}, it had {rocket.successful_launches} successful launches
                        and {rocket.successful_landings} successful landings. {rocket.manufacturer.description !== "" ? rocket.manufacturer.description : ""}
                    </p>
                    {
                        rocket.wiki_url !== null ? <a className="launch-more-info" href={rocket.wiki_url} target="_blank">More Info</a>
                        : null
                    }
                </div>
            </div>
        </div>
    )
}

export default LaunchDetail