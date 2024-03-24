interface MiniDisplayProps {
    title: string,
    body: string
}

const MiniDisplay = ({ title, body }: MiniDisplayProps) => {
    return (
        <div className="mini-display">
            <h2 className="mini-display-title">{title}</h2>
            <h3>{body}</h3>
        </div>
    )
}

export default MiniDisplay