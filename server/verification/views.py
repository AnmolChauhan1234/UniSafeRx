from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
import json




from django.views.decorators.csrf import csrf_exempt



from rest_framework.permissions import AllowAny




from medicine.models import Medicine, ReferenceImage

from .models import GeoLog, ScanEvent
from .image_matcher import orb_match  # ORB matcher assumed defined



from django.utils.decorators import method_decorator




# class FullVerifyView(APIView):


#     authentication_classes = []  # <-- skip JWT auth
#     permission_classes = [AllowAny]

#     """
#     Expects JSON body:
#     {
#       "qr_payload": {
#         "name": "...",
#         "brand": "...",
#         "barcode": "...",
#         "batch_number": "...",
#         "expiry_date": "YYYY-MM-DD",
#         "manufacturer": "..."
#       },
#       "image_urls": ["url1", "url2", ...],  # 1-4 URLs
#       "geolocation": "lat,lng",
#       "timestamp": "ISO8601 string",
#       "role": "retailer"                   # one of 'admin_dist','wholesaler','retailer','consumer'
#     }
#     """



#     @csrf_exempt
#     def post(self, request):
#         data = request.data
#         raw_qr = data.get("qr_payload")

#         # --- Step 1: Decode QR payload ---
#         if isinstance(raw_qr, str):
#             try:
#                 qr = json.loads(raw_qr)
#             except json.JSONDecodeError:
#                 return Response({"error": "QR payload is not valid JSON string"}, status=400)
#         elif isinstance(raw_qr, dict):
#             qr = raw_qr
#         else:
#             return Response({"error": "QR payload missing or invalid"}, status=400)

#         urls = data.get("image_urls", [])
#         geo = data.get("geolocation")
#         ts = data.get("timestamp")
#         role = data.get("role")

#         # --- Step 2: Basic validation ---
#         required_fields = ["name", "brand", "barcode", "batch_number", "expiry_date", "manufacturer"]
#         if not all(k in qr for k in required_fields):
#             return Response({"error": "Incomplete QR payload"}, status=400)
#         if not urls:
#             return Response({"error": "At least one image URL required"}, status=400)
#         if not geo or not ts or not role:
#             return Response({"error": "Missing geolocation, timestamp, or role"}, status=400)

#         # --- Step 3: Lookup Medicine by barcode ---
#         try:
#             med = Medicine.objects.get(barcode=qr["barcode"])
#         except Medicine.DoesNotExist:
#             return Response({"verified": False, "message": "Unknown barcode"}, status=404)

#         # --- Step 4: Metadata verification ---
#         mismatches = []
#         for field in required_fields:
#             if str(getattr(med, field)) != str(qr[field]):
#                 mismatches.append(field)

#         if mismatches:
#             return Response({
#                 "verified": False,
#                 "message": f"Metadata mismatch on: {', '.join(mismatches)}"
#             }, status=400)

#         # --- Step 5: ORB image match check ---
#         ref_urls = list(ReferenceImage.objects.filter(medicine=med).values_list("image_url", flat=True))
#         image_ok = orb_match(ref_urls, urls)
#         if not image_ok:
#             return Response({"verified": False, "message": "Packaging image mismatch"}, status=400)

#         # --- Step 6: Blockchain check placeholder ---
#         # Optional check can go here

#         # --- Step 7: Log events ---
#         user = request.user

#         GeoLog.objects.create(
#             medicine=med,
#             timestamp=ts,
#             geolocation=geo,
#             scanned_by=user
#         )

#         ScanEvent.objects.create(
#             medicine=med,
#             user=user,
#             role=role,
#             geolocation=geo,
#             image_urls=urls,
#             result="real"
#         )

#         # --- Step 8: Mark as verified ---
#         med.is_verified = True
#         med.activated_at = timezone.now()
#         med.save()

#         return Response({
#             "verified": True,
#             "message": "Medicine verified successfully"
#         }, status=200)








# class FullVerifyView(APIView):
#     authentication_classes = []  # No JWT/auth
#     permission_classes = [AllowAny]

#     def post(self, request):
#         print("Received request body:", request.data)

#         data = request.data
#         qr = data.get("qr_payload")

#         # --- Step 1: Decode QR payload ---
#         if not isinstance(qr, dict):
#             return Response({"error": "QR payload must be a dictionary"}, status=400)

#         # --- Step 2: Basic validation ---
#         required_fields = ["name", "brand", "batch_number", "expiry_date", "manufacturer"]
#         if not all(k in qr for k in required_fields):
#             return Response({"error": "Incomplete QR payload"}, status=400)

#         urls = data.get("image_urls", [])
#         geo = data.get("geolocation")
#         ts = data.get("timestamp")
#         role = data.get("role")

#         if not urls or not isinstance(urls, list):
#             return Response({"error": "At least one image URL required"}, status=400)
#         if not geo or not ts or not role:
#             return Response({"error": "Missing geolocation, timestamp, or role"}, status=400)

#         # --- Step 3: Lookup Medicine by batch number ---
#         try:
#             med = Medicine.objects.get(batch_number=qr["batch_number"])
#         except Medicine.DoesNotExist:
#             return Response({"verified": False, "message": "Unknown batch number"}, status=404)

#         # --- Step 4: Metadata verification ---
#         mismatches = []
#         for field in required_fields:
#             if str(getattr(med, field)) != str(qr[field]):
#                 mismatches.append(field)

