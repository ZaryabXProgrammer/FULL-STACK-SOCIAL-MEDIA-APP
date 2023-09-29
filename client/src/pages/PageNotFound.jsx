import {Link} from 'react-router-dom'
const PageNotFound = () => {
    return (
        <div>
            <h1>404 ERROR</h1>
            <h2>PAGE NOT FOUND</h2>
            <h3>Try this link: <Link to="/" className="link">HomePage</Link>
            </h3>
        </div>
    )
}

export default PageNotFound
