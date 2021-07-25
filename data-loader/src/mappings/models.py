from dataclasses import dataclass
from typing import List

@dataclass
class ColumnMapping:
    source: str
    dest: str

@dataclass
class MappingSpec:
    mapping_name: str
    dest_table_name: str
    # dest_table_key_column: str
    column_mappings: List[ColumnMapping]
