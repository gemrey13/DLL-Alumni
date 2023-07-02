from django.test import TestCase

# Create your tests here.
from .models import *


class Address(TestCase):
	def setUp(sef):
		country = Country.objects.create(country_name='Phillipines')
		country.save()

		province = Province.objects.create(province_name='Quezon', country=country)
		province.save()

		city = City.objects.create(city_name='Lucena City', province=province)
		city.save()

		barangay = Barangay.objects.create(barangay_name='Cotta', city=city)
		barangay.save()

	def test_country(self):
		ph = Country.objects.get(country_name='Phillipines')
		qu = Province.objects.get(province_name='Quezon')
		lc = City.objects.get(city_name='Lucena City')
		ct = Barangay.objects.get(barangay_name='Cotta')

		self.assertEqual(ph.country_name, 'Phillipines')
		self.assertEqual(qu.province_name, 'Quezon')
		self.assertEqual(lc.city_name, 'Lucena City')
		self.assertEqual(ct.barangay_name, 'Cotta')



