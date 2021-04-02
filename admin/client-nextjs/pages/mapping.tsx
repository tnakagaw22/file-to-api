
interface MappingProps {
    dbTables: string[];
}

export default function Mapping({ dbTables }: MappingProps) {
    return (
        <div>
            mapping page
            <ul>
                {dbTables.map((dbTable) => (
                    <li>{dbTable}</li>
                ))}
            </ul>
        </div>
    )
}

export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch('http://localhost:4000/api/db-tables')
    const dbTables = await res.json()

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            dbTables,
        },
    }
}