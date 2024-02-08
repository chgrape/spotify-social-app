import Card from "../components/Card";
import find from "../assets/icons8-search.svg";
import create from "../assets/edit.svg";
import profile from "../assets/user-circle.svg";
import group from "../assets/users.svg";
import music from "../assets/music.svg"

function Home() {
  return (
    <main
      className="flex-wrap flex justify-center mx-auto pt-32 max-w-[960px]"
    >
      <Card
        icon={find}
        title="Find"
        description="Find people with similair tastes in music"
      />
      <Card
        icon={create}
        path="/create"
        title="Post"
        description="Create a post to a chosen group" />
      <Card
        icon={profile}
        path="/profile"
        title="Profile"
        description="View posts, groups, and stats"
      />
      <Card
        icon={group}
        path="/groups"
        title="Groups"
        description="Browse groups by music interests"
      />
      <Card
        icon={music}
        title="Playlists"
        path="/playlists"
        description="See playlist statistics"
      />
    </main>
  );
}

export default Home;
