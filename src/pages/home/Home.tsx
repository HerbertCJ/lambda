import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <Link to="/users">Users</Link>
    </div>
  );
}

export default Home;
