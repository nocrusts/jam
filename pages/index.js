import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Home() {
    return (
        <div className="page">
            <div className="container">
                <h1>Home</h1>
                <hr />

                <Skeleton count={20} />
            </div>
        </div>
    );
}
