from mongoengine import *

class User(Document):
    name = StringField(required=True)
    email = StringField(required=True)
    keywords = ListField(ReferenceField('Keyword')) # default is empty, required = non empty array, so leave out
    # simply pass in an Article object with append, and it will take in the ID automatically.

    meta = {
        'collection': 'users',  # Specifies the collection name. Default would have been 'article'
        'strict': False
    }