import json
from faker import Faker
import random
import string
import os

fake = Faker(['fil_PH'])

data = []

for i in range(1, 2501):
    alumni_id = f"A{str(i).zfill(5)}"
    fname = fake.first_name()
    lname = fake.last_name()
    random_mi = random.choice(string.ascii_uppercase)
    mi = random.choice(['', random_mi])
    suffix = random.choice(['', 'Jr', 'Sr'])
    sex = random.choice(['male', 'female'])
    religion = random.choice(['Christianity', 'Islam', 'Judaism', 'Hinduism'])
    marital_status = random.choice(['Single', 'Married', 'Divorced', 'Widowed', 'Separated'])
    year = random.randint(1983, 2000)
    month = random.randint(1, 12)
    day = random.randint(1, 28)
    date_of_birth = f'{year}-{month:02d}-{day:02d}'

    profile = {
        "alumni_id": alumni_id,
        "fname": fname,
        "lname": lname,
        "mi": mi,
        "suffix": suffix,
        "sex": sex,
        "religion": religion,
        "marital_status": marital_status,
        "date_of_birth": date_of_birth
    }

    data.append(profile)

# Determine the path to the backend directory
backend_dir = os.path.join(os.path.dirname(__file__), '..', '..', 'backend')

# Create the "JsonData" folder if it doesn't exist inside the "backend" directory
json_data_dir = os.path.join(backend_dir, 'JsonData')
os.makedirs(json_data_dir, exist_ok=True)

# Save data to JSON file in the "JsonData" folder
file_path = os.path.join(json_data_dir, 'alumniProfileData.json')
with open(file_path, 'w') as file:
    json.dump(data, file, indent=4)