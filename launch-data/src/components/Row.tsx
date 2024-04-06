import { Link } from "react-router-dom"

const Row = ({ name, id, date, status, agency }: any) => {
    return (
        <>
            <tr>
                <Link className='launch-link' to={`/launches/${id}`}>
                    <td>{name}</td>
                </Link>
                <td>{date}</td>
                <td>{status}</td>
                <td>{agency}</td>
            </tr>
        </>
    )
}

export default Row