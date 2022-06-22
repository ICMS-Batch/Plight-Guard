from rest_framework.response import Response

class BadRequestResponse(Response):
     def __init__(self, details=[], *args, **kwargs):
        response = {"message":"Bad Request" , "status_code":400 , "details":details}
        super().__init__(response, 400, *args, **kwargs)

class SuccessResponse(Response):
     def __init__(self, details=[], *args, **kwargs):
        response = {"message":"Success Request" , "status_code":200 , "details":details}
        super().__init__(response, 200, *args, **kwargs)
    
