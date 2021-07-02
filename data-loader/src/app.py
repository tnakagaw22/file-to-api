import pandas as pd
import numpy as np
# import sqlalchemy
import logging

from datastore import get_mapping_config, save_mapped_data


def load_file(file_path, mapping_name):
    mapping_config = get_mapping_config(mapping_name)
    column_mappings = mapping_config['column_mappings']
    dest_source_mappings = dict((v, k) for k, v in column_mappings.items())

    df = pd.read_csv(file_path)

    print('mapping config', mapping_config)
    print('data', df.head(5))


load_file('src/data/hgmls_multi.csv', 'hgmls_multi')
