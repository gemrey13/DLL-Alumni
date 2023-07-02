import csv
import os
import sys

import django

# Set up Django environment
sys.path.append('.')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()


from AlumniManagement.models import Country, Province, City, Barangay

def upload_csv(file_path):
    with open(file_path, 'r') as csvfile:
        csv_data = csv.reader(csvfile)
        next(csv_data)  # Skip header row if needed

        for row in csv_data:
            # Assuming your CSV has columns 'country_name', 'province_name', 'city_name', 'barangay_name'
            province_name = row[0]
            city_name = row[1]
            barangay_name = row[2]

            # Create or get the Province instance
            province, _ = Province.objects.get_or_create(province_name=province_name, country='Philippines')

            # Create or get the City instance
            city, _ = City.objects.get_or_create(city_name=city_name, province=province)

            # Create or get the Barangay instance
            barangay, _ = Barangay.objects.get_or_create(barangay_name=barangay_name, city=city)

    print('CSV data uploaded successfully.')


def format_csv(file_path):
    filename = f'address.csv'
    f = open(filename, 'a')
    headers = 'province_name\n' 
    f.write(headers)

    with open(file_path, 'r') as csvfile:
        csv_data = csv.reader(csvfile)

        for row in csv_data:
            print(row)
            g = row[0].split('[')
            g = g[0]


            f.write(f'{g}\n')


    f.close()


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print('Usage: python upload.py <csv_file_path>')
        sys.exit(1)

    csv_file_path = sys.argv[1]
    format_csv(csv_file_path)
    # upload_csv(csv_file_path)

