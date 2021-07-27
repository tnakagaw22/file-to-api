import logging

from mappings.mapping_datastore import MappingDatastore
from file_readers.csv_reader import CsvReader
from importers.exceptions import MappingNotFoundError

class SqlImporter:
    def __init__(self, mapping_datastore: MappingDatastore, csv_reader: CsvReader) -> None:
        self.mapping_datastore = mapping_datastore
        self.csv_reader = csv_reader

        self.logger = logging.getLogger(f'{__name__}.{self.__class__.__name__}',)

    def run(self, mapping_name: str):
        mapping = self.mapping_datastore.get_mapping(mapping_name)

        if mapping == None:
            raise MappingNotFoundError(f'mapping_name {mapping_name} was not found')

        line = self.csv_reader.read()

        self.logger.debug(mapping)
        self.logger.debug(line)
