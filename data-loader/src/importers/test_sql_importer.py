import unittest
from unittest.mock import Mock, patch

from importers.sql_importer import SqlImporter
from importers.exceptions import MappingNotFoundError
from mappings.mapping_datastore import MappingDatastore

class TestSqlImporter(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.mock_mapping_datastore = unittest.mock.create_autospec(MappingDatastore)
        cls.mock_csv_reader = Mock()

    def test_get_mapping_raise_error_when_mapping_not_found(self):
        self.mock_mapping_datastore.get_mapping.return_value = None

        sql_importer = SqlImporter(
            mapping_datastore=self.mock_mapping_datastore,
            csv_reader=self.mock_csv_reader
            )

        with self.assertRaises(MappingNotFoundError):
            sql_importer.run('test')


# if __name__ == '__main__':
#     unittest.main()