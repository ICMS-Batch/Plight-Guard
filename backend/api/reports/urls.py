from django.urls import path

from .views import  CreateReportView, MunicipalitiesView, ReportCategoryListingView, ReportListingView, SingleReportViewById

urlpatterns = [
    path("" , ReportListingView.as_view() , name="list_reports") , 
    path("<int:id>" , SingleReportViewById.as_view() , name="single_report") , 
    path("create" , CreateReportView.as_view() , name="create_reports"),
    path('categories', ReportCategoryListingView.as_view() , name="report_categories"), 
    path('municipalities', MunicipalitiesView.as_view() , name="municipalities_listing")
]


