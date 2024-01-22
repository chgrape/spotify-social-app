import Card from "../components/Card";
import find from "../assets/icons8-search.svg";
import create from "../assets/edit.svg";
import profile from "../assets/user-circle.svg";
import group from "../assets/users.svg";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main
      style={{ maxWidth: "960px" }}
      className="flex-wrap flex justify-center mx-auto pt-32"
    >
      <Card
        icon={find}
        title="Find"
        description="Find people with similair tastes in music"
      />
      <Link to="/create">
      <Card
        icon={create}
        title="Post"
        description="Create a post to a chosen group"
      ></Card>
      </Link>
      <Card
        icon={profile}
        title="Profile"
        description="View posts, groups, and stats"
      />
      <Card
        icon={group}
        title="Groups"
        description="Browse groups by music interests"
      />
      <Card
        icon={group}
        title="Placeholder"
        description="Consectetur fugiat ullamco elit qui magna et."
      />
    </main>
  );
}

export default Home;
