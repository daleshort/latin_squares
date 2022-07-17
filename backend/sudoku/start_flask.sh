#!/bin/bash
gunicorn -c conf/gunicorn_conf.py 'app:app'
