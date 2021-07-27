import json
import os

from mappings.models import ColumnMapping, MappingSpec

fileDir = os.path.dirname(os.path.realpath('__file__'))
mapping_file_path = os.path.join(fileDir, 'src/data/mapping_config.json')

class MappingDatastore:
    def __init__(self) -> None:
        pass

    def get_mapping(self, name: str) -> MappingSpec:
        mapping_raw = '{"mapping_name": "test", "dest_table_name": "test1", "column_mappings":[{"source": "Basement", "dest": "Basement"}]}'
        mapping_json = json.loads(mapping_raw)
        with open(mapping_file_path) as f:
            mappings = json.load(f)

        mapping = next(x for x in mappings if x['mapping_name'] == name)
        mapping_spec2 = MappingSpec(mapping_name="test2", 
                                    dest_table_name="test2", 
                                    column_mappings=[ColumnMapping(source="Basement", dest="basement")]
                                    )
        mapping_spec = MappingSpec(**mapping)

        return mapping_spec2