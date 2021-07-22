import unittest

from src.mappings.mapping_datastore import MappingDatastore

class TestMappingDatastore(unittest.TestCase):

    def test_get_mapping(self):
        mapping_datastore = MappingDatastore()
        mapping_spec = mapping_datastore.get_mapping("test")

        self.assertNotEqual(mapping_spec, None)

if __name__ == '__main__':
    unittest.main()