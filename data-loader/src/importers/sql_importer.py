import logging

from mappings.mapping_datastore import MappingDatastore
from file_readers.csv_reader import CsvReader

class SqlImporter:
    def __init__(self, mapping_datastore, csv_reader) -> None:
        self.mapping_datastore = mapping_datastore
        self.csv_reader = csv_reader

        self.logger = logging.getLogger(f'{__name__}.{self.__class__.__name__}',)

    def run(self):
        mapping = self.mapping_datastore.get_mapping("test")
        line = self.csv_reader.read()

        self.logger.debug(mapping)
        self.logger.debug(line)
