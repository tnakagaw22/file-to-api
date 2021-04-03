import React from 'react';
import Button from 'react-bootstrap/Button';
import { Form, Row, Col } from 'react-bootstrap';

import { DestTable } from '../models/destTable';
import { fetchDestTableNames, fetchDestTable } from '../services/fetchDestTable'
import { MappingTable } from '../components/MappingTable'
import { DestTableSelect } from '../components/DestTableSelect'

interface MappingProps {
    dbTables: string[];
}

export default function Mapping({ dbTables }: MappingProps) {
    const [destTable, setDestTable]: [DestTable, any] = React.useState({} as DestTable);
    const [fileName, setFileName]: [string, any] = React.useState('');

    let mappingName= 'Mapping';
    if (fileName && destTable?.name){
        mappingName += ` - ${fileName} to ${destTable?.name}`;
    }

    return (
        <div>
            <h3>{mappingName}</h3>
            <Form>
                <Row>
                    <Col>
                        <Form.Group controlId="mapping.fileName">
                            <Form.Label>Source File Name</Form.Label>
                            <Form.Control onChange={(e) => setFileName(e.target.value)}
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <DestTableSelect
                            dbTables={dbTables}
                            onChangeSelect={async (e) => {
                                setDestTable(await fetchDestTable(e.target.value));
                            }}
                        />
                    </Col>
                </Row>
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
    // By returning {props: { posts} }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            dbTables,
        },
    }
}