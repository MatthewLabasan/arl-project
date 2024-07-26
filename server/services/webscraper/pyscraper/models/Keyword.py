from mongoengine import *
from .Article import Article
import sys
import os

class Keyword(Document):
    word = StringField(required=True)
    articles = ListField(ReferenceField(Article)) # default is empty, required = non empty array, so leave out
    # simply pass in an Article object with append, and it will take in the ID automatically.

    meta = {
        'collection': 'keywords',  # Specifies the collection name. Default would have been 'article'
        'strict': False
    }