#         if mismatches:
#             return Response({
#                 "verified": False,
#                 "message": f"Metadata mismatch on: {', '.join(mismatches)}"
#             }, status=400)

#         # --- Step 5: ORB image match check ---
#         ref_urls = list(ReferenceImage.objects.filter(medicine=med).values_list("image_url", flat=True))
#         image_ok = orb_match(ref_urls, urls)
#         if not image_ok:
#             return Response({"verified": False, "message": "Packaging image mismatch"}, status=400)

#         # --- Step 6: Log events ---
#         user = request.user if request.user.is_authenticated else None

#         GeoLog.objects.create(
#             medicine=med,
#             timestamp=ts,
#             geolocation=geo,
#             scanned_by=user
#         )

#         ScanEvent.objects.create(
#             medicine=med,
#             user=user,
#             role=role,
#             geolocation=geo,
#             image_urls=urls,
#             result="real"
#         )

#         # --- Step 7: Mark as verified ---
#         med.is_verified = True
#         med.activated_at = timezone.now()
#         med.save()

#         return Response({
#             "verified": True,
#             "message": "Medicine verified successfully"
#         }, status=200)






# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import AllowAny
# from .models import Medicine, ReferenceImage, GeoLog, ScanEvent
# from .image_matcher import orb_match
# from django.utils import timezone

class FullVerifyView(APIView):
    authentication_classes = []  # No JWT/auth
    permission_classes = [AllowAny]

    def post(self, request):
        print("Received request body:", request.data)

        data = request.data
        qr = data.get("qr_payload")

        # --- Step 1: Decode QR payload ---
        if not isinstance(qr, dict):
            print("Error: QR payload is not a dictionary")
            return Response({"error": "QR payload must be a dictionary"}, status=400)

        print("QR Payload decoded:", qr)

        # --- Step 2: Basic validation ---
        required_fields = ["name", "brand", "batch_number", "expiry_date", "manufacturer"]
        missing_fields = [k for k in required_fields if k not in qr]
        if missing_fields:
            print(f"Error: Missing fields in QR payload: {missing_fields}")
            return Response({"error": f"Incomplete QR payload, missing: {', '.join(missing_fields)}"}, status=400)

        print("QR Payload validated successfully")

        urls = data.get("image_urls", [])
        geo = data.get("geolocation")
        ts = data.get("timestamp")
        role = data.get("role")

        if not urls or not isinstance(urls, list):
            print("Error: Invalid or missing image URLs")
            return Response({"error": "At least one image URL required"}, status=400)
        if not geo or not ts or not role:
            print("Error: Missing geolocation, timestamp, or role")
            return Response({"error": "Missing geolocation, timestamp, or role"}, status=400)

        print(f"Received {len(urls)} image URLs, Geolocation: {geo}, Timestamp: {ts}, Role: {role}")

        # --- Step 3: Lookup Medicine by batch number ---
        try:
            med = Medicine.objects.get(batch_number=qr["batch_number"])
            print(f"Medicine found: {med.name} - {med.batch_number}")
        except Medicine.DoesNotExist:
            print(f"Error: Medicine not found for batch_number {qr['batch_number']}")
            return Response({"verified": False, "message": "Unknown batch number"}, status=404)

        # --- Step 4: Compare medicine name in QR with the database ---
        if "name" not in qr or qr["name"].strip().lower() != med.name.strip().lower():
            print(f"Error: QR name '{qr.get('name')}' does not match medicine name '{med.name}'")
            return Response({
                "verified": False,
                "message": f"Name mismatch: QR name '{qr.get('name')}' does not match registered medicine '{med.name}'"
            }, status=400)

        # --- Step 5: Metadata verification ---
        mismatches = []
        for field in required_fields:
            if str(getattr(med, field)) != str(qr.get(field)):
                mismatches.append(field)

        if mismatches:
            print(f"Metadata mismatch found: {', '.join(mismatches)}")
            return Response({
                "verified": False,
                "message": f"Metadata mismatch on: {', '.join(mismatches)}"
            }, status=400)

        print("Metadata verification passed")

        # --- Step 6: ORB image match check ---
        print("Starting ORB image match check...")
        ref_urls = list(ReferenceImage.objects.filter(medicine=med).values_list("image_url", flat=True))
        print(f"Reference URLs: {ref_urls}")
        
        # Perform image validation to ensure correct URLs
        image_ok = orb_match(ref_urls, urls)
        if not image_ok:
            print("Error: Packaging image mismatch")
            return Response({"verified": False, "message": "Packaging image mismatch"}, status=400)

        print("ORB image match check passed")

        # --- Step 7: Log events ---
        user = request.user if request.user.is_authenticated else None
        print(f"Logging scan event by user: {user}")

        GeoLog.objects.create(
            medicine=med,
            timestamp=ts,
            geolocation=geo,
            scanned_by=user
        )

        ScanEvent.objects.create(
            medicine=med,
            user=user,
            role=role,
            geolocation=geo,
            image_urls=urls,
            result="real"
        )

        print("Scan event and geolocation logged")

        # --- Step 8: Mark as verified ---
        med.is_verified = True
        med.activated_at = timezone.now()
        med.save()

        print("Medicine marked as verified")

        return Response({
            "verified": True,
            "message": "Medicine verified successfully"
        }, status=200)
