import Link from "next/link";

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

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-2">
        {MockData.map((item) => (
          <div className="w-80 p-2 border " key={item.name}>
            <img src={item.url} alt={item.name} />
          </div>
        ))}
      </div>
    </main>
  );
}
