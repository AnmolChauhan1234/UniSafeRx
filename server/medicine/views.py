# # from rest_framework.views import APIView
# # from rest_framework.response import Response
# # from rest_framework.permissions import IsAuthenticated
# # from rest_framework import status
# # from django.utils import timezone
# # from .models import Medicine, GeoLog


# # from rest_framework.permissions import AllowAny





# # class VerifyMedicineView(APIView):
# #     # permission_classes = [IsAuthenticated]
# #     permission_classes = [AllowAny]

# #     def post(self, request):
# #         data = request.data
# #         name = data.get('name')
# #         brand = data.get('brand')
# #         barcode = data.get('barcode')
# #         manufacturer = data.get('manufacturer')
# #         incoming_geo = data.get('geolocation')
# #         incoming_timestamp = data.get('timestamp')

# #         if not all([name, brand, barcode, manufacturer]):
# #             return Response({"error": "Missing required fields."}, status=status.HTTP_400_BAD_REQUEST)

# #         try:
# #             medicine = Medicine.objects.get(
# #                 name=name,
# #                 brand=brand,
# #                 barcode=barcode,
# #                 manufacturer=manufacturer
# #             )

# #             response_data = {
# #                 "verified": True,
# #                 "timestamp": medicine.timestamp,
# #                 "geolocation": medicine.geolocation
# #             }

# #             # If no timestamp/geolocation saved in DB, store the incoming ones
# #             if not medicine.timestamp and incoming_timestamp:
# #                 medicine.timestamp = incoming_timestamp

# #             if not medicine.geolocation and incoming_geo:
# #                 medicine.geolocation = incoming_geo

# #             # Save new log if incoming data provided
# #             if incoming_geo and incoming_timestamp:
# #                 GeoLog.objects.create(
# #                     medicine=medicine,
# #                     timestamp=incoming_timestamp,
# #                     geolocation=incoming_geo
# #                 )

# #             medicine.is_verified = True
# #             medicine.save()

# #             # Assuming `geo_log` is the new GeoLog instance just created
# # # And `previous_log` is the latest existing GeoLog (before new one was added)

# #             response_data.update({
# #                 "verified": True,
# #                 "previous_timestamp": previous_log.timestamp if previous_log else None,
# #                 "previous_geolocation": previous_log.geolocation if previous_log else None,
# #                 "new_timestamp": geo_log.timestamp,
# #                 "new_geolocation": geo_log.geolocation,
# #                 "message": "Medicine found. Previous and new geolocation info stored/logged."
# #             })


# #             return Response(response_data)

# #         except Medicine.DoesNotExist:
# #             return Response({"verified": False, "message": "Medicine not found."}, status=status.HTTP_404_NOT_FOUND)






# # from rest_framework.views import APIView
# # from rest_framework.response import Response
# # from rest_framework.permissions import AllowAny
# # from rest_framework import status
# # from .models import Medicine, GeoLog


# # class VerifyMedicineView(APIView):
# #     permission_classes = [AllowAny]

# #     def post(self, request):
# #         data = request.data
# #         name = data.get('name')
# #         brand = data.get('brand')
# #         barcode = data.get('barcode')
# #         manufacturer = data.get('manufacturer')
# #         incoming_geo = data.get('geolocation')
# #         incoming_timestamp = data.get('timestamp')

# #         # Validate required fields
# #         if not all([name, brand, barcode, manufacturer]):
# #             return Response({"error": "Missing required fields."}, status=status.HTTP_400_BAD_REQUEST)

# #         try:
# #             # Find the medicine based on the provided fields
# #             medicine = Medicine.objects.get(
# #                 name=name,
# #                 brand=brand,
# #                 barcode=barcode,
# #                 manufacturer=manufacturer
# #             )

# #             # Get the latest GeoLog (previous log) for the medicine
# #             previous_log = medicine.geo_logs.last()

# #             # Prepare the initial response data with current medicine details
# #             response_data = {
# #                 "verified": True,
# #                 "previous_timestamp": previous_log.timestamp if previous_log else None,
# #                 "previous_geolocation": previous_log.geolocation if previous_log else None,
# #             }

# #             # If incoming timestamp and geolocation are provided, update the medicine
# #             if not medicine.timestamp and incoming_timestamp:
# #                 medicine.timestamp = incoming_timestamp

# #             if not medicine.geolocation and incoming_geo:
# #                 medicine.geolocation = incoming_geo

# #             # Save new log if incoming data provided
# #             if incoming_geo and incoming_timestamp:
# #                 geo_log = GeoLog.objects.create(
# #                     medicine=medicine,
# #                     timestamp=incoming_timestamp,
# #                     geolocation=incoming_geo
# #                 )

