from dataclasses import dataclass

@dataclass
class ColumnMapping:
    source: str
    dest: str

@dataclass
class MappingSpec:
    mapping_name: str
    dest_table_name: str
    # dest_table_key_column: str
    column_mappings: list[ColumnMapping]
