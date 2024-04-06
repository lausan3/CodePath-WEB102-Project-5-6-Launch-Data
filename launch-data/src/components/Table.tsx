import Row from "./Row"

interface props {
    apiData: any
}

const Table = ({ apiData }: props) => {
    
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>Launch Name</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Space Agency</th>
                    </tr>
                </thead>
                <tbody>
                {
                    apiData.length > 0 ? (
                        apiData.map((data: any, index: number) => {

                            return (
                                <Row
                                key={index}
                                name={data.mission}
                                id={data.id}
                                date={data.window_start}
                                status={data.status.abbrev}
                                agency={data.lsp_name}
                                />
                            );
                        })
                    ) : null
                }
                </tbody>
            </table>

            {
                apiData.length <= 0 ? <p>No Data...</p> : null
            }
        </>
    )
}

export default Table