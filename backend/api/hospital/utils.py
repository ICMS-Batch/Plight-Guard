import json


def get_hospitals_with_numbers():
    with open("data.json", "r") as file:
        content = json.loads(file.read())
        hospitals_with_tags = [value for value in content if "tags" in value]
        hospitals = [value for value in hospitals_with_tags if set(
            ('lat', 'lon')).issubset(value) and set(("name", "phone")).issubset(value["tags"])]
        return hospitals
