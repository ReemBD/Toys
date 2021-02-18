import Button from '@material-ui/core/Button';

export function Pagination({ toys, currPageIdx, onMovePage }) {
    return (
        <div className="pagination flex space-between">
            <Button className="prev-page paginate-btn" onClick={() => { onMovePage(currPageIdx - 1) }}>Prev</Button>
            <div className="pages">
                <Button className="page-btn active" onClick={() => { onMovePage(currPageIdx) }}>{currPageIdx + 1}</Button>
                <Button className="page-btn" onClick={() => { onMovePage(currPageIdx + 1) }}>{currPageIdx + 2}</Button>
                <Button className="page-btn" onClick={() => { onMovePage(currPageIdx + 2) }}>{currPageIdx + 3}</Button>
                <Button className="page-btn" onClick={() => { onMovePage(currPageIdx + 3) }}>{currPageIdx + 4}</Button>
                <Button className="page-btn" onClick={() => { onMovePage(currPageIdx + 4) }}>{currPageIdx + 5}</Button>
            </div>
            <Button className="next-page paginate-btn" onClick={() => { onMovePage(currPageIdx + 1) }}>Next</Button>
        </div>
    )
}
