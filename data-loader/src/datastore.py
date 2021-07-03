# -*- coding: utf-8 -*-
"""
Created on Tue Apr 27 17:20:02 2021

@author: tomohiro
"""
# import pymssql
# from sqlalchemy import create_engine
import json
# import psycopg2
# from urllib.parse import quote_plus
# import urllib

def get_mapping_config(mapping_name):
    with open('src/data/mapping_config.json') as f:
        configs = json.load(f)

    config = next(filter(lambda config: config['mapping_name'] == mapping_name, configs), None)
    # filtered = list(filter(lambda x: x > 10, items))
    # configs = json.loads('data/mapping_config.json')
    # mapping = configs.
    return config


def save_mapped_data(dest_table, df):
    file_loc = f'dest/{dest_table}.csv'
    df.to_csv(file_loc)
    print(f'saved file at {file_loc}')
    # conn_string = 'postgresql://postgres:postgres@localhost:5433/pandas_test'

    # db = create_engine(conn_string)
    # conn = db.connect()
    
    # df.to_sql(dest_table, con=conn, if_exists='append')


