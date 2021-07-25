
from os import path
import logging.config
import sqlite3

# import boto3
from dependency_injector import containers, providers

from file_readers.csv_reader import CsvReader
from importers.sql_importer import SqlImporter
from mappings.mapping_datastore import MappingDatastore

class Container(containers.DeclarativeContainer):

    config = providers.Configuration()

    log_file_path = path.join(path.dirname(path.abspath(__file__)), 'logging.ini')
    logging = providers.Resource(
        logging.config.fileConfig,
        fname=log_file_path,
    )

    # Gateways

    database_client = providers.Singleton(
        sqlite3.connect,
        config.database.dsn,
    )

    # s3_client = providers.Singleton(
    #     boto3.client,
    #     service_name='s3',
    #     aws_access_key_id=config.aws.access_key_id,
    #     aws_secret_access_key=config.aws.secret_access_key,
    # )

    # Services

    csv_reader = providers.Factory(
        CsvReader,
    )

    mapping_datastore = providers.Factory(
        MappingDatastore,
    )

    sql_importer = providers.Factory(
        SqlImporter,
        mapping_datastore=mapping_datastore,
        csv_reader=csv_reader
    )