import pandas as pd
import numpy as np
# import sqlalchemy
import logging
import os

import sys
from dependency_injector.wiring import inject, Provide

import containers
from importers.sql_importer import SqlImporter

logging.basicConfig(level=os.environ.get("LOGLEVEL", "INFO"))
logger = logging.getLogger(__name__)

# from datastore import get_mapping_config, save_mapped_data


# def load_file(file_path, mapping_name):
#     mapping_config = get_mapping_config(mapping_name)
#     column_mappings = mapping_config['column_mappings']
#     dest_source_mappings = dict((v, k) for k, v in column_mappings.items())

#     df = pd.read_csv(file_path)

#     print('mapping config', mapping_config)
#     print('data', df.head(5))

#     return df

@inject
def main(
    sql_importer: SqlImporter = Provide[containers.Container.sql_importer]
) -> None:
    sql_importer.run()



if __name__ == "__main__":
    container = containers.Container()
    container.init_resources()
    container.config.from_ini('config.ini')
    container.wire(modules=[sys.modules[__name__]])

    main(*sys.argv[1:])


    # importer:SqlImporter = obj_graph.provide(SqlImporter)
    # importer.run()

    # logger.info("test logging...")
    # df = load_file('test_data/hgmls_multi.csv', 'hgmls_multi')
    # save_mapped_data('listings', df)
