from django.urls import path

from .views import  CreateReportView, ReportCategoryListingView, ReportListingView

urlpatterns = [
    path("" , ReportListingView.as_view() , name="list_reports") , 
    path("create" , CreateReportView.as_view() , name="create_reports"),
    path('categories', ReportCategoryListingView.as_view() , name="report_categories")
]


