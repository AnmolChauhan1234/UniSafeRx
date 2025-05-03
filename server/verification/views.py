# blockchain/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from .image_matcher import orb_match
from medicine.models import Medicine, ReferenceImage
from .models import GeoLog, ScanEvent
from accounts.models import User

class FullVerifyView(APIView):
    """
    Expects JSON body:
    {
      "qr_payload": {
        "name": "...",
        "brand": "...",
        "barcode": "...",
        "batch_number": "...",
        "expiry_date": "YYYY-MM-DD",
        "manufacturer": "..."
      },
      "image_urls": ["url1","url2",...],  # 1-4 URLs
      "geolocation": "lat,lng",
      "timestamp": "ISO8601 string",
      "user_id": 123,                     # optional
      "role": "retailer"                  # one of 'admin_dist','wholesaler','retailer','consumer'
    }
    """
    def post(self, request):
        data = request.data
        qr      = data.get("qr_payload") or {}
        urls    = data.get("image_urls", [])
        geo     = data.get("geolocation")
        ts      = data.get("timestamp")
        uid     = data.get("user_id")
        role    = data.get("role")

        # 1) Basic payload validation
        required = ["name","brand","barcode","batch_number","expiry_date","manufacturer"]
        if not all(k in qr for k in required):
            return Response({"error":"Incomplete QR payload"}, status=400)
        if not urls:
            return Response({"error":"At least one image URL required"}, status=400)
        if not geo or not ts or not role:
            return Response({"error":"Missing geo, timestamp or role"}, status=400)

        # 2) Fetch medicine and verify metadata
        try:
            med = Medicine.objects.get(barcode=qr["barcode"])
        except Medicine.DoesNotExist:
            return Response({"verified":False,"message":"Unknown barcode"}, status=404)

        # check all QR fields match DB record
        mismatches = []
        for field in ["name","brand","batch_number","expiry_date","manufacturer"]:
            if str(getattr(med, field)) != str(qr[field]):
                mismatches.append(field)
        if mismatches:
            return Response({
                "verified": False,
                "message": f"Metadata mismatch on {', '.join(mismatches)}"
            }, status=400)

        # 3) ORB image‐matching
        ref_qs = ReferenceImage.objects.filter(medicine=med)
        ref_urls = [r.image_url for r in ref_qs]
        image_ok = orb_match(ref_urls, urls)
        if not image_ok:
            return Response({"verified":False,"message":"Packaging image mismatch"}, status=400)

        # 4) Placeholder: blockchain check / write goes here
        #    e.g.: on_chain = get_medicine_hash(med.barcode)
        #          if on_chain != computed_hash: ...

        # 5) Log GeoLog & ScanEvent
        user = None
        if uid:
            try:
                user = user.objects.get(id=uid)
            except User.DoesNotExist:
                pass

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
            result="real"  # or 'pending' until blockchain check
        )

        # 6) Mark medicine verified
        med.is_verified = True
        med.activated_at = timezone.now()
        med.save()

        return Response({"verified":True,"message":"All checks passed"}, status=200)
