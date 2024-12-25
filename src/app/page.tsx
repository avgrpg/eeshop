import Link from "next/link";
import { db } from "~/server/db";

const MockData = [
  {
    name: "AND MORE (1).jpg",
    url: "https://utfs.io/f/wfaMRmIk7Dp8671ttiuX0F7nxDjHSzfYuo3aZlwAGyeTdVkm",
  },
  {
    name: "AND MORE (2).jpg",
    url: "https://utfs.io/f/wfaMRmIk7Dp86oNmgPvuX0F7nxDjHSzfYuo3aZlwAGyeTdVk",
  },
  {
    name: "AND MORE.jpg",
    url: "https://utfs.io/f/wfaMRmIk7Dp8gxXmGZWjKXCZ1Y6hkPtU7x9yJevnBd4FuSio",
  },
];

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  console.log(posts);
  return (
    <main className="">
      <div className="flex flex-wrap gap-2">
        {posts.map((post) => (
          <div key={post.id}>
            <h1>{post.name}</h1>
          </div>
        ))}
        {MockData.map((item) => (
          <div className="w-80 border p-2" key={item.name}>
            <img src={item.url} alt={item.name} />
          </div>
        ))}
      </div>
    </main>
  );
}
