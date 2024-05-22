"use client";
import { useSearch, SearchBox } from "basehub/react-search";

export const Search = ({ _searchKey }: { _searchKey: string }) => {
  const search = useSearch({
    _searchKey,
    queryBy: ["_title", "body", "excerpt"],
  });

  return (
    <SearchBox.Root search={search}>
      <div className="p-2 border border-gray-200 rounded-lg shadow-lg max-w-lg w-full">
        <SearchBox.Input
          placeholder="Search..."
          className="border border-gray-400 rounded-full px-2 h-8 w-full"
          type="search"
          autoFocus
          autoComplete="off"
        />

        <div className="mt-2 border boder-gray-200 p-2 rounded-lg h-[200px] overflow-auto">
          <SearchBox.Placeholder className="text-sm">
            Start typing to search.
          </SearchBox.Placeholder>

          <SearchBox.Empty className="text-sm">
            Nothing found for <b>{search.query}</b>
          </SearchBox.Empty>

          <SearchBox.HitList className="space-y-1">
            {search.result?.hits.map((hit) => {
              return (
                <SearchBox.HitItem
                  key={hit._key}
                  hit={hit}
                  href={`/blog/${hit.document._slug}`}
                  className={`data-[selected="true"]:bg-gray-100 flex flex-col gap-1 p-1 rounded-md`}
                >
                  <SearchBox.HitSnippet
                    fieldPath="_title"
                    components={{
                      mark: (props) => (
                        <mark {...props} className="bg-yellow-200 rounded-sm" />
                      ),
                      container: (props) => (
                        <div
                          {...props}
                          className="text-sm font-semibold overflow-hidden text-ellipsis whitespace-nowrap"
                        />
                      ),
                    }}
                  />
                  <SearchBox.HitSnippet
                    fieldPath="body"
                    fallbackFieldPaths={["excerpt"]}
                    components={{
                      mark: (props) => (
                        <mark {...props} className="bg-yellow-200 rounded-sm" />
                      ),
                      container: (props) => (
                        <div {...props} className="text-xs line-clamp-2" />
                      ),
                    }}
                  />
                </SearchBox.HitItem>
              );
            })}
          </SearchBox.HitList>
        </div>
      </div>
    </SearchBox.Root>
  );
};
