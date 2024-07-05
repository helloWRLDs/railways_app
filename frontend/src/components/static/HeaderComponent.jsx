import { Link } from "react-router-dom";


const HeaderComponent = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-xl">Admin Dashboard</div>
                <div className="flex space-x-4">
                    <Link to="/users" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Users Table</Link>
                    <Link to="/polls" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Polls</Link>
                    <Link to="/responses" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Poll Responses</Link>
                </div>
            </div>
        </nav>
    );
}

export default HeaderComponent;