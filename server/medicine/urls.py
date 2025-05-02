# # urls.py
# from django.urls import path
# from .views import VerifyMedicineView

# urlpatterns = [
#     path('verify-medicine/', VerifyMedicineView.as_view(), name='verify-medicine'),
# ]





# medicine/urls.py
from django.urls import path
from .views import MedicineSearchAPIView

urlpatterns = [
    path('search-medicine/', MedicineSearchAPIView.as_view(), name='search-medicine'),
]
