from mongoengine import *

class Article(Document):
    title = StringField(required=True, default="Title unavailable.")
    author = StringField(required=True, default="Author date unavailable.")
    date = StringField(required=True, default="Publish date unavailable.")
    summary = StringField(required=True, default="Summary unavailable.")
    url = StringField(required=True, default="URL unavailable.")

    meta = {
        'collection': 'articles',  # Specifies the collection name. Default would have been 'article'
        'strict': False # allows validation to skip extra fields that may be present in exisiting documents created by JS
    }