# #                 # Add the new geo_log info to the response
# #                 response_data.update({
# #                     "new_timestamp": geo_log.timestamp,
# #                     "new_geolocation": geo_log.geolocation,
# #                     "message": "Medicine found. Info updated/logged if needed."
# #                 })
# #             else:
# #                 response_data.update({
# #                     "message": "Medicine found. No new info logged."
# #                 })

# #             # Mark the medicine as verified and save
# #             medicine.is_verified = True
# #             medicine.save()

# #             return Response(response_data, status=status.HTTP_200_OK)

# #         except Medicine.DoesNotExist:
# #             return Response({"verified": False, "message": "Medicine not found."}, status=status.HTTP_404_NOT_FOUND)





# import requests
# from io import BytesIO
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import AllowAny
# from rest_framework import status
# from .models import Medicine, GeoLog

# class VerifyMedicineView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         data = request.data
#         scannedData = data.get('qrData')  # QR data (barcode)
#         images = data.get('images', [])   # List of image URLs (Cloudinary)
#         location = data.get('location')  # Geolocation of the scan
#         timestamp = data.get('timestamp')  # Timestamp of the scan

#         # Validate incoming data
#         if not all([scannedData, location, timestamp, images]):
#             return Response({"error": "Missing required fields."}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             # Get the first image URL from the received image URLs
#             first_image_url = images[0]

#             # Get the Medicine object by comparing scannedData with barcode
#             medicine = Medicine.objects.get(barcode=scannedData)  # Assuming barcode is the unique identifier for scanning QR

#             # Compare QR data (barcode) received from frontend with stored barcode
#             if scannedData != medicine.barcode:
#                 return Response({"verified": False, "message": "QR data mismatch."}, status=status.HTTP_400_BAD_REQUEST)

#             # Compare image URL with stored image URL (Cloudinary URLs)
#             if not self.compare_images(medicine.packaging_image, first_image_url):
#                 return Response({"verified": False, "message": "Image mismatch."}, status=status.HTTP_400_BAD_REQUEST)

#             # If both QR data and image match, mark as verified
#             medicine.is_verified = True
#             medicine.save()

#             # Save geolocation and timestamp to GeoLog
#             geo_log = GeoLog.objects.create(
#                 medicine=medicine,
#                 timestamp=timestamp,
#                 geolocation=location
#             )

#             # Prepare response data
#             response_data = {
#                 "verified": True,
#                 "message": "Medicine verified and logs updated.",
#                 "geo_log": {
#                     "timestamp": geo_log.timestamp,
#                     "geolocation": geo_log.geolocation
#                 }
#             }

#             return Response(response_data)

#         except Medicine.DoesNotExist:
#             return Response({"verified": False, "message": "Medicine not found."}, status=status.HTTP_404_NOT_FOUND)
#         except requests.exceptions.RequestException as e:
#             return Response({"error": f"Failed to download image: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

#     def compare_images(self, stored_image_url, new_image_url):
#         """ Compares the stored Cloudinary image URL with the new Cloudinary image URL. """
#         try:
#             # If there's no stored image, return False
#             if not stored_image_url:
#                 return False

#             # Compare URLs first
#             if stored_image_url == new_image_url:
#                 return True

#             # Download the stored image (Cloudinary URL)
#             stored_image_response = requests.get(stored_image_url)
#             stored_image_response.raise_for_status()  # Raise error if the image can't be fetched
#             stored_image_data = BytesIO(stored_image_response.content)

#             # Download the new image
#             new_image_response = requests.get(new_image_url)
#             new_image_response.raise_for_status()  # Raise error if the image can't be fetched
#             new_image_data = BytesIO(new_image_response.content)

#             # Optionally, we can compare image content using a hash (e.g., MD5 hash), but here URL comparison suffices.
#             return self.hash_image(stored_image_data) == self.hash_image(new_image_data)

#         except Exception as e:
#             print(f"Error comparing images: {str(e)}")
#             return False

#     def hash_image(self, image_data):
#         """ Returns the MD5 hash of the image for comparison. """
#         import hashlib
#         image_hash = hashlib.md5()
#         for chunk in iter(lambda: image_data.read(4096), b""):
#             image_hash.update(chunk)
#         return image_hash.hexdigest()










# medicine/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Medicine
from .serializers import MedicineSerializer

class MedicineSearchAPIView(APIView):
    permission_classes = []  # or IsAuthenticated if you prefer

    def get(self, request):
        q = request.query_params.get('q', '').strip()
        if q:
            qs = Medicine.objects.filter(name__icontains=q)
        else:
            qs = Medicine.objects.all()
        serializer = MedicineSerializer(qs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
