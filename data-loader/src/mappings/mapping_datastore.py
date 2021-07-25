import json
from typing import Mapping

from mappings.models import ColumnMapping, MappingSpec

class MappingDatastore:
    def __init__(self) -> None:
        pass

    def get_mapping(self, name: str) -> MappingSpec:
        mapping_raw = '{"mapping_name": "test", "dest_table_name": "test1", "column_mappings":[{"source": "Basement", "dest": "Basement"}]}'
        mapping_json = json.loads(mapping_raw)
        # with open('src/data/mapping_config.json') as f:
        #     mapping = json.load(f)

        mapping_spec2 = MappingSpec(mapping_name="test2", 
                                    dest_table_name="test2", 
                                    column_mappings=[ColumnMapping(source="Basement", dest="basement")]
                                    )

        # mapping_spec = MappingSpec(**mapping_json)

        return mapping_spec2