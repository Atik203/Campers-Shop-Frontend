import TitleDescriptionBlock from "../TitleDescriptionBlock";

const blogPosts = [
  {
    id: 1,
    title: "The Best Camping Spots for Summer 2023",
    href: "#",
    description:
      "Explore our top picks for camping spots this summer. Find out what makes each location unique and why you should visit.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLkwh-aI58gxmlcpgSIcQXlsMCDU_h8KbkQg&s",
    date: "Jan 10, 2023",
    datetime: "2023-01-10",
    author: {
      name: "Jane Doe",
      imageUrl:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "How to Choose the Right Camping Gear",
    href: "#",
    description:
      "Get tips on selecting the best camping gear for your needs. Learn what to look for in tents, sleeping bags, and more.",
    imageUrl:
      "https://media.worldnomads.com/learn/travelsmarter/camping-trip-travel-smarter-lead-new.jpg",
    date: "Feb 15, 2023",
    datetime: "2023-02-15",
    author: {
      name: "John Smith",
      imageUrl:
        "https://images.unsplash.com/photo-1502767089025-6572583495b4?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 3,
    title: "Top 10 Essential Camping Hacks",
    href: "#",
    description:
      "Discover our top 10 camping hacks that will make your outdoor experience more enjoyable and stress-free.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC5oFTCDDN7vZB8bQd7w1hKKtf7QxKtKgcLQ&s",
    date: "Mar 20, 2023",
    datetime: "2023-03-20",
    author: {
      name: "Emily Johnson",
      imageUrl:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  // More blog posts...
];

const BlogSection = () => {
  return (
    <div className="mb-12">
      {/* Blog section */}
      <div className="mx-auto mt-24 max-w-7xl px-6 sm:mt-28">
        <TitleDescriptionBlock
          title="From the Blog"
          description="  Get inspired by our latest blog posts, featuring tips, guides, and
            stories from fellow camping enthusiasts. Discover new destinations,
            learn about the best gear, and get expert advice to make your next
            outdoor adventure unforgettable."
        />
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
            >
              <img
                src={post.imageUrl}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

              <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                <time dateTime={post.datetime} className="mr-8">
                  {post.date}
                </time>
                <div className="-ml-4 flex items-center gap-x-4">
                  <svg
                    viewBox="0 0 2 2"
                    className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50"
                  >
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <div className="flex gap-x-2.5">
                    <img
                      src={post.author.imageUrl}
                      alt=""
                      className="h-6 w-6 flex-none rounded-full bg-white/10"
                    />
                    {post.author.name}
                  </div>
                </div>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                <a href={post.href}>
                  <span className="absolute inset-0" />
                  {post.title}
                </a>
              </h3>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
