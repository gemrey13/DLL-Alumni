import json
from faker import Faker
import random
import string
import os


# class AlumniAddress(models.Model):
#     alumni = models.ForeignKey(AlumniProfile, on_delete=models.CASCADE)
#     country = models.ForeignKey(Country, on_delete=models.CASCADE)
#     region = models.ForeignKey(Region, on_delete=models.CASCADE)
#     province = models.ForeignKey(Province, on_delete=models.CASCADE)
#     city = models.ForeignKey(City, on_delete=models.CASCADE)
#     barangay = models.ForeignKey(Barangay, on_delete=models.CASCADE)
#     street = models.CharField(max_length=100)

#     def __str__(self):
#         return f'{self.street}, {self.barangay}, {self.city}, {self.province}, {self.country}'
fake = Faker(['fil_PH'])
with open('ph-address.json') as file:
    data = json.load(file)

alumni_addresses = []

def generate_random_address():
    region = random.choice(list(data.keys()))
    region_name = data[region]['region_name']

    province = random.choice(list(data[region]['province_list'].keys()))
    province_data = data[region]['province_list'][province]

    city = random.choice(list(province_data['municipality_list'].keys()))
    city_data = province_data['municipality_list'][city]

    barangay = random.choice(city_data['barangay_list'])

    return {
        'region': region_name,
        'province': province,
        'city': city,
        'barangay': barangay,
    }


for i in range(1, 2501):
    alumni = f"A{str(i).zfill(5)}"
    address_data = generate_random_address()
    alumni_address = {
        'alumni': alumni,
        'country': 'Philippines',
        'region': address_data['region'],
        'province': address_data['province'],
        'city': address_data['city'],
        'barangay': address_data['barangay'],
        'street': fake.street_name()
    }

    alumni_addresses.append(alumni_address)

print(generate_random_address())


backend_dir = os.path.join(os.path.dirname(__file__), '..', '..', 'backend')

json_data_dir = os.path.join(backend_dir, 'JsonData')
os.makedirs(json_data_dir, exist_ok=True)

file_path = os.path.join(json_data_dir, 'alumniAddressData.json')
with open(file_path, 'w') as file:
    json.dump(alumni_addresses, file, indent=4)