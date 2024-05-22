import { Pump } from "basehub/react-pump";
import { draftMode } from "next/headers";
import { Search } from "./_components/search";

const Page = async () => {
  return (
    <Pump
      next={{ revalidate: 30 }}
      draft={draftMode().isEnabled}
      queries={[
        {
          posts: {
            _searchKey: true,
            items: {
              _id: true,
              _title: true,
              excerpt: true,
              // more post stuff...
            },
          },
        },
      ]}
    >
      {async ([data]) => {
        "use server";
        return (
          <div className="p-8 space-y-4">
            <Search _searchKey={data.posts._searchKey} />
            <div>
              <h2 className="text-xl font-semibold mb-2">Posts</h2>
              <pre className="text-xs bg-gray-200 font-mono p-4 max-w-lg overflow-auto">
                <code>{JSON.stringify(data.posts, null, 2)}</code>
              </pre>
            </div>
          </div>
        );
      }}
    </Pump>
  );
};

export default Page;
