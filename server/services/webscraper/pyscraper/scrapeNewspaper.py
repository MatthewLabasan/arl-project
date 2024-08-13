from dotenv import load_dotenv
import mongoengine
from models import *
import newspaper
import sys
import os
import json

# Add models to path for relative import
sys.path.append(os.path.join(os.path.dirname(__file__), 'models'))

# Get URI
try:
    load_dotenv()
    DATABASE_URI = os.getenv('DATABASE_URI')
except Exception as e:
    print('Failed to open .env file. Ensure it is filled and in the /Server directory.' + e)

# Define which database to use
DATABASE_NAME = os.getenv('DATABASE_NAME')

# Create a new client and connect to the server
client = mongoengine.connect(db=DATABASE_NAME, host=DATABASE_URI) # Returns PyMongo Mongo client

# Confirm connection
try:
    client.admin.command('ping')
    print('Python Webscraper connected to MongoDB database successfully. ', end="")
except Exception as e:
    print('Python Webscraper not connected to MongoDB. Resolve issue and schedule task again. ' + e)
    exit() 

# Get keywords into a dictionary
keyword_objects = Keyword.objects()
keywords = {}
for keyword_object in keyword_objects:
    keywords[keyword_object.word] = keyword_object.id

# Reset arrays and delete articles to be empty for new edition
keyword_objects.update(set__articles = [])
articles_objects = Article.objects()
articles_objects.delete()  

# For comparison
keyword_set = set(keywords.keys())

# Get links as a list. Note: in form [[link,link,...], ...]
with open(os.path.join(os.path.dirname(__file__), '..', 'files/links.json'), 'r') as file:
    link_arrays = json.load(file) # imports json array as list

# Get information for each link, pass to keyword article array if keyword match
for link_array in link_arrays:
    for link in link_array:
        try: 
            article = newspaper.Article(link)
            article.download()
            article.parse()
            article.nlp()
            article_keyword_set = set(article.keywords)
            common_words = list(article_keyword_set & keyword_set) # common keywords = add article ref to that keyword document
        except Exception as e:
            print("Newspaper error on " + link + " | " + str(e))

        # If there is common keywords (subscribed topics)
        if(common_words):
            # format summary
            summary = article.summary
            if len(summary) > 400:
                summary = summary[:400]
                summary += "..."
            try:
                article_document = Article(
                    title = article.title,
                    author = ' '.join(article.authors),
                    date = str(article.publish_date),
                    summary = summary,
                    url = link
                )
                article_id = article_document.save().id # save and store id 
            except Exception as e:
                print("Error creating article document for link: " + link + " | " + str(e))
            
            # Push to keyword article array
            try: 
                if(article_document): # reuse collection of keywords from earlier
                    keyword_objects.filter(word__in=common_words).update(push__articles = article_id) # update all common words arrays
            except Exception as e:
                print("Error querying and updating keyword document." + str(e))

print(" | Newspaper finished uploads successfully.")

# implement query that shows all updated keyword array article lengths for log

sys.stdout.flush()
