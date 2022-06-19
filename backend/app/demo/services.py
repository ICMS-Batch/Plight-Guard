from flask import current_app
import json

def get_hospitals_with_phone_numbers():
    file_path = current_app.config["DATA_PATH"]
    with open(file_path , "r") as file:
        content = json.load(file)
        
        filtered_tags = filter(lambda val:val["type"], content["elements"])
        print(list(filtered_tags))
        


