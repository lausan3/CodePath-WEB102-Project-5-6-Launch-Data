import Table from "./Table"

interface props {
    apiData: any,
    handleForm: any
}

const MainDisplay = ({ apiData, handleForm }: props) => {
    return (
        <div className="main-display">
            <label
                htmlFor="name"
            >Search
            </label>
            <input 
                className="main-name"
                type="text"
                placeholder="Enter Name..."
                name="name"
                onChange={handleForm}
            />
            <label
                htmlFor="status"
            >Status</label>
            <input
                className="main-status"
                type="range"
                name="status"
                min="0"
                max="3"
                step="1"
            />
            <Table apiData={apiData}/>
        </div>
    )
}

export default MainDisplay