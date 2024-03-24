const Row = ({ name, date, status, agency }: any) => {
    return (
        <>
            <tr>
                <td>{name}</td>
                <td>{date}</td>
                <td>{status}</td>
                <td>{agency}</td>
            </tr>
        </>
    )
}

export default Row