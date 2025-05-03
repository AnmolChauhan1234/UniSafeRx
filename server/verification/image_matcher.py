# blockchain/image_matcher.py
import cv2
import numpy as np
import requests

def download_gray_image(url):
    """Fetch URL and return a grayscale OpenCV image."""
    resp = requests.get(url)
    resp.raise_for_status()
    arr = np.frombuffer(resp.content, np.uint8)
    return cv2.imdecode(arr, cv2.IMREAD_GRAYSCALE)

def orb_match(reference_urls, test_urls, threshold=60):
    """
    Compare each test_url against each reference_url via ORB.
    Returns True if any test-reference pair has >= threshold good matches.
    """
    orb = cv2.ORB_create(nfeatures=1000)
    bf  = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)

    # Precompute all reference descriptors
    ref_descs = []
    for url in reference_urls:
        try:
            img = download_gray_image(url)
            _, des = orb.detectAndCompute(img, None)
            if des is not None:
                ref_descs.append(des)
        except Exception:
            continue

    if not ref_descs:
        return False

    # Try every test image
    for turl in test_urls:
        try:
            timg = download_gray_image(turl)
            _, tdes = orb.detectAndCompute(timg, None)
            if tdes is None:
                continue
        except Exception:
            continue

        # Compare against each reference
        for rdes in ref_descs:
            matches = bf.match(tdes, rdes)
            good = [m for m in matches if m.distance < 50]
            if len(good) >= threshold:
                return True

    return False
