import newspaper
import sys
import os

import json

with open(os.path.join(os.path.dirname(__file__), 'files/links.json'), 'r') as file:
    links = json.load(file) # imports json array as list

print(type(links))

article = newspaper.Article(links[2][5])
article.download()
article.parse() 
article.nlp()
print(article.keywords) # stop here if keywords not in master list
print(article.title)
print(article.authors)
print(type(article.publish_date)) # push as prettier string
print(article.summary)

# utilize json.dumps to serialize a python object (like a dict) and write to a json file
# json.dump to create a json string









# with open('/Users/matthewlabasan/Documents/Work/ARL/arl-project/server/services/webscraper/files/links.txt', 'a') as file:  
#     file.write("\nhi")
#     file.close()

# print(' Ran successfully.')

# sys.stdout.flush()
