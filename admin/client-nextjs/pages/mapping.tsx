import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { DestTable } from '../models/destTable';
import { fetchDestTableNames, fetchDestTable } from '../services/fetchDestTable'
import { MappingTable } from '../components/MappingTable'

interface MappingProps {
    dbTables: string[];
}

export default function Mapping({ dbTables }: MappingProps) {
    const [destTable, setDestTable]: [DestTable, any] = React.useState({} as DestTable);

    console.log(destTable)

    return (
        <div>
            mapping page
            <Form>
                <Form.Group controlId="mapping.destTable">
                    <Form.Label>Destination Table</Form.Label>
                    <Form.Control as="select" onChange={async (e) => {
                        setDestTable(await fetchDestTable(e.target.value));
                    }}>
                        <option></option>
                        {dbTables.map(dbTable => <option>{dbTable}</option>)}
                    </Form.Control>
                </Form.Group>
            </Form>

            {destTable?.columns && (
                <MappingTable destTableColumns={destTable?.columns} />
            )

            }
        </div>
    )
}

export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    // const res = await fetch('http://localhost:4000/api/db-tables')
    // const dbTables = await res.json()

    const dbTables = await fetchDestTableNames();
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            dbTables,
        },
    }
}